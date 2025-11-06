const Kahoot = require("kahoot.js-updated");

const gamePin = process.env.GAME_PIN || "395176";
const botPrefix = process.env.BOT_PREFIX || "okjhg";
const botCount = parseInt(process.env.BOT_COUNT || "1");

function randomSuffix(length = 4) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

for (let i = 0; i < botCount; i++) {
  const client = new Kahoot();
  const nickname = `${botPrefix}${i + 1}_${randomSuffix()}`;

  client.join(gamePin, nickname).then(() => {
    console.log(`[+] Bot ${nickname} joined.`);
  });

  client.on("QuestionStart", question => {
    console.log(`[?] Bot ${nickname} answering...`);
    question.answer(0); // Always picks the first answer
  });

  client.on("Disconnect", reason => {
    console.log(`[!] Bot ${nickname} disconnected: ${reason}`);
  });
}
