// utils.js

function generateFakeTxHash(chain) {
if (chain === 'BTC') {
return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
} else if (chain === 'ETH') {
return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
} else if (chain === 'USDT') {
return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
} else if (chain === 'USDC') {
return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
} else if (chain === 'LTC') {
return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}
}

function generateFakeBlockNumber(chain) {
if (chain === 'BTC') {
return Math.floor(Math.random() * 1000000) + 700000;
} else if (chain === 'ETH') {
return Math.floor(Math.random() * 10000000) + 10000000;
} else if (chain === 'USDT') {
return Math.floor(Math.random() * 10000000) + 10000000;
} else if (chain === 'USDC') {
return Math.floor(Math.random() * 10000000) + 10000000;
} else if (chain === 'LTC') {
return Math.floor(Math.random() * 1000000) + 700000;
}
}

function generateFakeGasFee(chain) {
if (chain === 'BTC') {
return (Math.random() * 0.0009 + 0.0001).toFixed(4);
} else if (chain === 'ETH') {
return (Math.random() * 0.0009 + 0.0001).toFixed(4);
} else if (chain === 'USDT') {
return (Math.random() * 0.0009 + 0.0001).toFixed(4);
} else if (chain === 'USDC') {
return (Math.random() * 0.0009 + 0.0001).toFixed(4);
} else if (chain === 'LTC') {
return (Math.random() * 0.0009 + 0.0001).toFixed(4);
}
}

function generateFakeTimestamp(chain) {
const now = Math.floor(Date.now() / 1000);
const randomOffset = Math.floor(Math.random() * 86400); // 24 hours in seconds
return now - randomOffset;
}

module.exports = {
generateFakeTxHash,
generateFakeBlockNumber,
generateFakeGasFee,
generateFakeTimestamp
};
