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
args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();

const blockNumber = generateFakeBlockNumber();
const gasFee = generateFakeGasFee();
const timestamp = generateFakeTimestamp();
const hash = txHash || generateFakeTxHash();

const html = `
<html>
<head>
<meta charset="utf-8" />
<title>Transaction</title>
<style>
body { font-family: Arial, sans-serif; margin: 24px; color:#111; }
.card{ border:1px solid #e5e7eb; border-radius:12px; padding:20px; max-width:720px;}
h1{ font-size:20px; margin:0 0 12px;}
.row{ display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f3f4f6;}
.row:last-child{ border-bottom:0;}
.label{ color:#6b7280;}
code{ background:#f9fafb; padding:2px 6px; border-radius:6px; }
</style>
</head>
<body>
<div class="card">
<h1>${token} Transaction</h1>
<div class="row"><div class="label">Hash</div><div><code>${hash}</code></div></div>
<div class="row"><div class="label">Status</div><div>Success</div></div>
<div class="row"><div class="label">Block</div><div>${blockNumber}</div></div>
<div class="row"><div class="label">Timestamp</div><div>${timestamp}</div></div>
<div class="row"><div class="label">From</div><div><code>${from}</code></div></div>
<div class="row"><div class="label">To</div><div><code>${to}</code></div></div>
<div class="row"><div class="label">Amount</div><div>${amount} ${token}</div></div>
<div class="row"><div class="label">Gas Fee</div><div>${gasFee} ETH</div></div>
</div>
</body>
</html>`;

await page.setContent(html, { waitUntil: 'networkidle0' });
const pngBuffer = await page.screenshot({ type: 'png', fullPage: false });
await browser.close();
return pngBuffer;
}

module.exports = { generateFakeExplorerPage };