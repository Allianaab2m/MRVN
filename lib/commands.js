const config = require('../config.json');
const package = require('../package.json');

module.exports = {
    commands: {
        help: {
            type: 'embed',
            embed: {
                author: {
                    name: `MRVN v${package.version}`,
                    icon_url: 'https://cdn.discordapp.com/attachments/698690249571958838/845241551751479296/cae81e4b2a43e46eb9ee87e96ceb717a.png',
                },
                color: 0xffbe30,
                timestamp: new Date(),
                fields: [
                    {
                        name: `${config.prefix}help`,
                        value: 'このコマンドです。BOTの使い方を知ることができます。'
                    },
                    {
                        name: `${config.prefix}github`,
                        value: 'このBOTのGitHubリポジトリのリンクを送信します。'
                    }
                ]
            }
        },
        github: {
            type: 'text',
            text: 'Hiro527/MRVN: https://github.com/Hiro527/MRVN'
        }
    }
}