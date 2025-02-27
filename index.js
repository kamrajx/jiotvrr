import express from "express";
import cors from "cors";
import os from "node:os";
import 'dotenv/config';
import chalk from "chalk";
const app = express();
app.use(express.urlencoded({ extended: true }));
import fs from "fs";
app.use(express.json());
// const PORT = process.env.DHRUV_JTV_PORT || 3500;
const PORT = process.env.PORT || 3500;
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

 
if (!fs.existsSync("./.jiotv")) {
  //fs["writeFileSync"]("./.jiotv/channel.db", '{"channel": {}}');
  fs.mkdirSync(path.join(__dirname, "./.jiotv"));
}  

if (!fs.existsSync("./.jiotv/channel.db")) {
  fs["writeFileSync"]("./.jiotv/channel.db", '{"channel": {}}');
}

if (!fs.existsSync("./.jiotv/channel-catchup.db")) {
  fs["writeFileSync"]("./.jiotv/channel-catchup.db", '{"channel": {}}');
}

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.use(cors());

import loginRoute from "./routes/login.mjs";
import ipRoute from "./routes/ip.mjs";
import channelsRoute from "./routes/channel.mjs";
import playlistRoute from "./routes/playlist.mjs";
import catchulRoute from "./routes/catchup/index.mjs";

app.use("/", loginRoute);
app.use("/", ipRoute);
app.use("/", channelsRoute);
app.use("/", playlistRoute);
app.use("/catchup", catchulRoute);

// app.use(express.static(path.join(__dirname, "public")));
app.get("/favicon.ico", (req, res) => {
  return res.sendFile(path.join(__dirname + "/public/favicon.ico"));
});
import { handler } from "./build/handler.js";

app.use(handler);

app.listen(PORT, "0.0.0.0", async () => {
  let r
  try {
    r = await fetch("https://api.github.com/repos/dhruv-2015/JIOTVServer/releases/latest");
    r = await r.json();
    r = r['tag_name']
  } catch (error) {
    
  }
  console.log(
    "==================================================================="
  );
  console.log(
    chalk.green("THIS SERVER IS 100% FREE. PLEASE DON'T PAY ANYONE.")
  );
  console.log(
    chalk.green(
      "STRICT ACTION WILL BE TAKEN AGAINST THOSE WHO ARE SELLING THIS."
    )
  );
  console.log(
    chalk.green(
      "IF ANYONE TRYING TO SELL IT, PLEASE REPORT IT ON OUR DISCORD SERVER\nhttps://discord.gg/suyzkCQKhC"
    )
  );
  console.log(
    chalk.green("Please Stare Repo https://github.com/dhruv-2015/JIOTVServer")
  );
  if (r) {
    // console.log(chalk.green("VERSION 2.8.6"));
    console.log(chalk.green(`VERSION ${r}`));
  }
  console.log(
    chalk.green(
      "980+ CHANNELS AVAILABLE. MORE FEATURES WILL COME SOON. STAY TUNED"
    )
  );
  console.log(
    "==================================================================="
  );
  console.log(
    chalk.red(
      "       __ ____ ____     ______ _    __ \n      / //  _// __ \\   /_  __/| |  / / \n __  / / / / / / / /    / /   | | / /  \n/ /_/ /_/ / / /_/ /    / /    | |/ /   \n\\____//___/ \\____/    /_/     |___/    \n                                "
    )
  );
  console.log(
    "==================================================================="
  );
  console.log(`TV server is running on port ${PORT}`);
  console.log(
    `Please open http://localhost:${PORT}/login from the host to login and get playlist if running server for the first time`
  );
  console.log(
    `Note: If hosted in a website, you may want to use the domain or its IP`
  );
  // console.log(chalk.red("need to login every 24 hours even if you are already logged in"));
  console.log("If facing any errors, please login from portal again");
  console.log("you can use server m3u8 links in other websites and apps");
});
