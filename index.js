import express from "express";
import bodyParser from "body-parser";
import { launchBomb } from "./bomber.js";

const app = express();
app.use(bodyParser.json());

app.post("/bomb", (req, res) => {
  const { pin } = req.body;
  if (!pin || typeof pin !== "string") {
    return res.status(400).json({ error: "Missing or invalid PIN" });
  }

  launchBomb(pin);
  res.json({ message: `Launching 500 bots to PIN ${pin}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Kahoot bomber API running on port ${PORT}`);
});
