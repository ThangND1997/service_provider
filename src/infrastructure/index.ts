import TelegramClient from "./Telegram";

const telegramClient = new TelegramClient({secretTelegram: process.env.TOKEN_TELEGRAM_SECRET, groupId: process.env.GROUP_TELEGRAM_ID});

export { telegramClient };