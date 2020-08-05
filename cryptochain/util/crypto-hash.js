const crypto = require('crypto');

const cryptoHash = (...inputs) => { // Gathers all inputs into the inputs array
    const hash = crypto.createHash('sha256');
    hash.update(inputs.map((input) => JSON.stringify(input)).sort().join(' '));
    return hash.digest('hex');
};

module.exports = cryptoHash;