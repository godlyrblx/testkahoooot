import Kahoot from "kahoot.js-updated";

const BASE_NAME = "﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽";
const BOT_COUNT = 500;
const HEARTBEAT_INTERVAL = 10000; // 10 seconds

export function launchBomb(pin) {
  for (let i = 1; i <= BOT_COUNT; i++) {
    setTimeout(() => {
      createBot(pin, i);
    }, i * 50); // stagger joins
  }
}

function createBot(pin, id) {
  const nickname = `${BASE_NAME}${id}`;
  const client = new Kahoot();

  client.join(pin, nickname).then(() => {
    console.log(`[+] Bot ${nickname} joined.`);

    // Keep alive with heartbeat
    const heartbeat = setInterval(() => {
      if (client.connected) {
        client.sendPing();
      } else {
        clearInterval(heartbeat);
      }
    }, HEARTBEAT_INTERVAL);

  }).catch(err => {
    console.log(`[!] Bot ${nickname} failed: ${err.message}`);
  });

  client.on("QuestionStart", question => {
    question.answer(0); // Always picks first answer
  });

  client.on("Disconnect", reason => {
    console.log(`[!] Bot ${nickname} disconnected: ${reason}`);
    setTimeout(() => createBot(pin, id), 3000); // Auto-reconnect
  });
}
