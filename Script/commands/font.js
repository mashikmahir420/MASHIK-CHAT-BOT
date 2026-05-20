module.exports.config = {
  name: "font",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Convert text into fonts",
  commandCategory: "Others",
  usages: "<1-10> <text>",
  usePrefix: true,
  cooldowns: 0
};

module.exports.run = async ({ event, api, args }) => {

  const fonts = [
    { name: "1", map: mono() },
    { name: "2", map: full() },
    { name: "3", map: squared() },
    { name: "4", map: squaredSmall() },
    { name: "5", map: negative() },
    { name: "6", map: italicBold() },
    { name: "7", map: sansBold() },
    { name: "8", map: serifBold() },
    { name: "9", map: fraktur() },
    { name: "10", map: doubleStruck() }
  ];

  if (args.length < 2) {
    return api.sendMessage(
`┏━━━━━━━━━━━━━━━━━━━┓
┃    🌸AVAILABLE FONTS🌸
┣━━━━━━━━━━━━━━━━━━━┫
┃ 1) 𝙼𝙰𝚂𝙷𝙸𝙺 𝙼𝙰𝙷𝙸𝚁
┃ 2) 𝖬𝖠𝖲𝖧𝖨𝖪 𝖬𝖠𝖧𝖨𝖱
┃ 3) 🄼🄰🅂🄷🄸🄺 🄼🄰🄷🄸🅁
┃ 4) 🅜︎🅐︎🅢︎🅗︎🅘︎🅚︎ 🅜︎🅐︎🅗︎🅘︎🅡︎
┃ 5) 🅼︎🅰︎🆂︎🅷︎🅸︎🅺︎ 🅼︎🅰︎🅷︎🅸︎🆁︎
┃ 6) 𝙈𝘼𝙎𝙃𝙄𝙆 𝙈𝘼𝙃𝙄𝙍
┃ 7) 𝗠𝗔𝗦𝗛𝗜𝗞 𝗠𝗔𝗛𝗜𝗥
┃ 8) 𝐌𝐀𝐒𝐇𝐈𝐊 𝐌𝐀𝐇𝐈𝐑
┃ 9) 𝖬𝖠𝖲𝖧𝖨𝖪 𝖬𝖠𝖧𝖨𝖱
┃10) 𝕄𝔸𝕊ℍ𝕀𝕂 𝕄𝔸ℍ𝕀ℝ
┣━━━━━━━━━━━━━━━━━━━┫
┃Use: Reply font <1-10>
┗━━━━━━━━━━━━━━━━━━━┛`,
      event.threadID,
      event.messageID
    );
  }

  const type = args.shift();
  const font = fonts.find(f => f.name === type);
  if (!font) {
    return api.sendMessage("Invalid font number.", event.threadID, event.messageID);
  }

  const text = args.join(" ");
  const result = text.split("").map(c => font.map[c] || c).join("");
  return api.sendMessage(result, event.threadID, event.messageID);
};


function mono() {
  return gen("𝙰", "𝚉", "𝚊", "𝚣", "𝟶");
}

function full() {
  return gen("Ａ", "Ｚ", "ａ", "ｚ", "０");
}

function squared() {
  return gen("🄰", "🅉", "🄰", "🅉", "⓿");
}

function squaredSmall() {
  return gen("🅐", "🅩", "🅐", "🅩", "⓪");
}

function negative() {
  return gen("🅰", "🆉", "🅰", "🆉", "⓪");
}

function italicBold() {
  return gen("𝘼", "𝙕", "𝙖", "𝙯", "𝟬");
}

function sansBold() {
  return gen("𝗔", "𝗭", "𝗮", "𝘇", "𝟬");
}

function serifBold() {
  return gen("𝐀", "𝐙", "𝐚", "𝐳", "𝟎");
}

function fraktur() {
  return gen("𝖠", "𝖹", "𝖺", "𝖿", "𝟘");
}

function doubleStruck() {
  return gen("𝔸", "ℤ", "𝕒", "𝕫", "𝟘");
}


function gen(A, Z, a, z, n) {
  const m = { " ": " " };

  for (let i = 0; i < 26; i++) {
    m[String.fromCharCode(65 + i)] = String.fromCodePoint(A.codePointAt(0) + i);
    m[String.fromCharCode(97 + i)] = a
      ? String.fromCodePoint(a.codePointAt(0) + i)
      : m[String.fromCharCode(65 + i)];
  }

  if (n) {
    for (let i = 0; i < 10; i++) {
      try {
        m[i] = String.fromCodePoint(n.codePointAt(0) + i);
      } catch {
        m[i] = i.toString();
      }
    }
  }

  return m;
}
