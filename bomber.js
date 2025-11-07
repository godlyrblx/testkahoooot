import Kahoot from "kahoot.js-updated";

const BASE_NAME = "﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽";
const BOT_COUNT = 100;
const HEARTBEAT_INTERVAL = 10000;

let activeBots = [];

export function launchBomb(pin) {
  // Disconnect old bots
  for (const bot of activeBots) {
    try {
      bot.client.leave();
    } catch {}
  }
  activeBots = [];

  for (let i = 1; i <= BOT_COUNT; i++) {
    setTimeout(() => {
      createBot(pin, i);
    }, i * 50);
  }
}

function createBot(pin, id) {
  const nickname = `${BASE_NAME}${id}`;
  const client = new Kahoot();

  client.join(pin, nickname).then(() => {
    console.log(`[+] Bot ${nickname} joined.`);

    const heartbeat = setInterval(() => {
      if (client.connected) {
        client.sendPing();
      } else {
        clearInterval(heartbeat);
      }
    }, HEARTBEAT_INTERVAL);

    activeBots.push({ id, client });

  }).catch(err => {
    console.log(`[!] Bot ${nickname} failed: ${err.message}`);
  });

  client.on("QuestionStart", question => {
    question.answer(0);
  });

  client.on("Disconnect", reason => {
    console.log(`[!] Bot ${nickname} disconnected: ${reason}`);
    setTimeout(() => createBot(pin, id), 3000);
  });
}
