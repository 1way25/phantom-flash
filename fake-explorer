const puppeteer = require('puppeteer');

async function generateFakeExplorerPage(txHash, token, amount, from, to) {
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

const html = `
<html>
<head>
<title>Ethereum Transaction Hash</title>
</head>
<body>
<h1>Ethereum Transaction Hash (Txhash) Details</h1>
<p>Transaction Hash: ${txHash}</p>
<p>From: ${from}</p>
<p>To: ${to}</p>
<p>Amount: ${amount} ${token}</p>
<p>Status: Confirmed</p>
<p>Block Confirmation: 12</p>
<p>Gas Fee: 0.0001 ETH</p>
</body>
</html>
`;

await page.setContent(html);
const screenshot = await page.screenshot({ type: 'png' });

await browser.close();

return screenshot;
}

module.exports = generate