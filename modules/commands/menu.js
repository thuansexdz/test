const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const axios = require("axios");

module.exports = {
  config: {
    name: "menu",
    version: "3.0",
    author: "xthuan",
    countDown: 5,
    role: 0,
    shortDescription: "Xem danh sách lệnh",
    longDescription: "Hiển thị danh sách lệnh theo nhóm, có ảnh gif và hỗ trợ reply số để xem lệnh trong nhóm",
    category: "Tiện ích",
    guide: "{p}menu"
  },

  onStart: async function ({ message, event }) {
    const modulesPath = path.join(__dirname);
    const files = fs.readdirSync(modulesPath).filter(file => file.endsWith(".js") && file !== "menu.js");

    const categories = {};

    for (const file of files) {
      try {
        const command = require(path.join(modulesPath, file));
        const category = command?.config?.category || "Khác";
        if (!categories[category]) categories[category] = [];
        categories[category].push(command.config.name || file.replace(".js", ""));
      } catch (e) {
        console.error(`❌ Lỗi khi load: ${file}`, e);
      }
    }

    const sorted = Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));
    const totalCmds = files.length;
    const time = moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");

    const listText = sorted.map(
      ([cat, cmds], i) => `|> ${i + 1}. ${cat} || có ${cmds.length} lệnh`
    ).join("\n");

    const msg = `${listText}\n\n📋 Tổng: ${totalCmds} lệnh\n🕒 Time: ${time}\n🔍 Reply từ 1 đến ${sorted.length} để xem lệnh nhóm đó\n⏳ Tự động gỡ sau 60s`;

    const gifLinks = [
      "https://i.imgur.com/NzXIQtx.gif",
      "https://i.imgur.com/C3LaZjn.gif",
      "https://i.imgur.com/olj3wFS.gif",
      "https://i.imgur.com/FRjiFU7.gif",
      "https://i.imgur.com/m9rFpmB.gif",
      "https://i.imgur.com/ZI5itkO.gif",
      "https://i.imgur.com/hZImT2s.gif",
      "https://i.imgur.com/aGFtL94.gif",
      "https://i.imgur.com/2Dj7zyX.gif",
      "https://i.imgur.com/nTutRhK.gif",
      "https://i.imgur.com/4ZXoh9W.gif",
      "https://i.imgur.com/WgrgquD.gif",
      "https://i.imgur.com/huXv0RD.gif",
      "https://i.imgur.com/VPMrz8d.gif",
      "https://i.imgur.com/hdmfJ27.gif",
      "https://i.imgur.com/sqG4WGS.gif",
      "https://i.imgur.com/iLR45zM.gif",
      "https://i.imgur.com/wxjiaZ8.gif",
      "https://i.imgur.com/PX5a0kO.gif",
      "https://i.imgur.com/sy7rx7f.gif",
      "https://i.imgur.com/e5gDzBw.gif",
      "https://i.imgur.com/ffxEfUI.gif",
      "https://i.imgur.com/kydsSnO.gif",
      "https://i.imgur.com/FGDdQZl.gif",
      "https://i.imgur.com/IEKBAaD.gif",
      "https://i.imgur.com/XWzV8Gl.gif",
      "https://i.imgur.com/tfr8Qua.gif",
      "https://i.imgur.com/E7U1Ike.gif"
    ];
    const randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)];

    try {
      const res = await axios.get(randomGif, { responseType: "stream" });
      message.reply({ body: msg, attachment: res.data }, (err, info) => {
        if (err) return;
        setTimeout(() => message.unsend(info.messageID), 60 * 1000);

        // Xử lý reply số
        global.GoatBot.onReply.set(info.messageID, {
          type: "menuList",
          author: event.senderID,
          sorted
        });
      });
    } catch (error) {
      console.error("Lỗi tải ảnh gif:", error);
      message.reply(msg);
    }
  },

  onReply: async function ({ message, event, Reply }) {
    const { type, author, sorted } = Reply;
    if (event.senderID !== author) return;

    if (type === "menuList") {
      const index = parseInt(event.body);
      if (isNaN(index) || index < 1 || index > sorted.length) {
        return message.reply("❌ Số không hợp lệ!");
      }

      const [category, cmds] = sorted[index - 1];
      const list = cmds.map((cmd, i) => `  ${i + 1}. ${cmd}`).join("\n");
      message.reply(`📂 Nhóm: ${category}\n📌 Lệnh:\n${list}`);
    }
  }
};
