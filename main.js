const Discord = require('discord.js');
const log4js = require('log4js');
const token = require('./DISCORD_TOKEN.json');
const package = require('./package.json');
// コマンド設定ファイル
const commands = require('./lib/commands');
// Discordクライアント用
const config = require('./config.json');

const permissionLevel = ['メンバー', 'モデレーター', '管理者'];
const client = new Discord.Client();
let guild = null;

const loggerInit = () => {
    log4js.configure({
        appenders: {
            consoleLog: {
                type: 'console',
            },
            system: {
                type: 'file',
                filename: 'logs/system.log',
            },
        },
        categories: {
            default: {
                appenders: [
                    'consoleLog',
                ],
                level: [
                    'trace',
                ],
            },
            SYSTEM: {
                appenders: [
                    'system',
                    'consoleLog',
                ],
                level: [
                    'debug',
                ],
            },
        },
    });
};

const permissionError = (message, required) => {
    systemLog.error(`権限エラー: ${message.content}(必要: ${required}), ${message.author.tag}(UUID:${message.author.id}, 最高権限: ${message.member.roles.highest.name})`);
};

loggerInit();
const systemLog = log4js.getLogger('SYSTEM');

client.login(token.token).catch();

// イベントハンドラ
client.on('message', async message => {
    if (!message.content || !message.content.startsWith('m!') || message.author.bot) return;
    const userHighestRole = message.member.roles.highest.name;
    const userPermission = permissionLevel.includes(userHighestRole) ? userHighestRole : 'メンバー';
    const cmd = message.content.split(' ')[0];
    const args = message.content.split(' ').splice(1);
    Object.keys(commands.commands).forEach((k) => {
        const tmp = config.prefix + k;
        if (tmp === cmd) {
            if (permissionLevel.indexOf(userPermission) >= permissionLevel.indexOf(commands.commands[k].permission)) {
                switch (commands.commands[k].type) {
                    case 'text':
                        // テキスト送信のみのコマンド
                        message.channel.send(commands.commands[k].text);
                        break;
                    case 'embed':
                        // embed送信コマンド
                        message.channel.send({
                            embed: commands.commands[k].embed,
                        });
                        break;
                    case 'exec':
                        // ソースコード実行コマンド
                        commands.commands[k].execute(client, message, systemLog, args);
                        break;
                }
            }
            else {
                message.reply('あなたはこのコマンドを実行するのに必要な権限を持っていません。');
                permissionError(message, commands.commands[k].permission);
            }
        }
    });
});

client.on('guildMemberAdd', (member) => {
    systemLog.info(`メンバー参加: ${client.users.cache.get(member.id).tag}(UUID: ${member.id})`);
    client.channels.cache.get('752185115995537532').send(`
    <:rank_predator:844950262337896478> <@${member.id}>さん、**${client.guilds.cache.get('751692700113305612').name}**へようこそ! <:rank_master:844950261953069097>
    <#752093558789505134>からルールを確認してください！
    `);
});

client.on('guildMemberRemove', (member) => {
    systemLog.info(`メンバー削除: ${client.users.cache.get(member.id).tag}(UUID: ${member.id})`);
});

client.once('ready', () => {
    systemLog.info(`MRVN v.${package.version} 起動完了`);
    systemLog.info(`ログイン成功: ${client.user.tag}(UUID:${client.user.id})`);
    client.user.setActivity(`m!help | v.${package.version}`);
    guild = client.guilds.cache.get('751692700113305612');
    setInterval(() => {
        const entireMemberCountCh = client.channels.cache.get('845540229196021790');
        const usersCountCh = client.channels.cache.get('845539306973298708');
        const botCountCh = client.channels.cache.get('845540086152953887');
        const entireMemberCount = guild.memberCount;
        const botCount = guild.members.cache.filter(member => member.user.bot).size;
        const usersCount = entireMemberCount - botCount;
        entireMemberCountCh.setName(`総メンバー数: ${entireMemberCount}`);
        usersCountCh.setName(`ユーザー: ${usersCount}`);
        botCountCh.setName(`BOT: ${botCount}`);
    }, 10000);
});

process.on('exit', () => {
    client.destroy();
});