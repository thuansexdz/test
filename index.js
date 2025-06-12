const { spawn } = require("child_process");
const logger = require("./utils/log");

function startBot(message) {
    // Logo Alyna bằng ASCII
    const logo = `
░█▀▄░█░█░█░█░█▄█░█▄█░▄▀▄░
░█▀▄░█░█░█░█░█░█░█░█░█▀█░
░▀▀░░▀▀▀░▀▀▀░▀░▀░▀░▀░▀░▀░ BOT
`;

    if (message) {
        logger(`${logo}\n${message}`, "[ Bắt Đầu ]");
    } else {
        logger(`${logo}\nKhởi động bot Alyna...`, "[ Bắt Đầu ]");
    } else {
        logger(`Admin xthuan `,"[  Admin ]");
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (codeExit) => {
        logger(`Bot đã dừng với mã thoát: ${codeExit}`, "[ Dừng ]");

        if (codeExit === 1) {
            logger("Bot sẽ khởi động lại ngay...", "[ Tự Động Restart ]");
            startBot("Đang khởi động lại...");
        } else if (String(codeExit).startsWith("2")) {
            const delaySeconds = parseInt(String(codeExit).slice(1));
            if (!isNaN(delaySeconds)) {
                logger(`Bot sẽ mở lại sau ${delaySeconds} giây...`, "[ Hẹn Giờ Mở Lại ]");
                await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
                startBot("Mở lại sau chờ đợi...");
             logger("Tự động  ${hours} giờ ${minutes} phút ${seconds}");
            }
        } else {
            logger("Bot kết thúc không yêu cầu restart.", "[ Thoát ]");
        }
    });

    child.on("error", (error) => {
        logger("Lỗi khi khởi động tiến trình bot: " + JSON.stringify(error), "[ Lỗi ]");
    });
}
        logger("đang chạy bot lyana vui lòng chờ");
startBot();