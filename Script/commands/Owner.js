const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗮𝗺𝗲 : 𝗠𝗔𝗦𝗛𝗜𝗞-𝗠𝗔𝗛𝗜𝗥
║ 🧸 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : 𝗠𝗔𝗛𝗜𝗥
║ 🎂 𝗔𝗴𝗲 : 𝟭𝟴+
║ 💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗜𝗡𝗚𝗟𝗘
║ 🎓 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻 : 𝗦𝗧𝗨𝗗𝗘𝗡𝗧
║ 📚 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 : 𝗛𝗦𝗖
║ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : 𝗕𝗢𝗚𝗨𝗥𝗔
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
╠═════════════════════ ✿
║ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 :
║  www.facebook.com/   61553339034231
║ 💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 :
║  m.me/61553339034231
║ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :
║  𝘄𝗽-দিলে বউ ঝাড়ু দিয়া    পিটাবে-!!🥺💔
║ ✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :
║  𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺-বেঁইচা বিড়ি খাইছি-!!   😁😜
╚═════════════════════ ✿
`;

  const images = [
    "https://i.imgur.com/c056aYc.jpeg",
    "https://i.imgur.com/S1WOFpD.jpeg",
    "https://i.imgur.com/z5RA4EM.jpeg",
    "https://i.imgur.com/oWADaPk.jpeg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
