const TelegramBot = require("node-telegram-bot-api");

// Create a new Telegram bot instance
const bot = new TelegramBot("6360531805:AAH3JAYmPGWxdOv__pMXda9fV_YDU0RXSso", {
  polling: true,
});

// create route

exports.telegram_create = async (req, res) => {
  // bot.onText(/\/start/, (msg) => {
  //   const chatId = msg.chat.id;
  //   bot.sendMessage(chatId, message);
  // });
};
// bot.startPolling();
