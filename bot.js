// bot.js
const { Telegraf } = require('telegraf');
const { generateFakeTxHash } = require('./utils');
module.exports = generateFakeExplorerPage;

// Use the env var you created in Render
const bot = new Telegraf(process.env.BOT_TOKEN);

// Simple in-memory sessions
const sessions = {};

bot.start(async (ctx) => {
await ctx.reply('Welcome to Phantom Flash 🌫️');
await ctx.reply('Select a token to send:', {
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
sessions[ctx.from.id] = { token, step: 'address' };
await ctx.editMessageText(`Type address where to send ${token}:`);
});

bot.on('text', async (ctx) => {
const s = sessions[ctx.from.id];
if (!s) return;

if (s.step === 'address') {
s.address = ctx.message.text.trim();
s.step = 'amount';
await ctx.reply(`Enter ${s.token} amount (only number):`);
return;
}

if (s.step === 'amount') {
s.amount = ctx.message.text.trim();
s.step = 'confirm';
await ctx.reply(
`Confirm sending ${s.amount} ${s.token} to ${s.address}?`,
{
reply_markup: {
inline_keyboard: [
[{ text: '✅ Send', callback_data: 'confirm_send' }],
[{ text: '❌ Cancel', callback_data: 'cancel_send' }]
]
}
}
);
}
});

bot.action('confirm_send', async (ctx) => {
const s = sessions[ctx.from.id];
if (!s) return;

try {
const fakeTxHash = generateFakeTxHash(s.token);

// returns a PNG Buffer
const screenshot = await generateFakeExplorerPage(
fakeTxHash,
s.token,
s.amount,
'0x0000000000000000000000000000000000000000',
s.address
);

await ctx.editMessageText(
`✅ Transaction was sent.\n\n${s.token} Explorer:\nhttps://etherscan.io/tx/${fakeTxHash}\n\nTx: ${fakeTxHash}`,
{
reply_markup: {
inline_keyboard: [[{ text: 'Done', callback_data: 'done' }]]
}
}
);

await ctx.replyWithPhoto({ source: screenshot });
} catch (e) {
console.error(e);
await ctx.reply('⚠️ Failed to generate preview.');
} finally {
delete sessions[ctx.from.id];
}
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
