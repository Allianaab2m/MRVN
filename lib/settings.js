const fs = require('fs');

module.exports = {
    DISCORD_TOKEN: fs.readFileSync('DISCORD_TOKEN', 'utf8'),
};