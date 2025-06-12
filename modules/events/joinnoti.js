const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const thuebotDataPath = path.join(__dirname, './../commands/data', 'thuebot.json');
let data = fs.existsSync(thuebotDataPath) ? require(thuebotDataPath) : [];

const catboxVideos = [
  "https://files.catbox.moe/ytsl3k.mp4", "https://files.catbox.moe/s50t44.mp4", "https://files.catbox.moe/c4yj5e.mp4",
  "https://files.catbox.moe/swhnmg.mp4", "https://files.catbox.moe/dl0l7e.mp4", "https://files.catbox.moe/jsx4lp.mp4",
  "https://files.catbox.moe/ap7sdi.mp4", "https://files.catbox.moe/49jmk0.mp4", "https://files.catbox.moe/fkhbry.mp4",
  "https://files.catbox.moe/uy3ol5.mp4", "https://files.catbox.moe/c5zrz1.mp4", "https://files.catbox.moe/w1vclb.mp4",
  "https://files.catbox.moe/lc0g1s.mp4", "https://files.catbox.moe/l6nanq.mp4", "https://files.catbox.moe/12oqho.mp4",
  "https://files.catbox.moe/d99oe5.mp4", "https://files.catbox.moe/afibyb.mp4", "https://files.catbox.moe/bbbol6.mp4",
  "https://files.catbox.moe/3ds1gk.mp4", "https://files.catbox.moe/osk0o8.mp4", "https://files.catbox.moe/ws70n1.mp4",
  "https://files.catbox.moe/2z6ubv.mp4", "https://files.catbox.moe/l2te8w.mp4", "https://files.catbox.moe/7sz2vw.mp4",
  "https://files.catbox.moe/9ugzbu.mp4", "https://files.catbox.moe/ym0m9i.mp4", "https://files.catbox.moe/vrz578.mp4",
  "https://files.catbox.moe/8hv2tb.mp4", "https://files.catbox.moe/ax50hf.mp4", "https://files.catbox.moe/z6wy35.mp4",
  "https://files.catbox.moe/vwg6ix.mp4", "https://files.catbox.moe/hjhccu.mp4", "https://files.catbox.moe/5kzq7w.mp4",
  "https://files.catbox.moe/aynx3d.mp4", "https://files.catbox.moe/6987sf.mp4", "https://files.catbox.moe/23eyim.mp4",
  "https://files.catbox.moe/tr9tp7.mp4", "https://files.catbox.moe/k0nouw.mp4", "https://files.catbox.moe/phgsim.mp4",
  "https://files.catbox.moe/me5a54.mp4", "https://files.catbox.moe/q1q2cm.mp4", "https://files.catbox.moe/s8nl03.mp4",
  "https://files.catbox.moe/ic9vls.mp4", "https://files.catbox.moe/xqczan.mp4", "https://files.catbox.moe/agyac3.mp4",
  "https://files.catbox.moe/fw4has.mp4", "https://files.catbox.moe/mzpucl.mp4", "https://files.catbox.moe/iza92f.mp4",
  "https://files.catbox.moe/4v9fh2.mp4", "https://files.catbox.moe/jmkdzf.mp4", "https://files.catbox.moe/oe5e3i.mp4",
  "https://files.catbox.moe/f42d5a.mp4", "https://files.catbox.moe/xcnvu3.mp4", "https://files.catbox.moe/9cij6y.mp4",
  "https://files.catbox.moe/gemz7h.mp4", "https://files.catbox.moe/sln0oh.mp4", "https://files.catbox.moe/roj9qp.mp4",
  "https://files.catbox.moe/qql0fs.mp4", "https://files.catbox.moe/mtygjq.mp4", "https://files.catbox.moe/ggudqw.mp4",
  "https://files.catbox.moe/wnna1l.mp4", "https://files.catbox.moe/v3uiz7.mp4", "https://files.catbox.moe/j0nsbh.mp4",
  "https://files.catbox.moe/pa2a94.mp4", "https://files.catbox.moe/ozonrk.mp4", "https://files.catbox.moe/dawqup.mp4",
  "https://files.catbox.moe/ybbpwa.mp4", "https://files.catbox.moe/lycuyy.mp4", "https://files.catbox.moe/dkldv0.mp4",
  "https://files.catbox.moe/6ovkro.mp4", "https://files.catbox.moe/b3xbau.mp4", "https://files.catbox.moe/1wtq6e.mp4",
  "https://files.catbox.moe/b0gx73.mp4", "https://files.catbox.moe/14sdlj.mp4", "https://files.catbox.moe/ihjk42.mp4",
  "https://files.catbox.moe/h9iqc8.mp4", "https://files.catbox.moe/trw930.mp4", "https://files.catbox.moe/evixv2.mp4",
  "https://files.catbox.moe/990jjl.mp4", "https://files.catbox.moe/z14sms.mp4", "https://files.catbox.moe/ecavyw.mp4",
  "https://files.catbox.moe/i7i0v9.mp4", "https://files.catbox.moe/c998cl.mp4", "https://files.catbox.moe/idog92.mp4",
  "https://files.catbox.moe/w266lk.mp4", "https://files.catbox.moe/rpor7o.mp4", "https://files.catbox.moe/yepfzv.mp4",
  "https://files.catbox.moe/00mx0h.mp4", "https://files.catbox.moe/k8iu7f.mp4", "https://files.catbox.moe/vyo41h.mp4"
];

