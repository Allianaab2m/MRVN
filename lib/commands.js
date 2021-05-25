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
            execute: (client, message, systemLog) => {
                // サーバー情報の強制更新
                const guild = client.guilds.cache.get('751692700113305612');
                let embedData = {
                    color: 0x00ffff,
                    timestamp: new Date(),
                    description: `
                    サーバー情報の更新に成功しました。
                    `,
                };
                try {
                    const entireMemberCountCh = client.channels.cache.get('845540229196021790');
                    const usersCountCh = client.channels.cache.get('845539306973298708');
                    const botCountCh = client.channels.cache.get('845540086152953887');
                    const entireMemberCount = guild.memberCount;
                    const botCount = guild.members.cache.filter(member => member.user.bot).size;
                    const usersCount = entireMemberCount - botCount;
                    entireMemberCountCh.setName(`総メンバー数: ${entireMemberCount}`);
                    usersCountCh.setName(`ユーザー: ${usersCount}`);
                    botCountCh.setName(`BOT: ${botCount}`);
                }
                catch (e) {
                    systemLog.error(e);
                    embedData = {
                        color: 0xff0000,
                        description: `
                        サーバー情報の更新に失敗しました。詳細はエラーログを確認してください。
                        `,
                    };
                }
                message.channel.send({ embed: embedData });
                return;
            },
        },
    },
};