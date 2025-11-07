import Kahoot from "kahoot.js-updated";

const HEARTBEAT_INTERVAL = 10000;
let activeBots = [];

export function launchBomb(pin, namePrefix, amount) {
  // Disconnect old bots
  for (const bot of activeBots) {
    try {
      bot.client.leave();
    } catch {}
  }
  activeBots = [];

  for (let i = 1; i <= amount; i++) {
    setTimeout(() => {
      createBot(pin, namePrefix, i);
    }, i * 50);
  }
}

function createBot(pin, namePrefix, id) {
  const nickname = `${namePrefix}${id}`;
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
    setTimeout(() => createBot(pin, namePrefix, id), 3000);
  });
}