module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.5",
  credits: "Mirai Team & Modified by Satoru & Lyanna",
  description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video"
};

module.exports.run = async function({ api, event, Users, Threads }) {
  const { threadID, logMessageData, author } = event;
  const threadData = global.data.threadData.get(threadID) || {};
  const { PREFIX } = global.config;
  if (threadData.joinNoti === false) return;

  if (logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    const rentalData = data.find(item => item.t_id === threadID);
    const expire = rentalData ? rentalData.time_end : "Chưa thuê bot";
    const prefix = threadData.PREFIX || PREFIX;
    const botName = global.config.BOTNAME || "Lyanna Bot";

    await api.changeNickname(`『 ${prefix} 』• ${botName} | HSD: ${expire}`, threadID, api.getCurrentUserID());

    const message = `🤖 ${botName} đã tham gia nhóm này!\n━━━━━━━━━━━━━━━\n💠 Dùng lệnh: ${prefix}menu để khám phá các tính năng\n💠 Gõ ${prefix}help để nhận hướng dẫn sử dụng\n━━━━━━━━━━━━━━━\n📌 Liên hệ admin để duyệt quyền sử dụng nếu cần`;
    return api.sendMessage(message, threadID);
  }

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY");
    const hour = parseInt(moment.tz("Asia/Ho_Chi_Minh").format("H"));
    const session = hour < 10 ? "sáng" : hour <= 12 ? "trưa" : hour <= 18 ? "chiều" : "tối";
    const thu = moment.tz("Asia/Ho_Chi_Minh").locale('vi').format("dddd");

    const mentions = logMessageData.addedParticipants.map(user => ({
      tag: user.fullName,
      id: user.userFbId
    }));

    const names = logMessageData.addedParticipants.map(u => u.fullName).join(', ');
    const ids = logMessageData.addedParticipants.map(u => u.userFbId).join(', ');
    const isMultiple = logMessageData.addedParticipants.length > 1;
    const type = isMultiple ? "Các bạn" : "Bạn";
    const authorData = await Users.getData(author);
    const authorName = authorData.name || "Người dùng";

    const msg = `🎉 Chào mừng ${names} đến với ${threadInfo.threadName}\n━━━━━━━━━━━━━━━\n👤 ${type} là thành viên thứ ${threadInfo.participantIDs.length}\n📥 Được thêm bởi: ${authorName} lúc ${time} (${session}, ${thu})`;

    const randomVideo = catboxVideos[Math.floor(Math.random() * catboxVideos.length)];
    const attachment = await global.utils.getStreamFromURL(randomVideo);

    return api.sendMessage({ body: msg, attachment, mentions }, threadID);
  } catch (e) {
    console.error("❌ Lỗi ở joinNoti:", e);
  }
};
