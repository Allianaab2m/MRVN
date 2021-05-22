const config = require('../config.json');
const package = require('../package.json');

module.exports = {
    commands: {
        help: {
            type: 'embed',
            permission: 'メンバー',
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
                        value: 'このコマンドです。BOTの使い方を知ることができます。',
                    },
                    {
                        name: `${config.prefix}github`,
                        value: 'このBOTのGitHubリポジトリのリンクを送信します。',
                    },
                    {
                        name: `${config.prefix}invite`,
                        value: 'このDiscordサーバーの招待リンクを送信します',
                    },
                    {
                        name: `${config.prefix}sfUpdate`,
                        value: 'サーバー情報を強制的に更新します。モデレーター以上の権限が必要です。',
                    },
                ],
            },
        },
        github: {
            type: 'text',
            permission: 'メンバー',
            text: 'Hiro527/MRVN: https://github.com/Hiro527/MRVN',
        },
        invite: {
            type: 'text',
            permission: 'メンバー',
            text: 'https://discord.gg/N5zGmzq',
        },
        sfUpdate: {
            type: 'exec',
            permission: 'モデレーター',
        },
    },
};