const crypto = require('crypto');

// Generate a 16-byte salt
const salt = crypto.randomBytes(16).toString('hex');

// Generate a 32-byte key
const key = crypto.randomBytes(32).toString('hex');

console.log(`Generated salt: ${salt}`);
console.log(`Generated key: ${key}`);