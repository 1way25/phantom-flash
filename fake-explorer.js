// fake-explorer.js
const puppeteer = require('puppeteer');
const {
generateFakeTxHash,
generateFakeBlockNumber,
generateFakeGasFee,
generateFakeTimestamp
} = require('./utils');

async function generateFakeExplorerPage(txHash, token, amount, from, to) {
const browser = await puppeteer.launch({
headless: true,
executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
args: [
'--no-sandbox',
'--disable-setuid-sandbox',
'--disable-dev-shm-usage'
]
});

const page = await browser.newPage();

const blockNumber = generateFakeBlockNumber(token);
const gasFee = generateFakeGasFee(token);
const timestamp = generateFakeTimestamp(token);

const html = `
<html>
<head>
<title>${token} Transaction Hash</title>
<style>
body { font-family: Arial, sans-serif; margin: 20px; }
.box { border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
h2 { color: #333; }
p { font-size: 14px; color: #555; }
</style>
</head>
<body>
<div class="box">
<h2>${token} Transaction Successful ✅</h2>
<p><strong>Hash:</strong> ${txHash}</p>
<p><strong>From:</strong> ${from}</p>
<p><strong>To:</strong> ${to}</p>
<p><strong>Amount:</strong> ${amount} ${token}</p>
<p><strong>Block:</strong> ${blockNumber}</p>
<p><strong>Gas Fee:</strong> ${gasFee}</p>
<p><strong>Timestamp:</strong> ${new Date(timestamp * 1000).toLocaleString()}</p>
</div>
</body>
</html>
`;

await page.setContent(html);
const screenshot = '/tmp/fake_tx.png';
await page.screenshot({ path: screenshot });
await browser.close();

return screenshot;
}

module.exports = generateFakeExplorerPage;
module.exports = generateFakeExplorerPage;
