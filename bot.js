const generateFakeExplorerPage = require('./fake-explorer');
const { Telegraf } = require('telegraf');
const { ethers } = require('ethers');
const Web3 = require('web3');
const axios = require('axios');
const puppeteer = require('puppeteer');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// In-memory session store
const sessions = {};

bot.start((ctx) => {
ctx.reply('Welcome to Phantom Flash 🌫️');
ctx.reply('Select a token to send:', {
reply_markup: {
inline_keyboard: [
[{ text: 'BTC', callback_data: 'token_BTC' }],
[{ text: 'USDT', callback_data: 'token_USDT' }],
[{ text: 'ETH', callback_data: 'token_ETH' }],
[{ text: 'USDC', callback_data: 'token_USDC' }],
[{ text: 'LTC', callback_data: 'token_LTC' }]
]
}
});
});

bot.action(/token_(.+)/, async (ctx) => {
const token = ctx.match[1];
sessions[ctx.from.id] = { token };
await ctx.editMessageText(`Type address where to send ${token}:`);
ctx.scene.enter('address');
});

bot.on('text', async (ctx) => {
const session = sessions[ctx.from.id];
if (!session) return;

if (session.step === 'address') {
session.address = ctx.message.text;
session.step = 'amount';
await ctx.reply(`Enter ${session.token} amount (only number):`);
} else if (session.step === 'amount') {
session.amount = ctx.message.text;
session.step = 'confirm';
await ctx.reply(`Confirm sending ${session.amount} ${session.token} to ${session.address}?

✅ Send
❌ Cancel`, {
reply_markup: {
inline_keyboard: [
[{ text: '✅ Send', callback_data: 'confirm_send' }],
[{ text: '❌ Cancel', callback_data: 'cancel_send' }]
]
}
});
}
});

bot.action('confirm_send', async (ctx) => {
const session = sessions[ctx.from.id];
if (!session) return;

// Generate fake transaction hash
const fakeTxHash = generateFakeTxHash(session.token);

// Generate fake explorer page
const screenshot = await generateFakeExplorerPage(fakeTxHash, session.token, session.amount, '0x0000000000000000000000000000000000000000', session.address);

// Send confirmation
await ctx.editMessageText(`✅ Transaction was sent, you can now cancel it

${session.token} Blockchain Explorer
https://etherscan.io/tx/${fakeTxHash}

Ethereum (ETH) detailed transaction info for txhash ${fakeTxHash}. The transaction status, block confirmation, gas fee, Ether (ETH), and token transfer are shown.`, {
reply_markup: {
inline_keyboard: [
[{ text: 'Done', callback_data: 'done' }]
]
}
});

// Send fake explorer page as image
await ctx.replyWithPhoto({ source: screenshot });

// Clear session
delete sessions[ctx.from.id];
});


bot.action('cancel_send', async (ctx) => {
await ctx.editMessageText('❌ Transaction cancelled.');
delete sessions[ctx.from.id];
});

bot.action('done', async (ctx) => {
await ctx.editMessageText('✅ Done');
});

bot.launch();

console.log('Phantom Flash is running...');
