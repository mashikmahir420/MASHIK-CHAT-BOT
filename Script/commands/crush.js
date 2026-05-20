const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "crush",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU", //don't change Credit😃
  description: "Generate a couple banner image using sender and target Facebook UID via Avatar Canvas API",
  commandCategory: "banner",
  usePrefix: true,
  usages: "[@mention | reply]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": ""
  }
};

const crushCaptions = [
  "__-যোগাযোগ না হলেও কিছু মানুষ সব সময় প্রিয় থাকে <-!!-3🖤🌼🙂",
  "__-ভালোবাসি না বলেও ভালোবাসা যায় মানুষটির পাশে অন্য কাউকে সহ্য হয় না তাই <-!!-3🖤🌼🙂",
  "__-বিশ্বাস ছাড়া ভালোবাসা অর্থহীন আর অধিকার ছাড়া সম্পর্ক মূল্যহীন <-!!-3🖤🌼🙂",
  "__-মৃত্যু অনিবার্য জেনেও জন্ম নিলাম আর তোমাকে পাবো না জেনেও চাইলাম <-!!-3🖤🌼🙂",
  "__-ওহে কি করিলে বলো পাইবো তোমারে রাখিবো আঁখিতে আঁখি <-!!-3🖤🌼🙂",
  "__-আপনাকে পাওয়ার দাবী আমি মৃত্যুর পরেও ছাড়বো না <-!!-3🖤🌼🙂",
  "__-তুমি আমার সেই প্রিয় যাকে দেখলে আমার মুখে হাসি ফুটে <-!!-3🖤🌼🙂",
  "__-আমার এমন একটা তুমি চাই যে তুমিতে আমি ছাড়া অন্য কেউ নাই <-!!-3🖤🌼🙂",
  "__-পাওয়া আর না পাওয়ার শহরে তোমাকে পেয়ে গেলে আমার সব পাওয়া হয়ে যাবে <-!!-3🖤🌼🙂",
  "__-প্রত্যেকেরে'ই একটা নেশা থাকে আর আমার নেশা'টাই তুমি <-!!-3🖤🌼🙂"
];

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID, mentions, messageReply } = event;

  let targetID = null;

  if (mentions && Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
  } else if (messageReply && messageReply.senderID) {
    targetID = messageReply.senderID;
  }

  if (!targetID) {
    return api.sendMessage(
      "Please reply or mention someone......",
      threadID,
      messageID
    );
  }

  try {
    const apiList = await axios.get(
      "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json"
    );

    const AVATAR_CANVAS_API = apiList.data.AvatarCanvas;

    const res = await axios.post(
      `${AVATAR_CANVAS_API}/api`,
      {
        cmd: "crush",
        senderID,
        targetID
      },
      { responseType: "arraybuffer", timeout: 30000 }
    );

    const imgPath = path.join(
      __dirname,
      "cache",
      `crush_${senderID}_${targetID}.png`
    );

    fs.writeFileSync(imgPath, res.data);

    const caption =
      crushCaptions[Math.floor(Math.random() * crushCaptions.length)];

    return api.sendMessage(
      {
        body: `✧•❁𝐂𝐫𝐮𝐬𝐡❁•✧\n\n${caption}`,
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      () => fs.unlinkSync(imgPath),
      messageID
    );

  } catch (e) {
    return api.sendMessage(
      "API Error Call Boss SAHU",
      threadID,
      messageID
    );
  }
};
