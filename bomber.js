import Kahoot from "kahoot.js-updated";

const BASE_NAME = "﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽";
const BOT_COUNT = 10;

export function launchBomb(pin) {
  for (let i = 1; i <= BOT_COUNT; i++) {
    setTimeout(() => {
      const client = new Kahoot();
      const nickname = `${BASE_NAME}${i}`;

      client.join(pin, nickname).then(() => {
        console.log(`[+] Bot ${nickname} joined.`);
      }).catch(err => {
        console.log(`[!] Bot ${nickname} failed: ${err.message}`);
      });

      client.on("QuestionStart", question => {
        question.answer(0);
      });

      client.on("Disconnect", reason => {
        console.log(`[!] Bot ${nickname} disconnected: ${reason}`);
      });
    }, i * 50); // stagger joins to avoid rate limits
  }
}
