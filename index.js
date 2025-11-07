import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { launchBomb } from "./bomber.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/bomb", (req, res) => {
  const { pin, name, amount } = req.body;

  if (!pin || typeof pin !== "string") {
    return res.status(400).json({ error: "Missing or invalid PIN" });
  }
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Missing or invalid name prefix" });
  }
  const botCount = parseInt(amount);
  if (isNaN(botCount) || botCount < 1 || botCount > 500) {
    return res.status(400).json({ error: "Amount must be between 1 and 500" });
  }

  console.log(`🚀 Launching ${botCount} bots to PIN ${pin} with prefix "${name}"`);
  launchBomb(pin, name, botCount);
  res.json({ message: `Launching ${botCount} bots to PIN ${pin}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Kahoot bomber API running on port ${PORT}`);
});
