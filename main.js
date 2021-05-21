const Discord = require('discord.js');
const log4js = require('log4js');
const settings = require('./lib/settings');
const commands = require('./lib/commands'); // コマンド設定ファイル
const package = require('./package.json');
const config = require('./config.json'); // Discordクライアント用

const client = new Discord.Client();

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

loggerInit();
const systemLog = log4js.getLogger('SYSTEM');

client.login(settings.DISCORD_TOKEN).catch();

// イベントハンドラ
client.on('message', async message => {
    Object.keys(commands.commands).forEach((k) => {
        let tmp = config.prefix + k;
        if (tmp === message.content) {
            switch (commands.commands[k].type) {
                case 'text':
                    message.channel.send(commands.commands[k].text);
                    break;
                case 'embed':
                    message.channel.send({
                        embed: commands.commands[k].embed
                    });
                    break;
                default: 
                    message.reply('そのようなコマンドはありません。');
                    break;
            }
        }
    })
});

client.on('guildMemberAdd', (member) => {
    systemLog.info(`メンバー参加: ${client.users.cache.get(member.id).username}, UUID: ${member.id}`);
    client.channels.cache.get('752185115995537532').send(`
    <:rank_predator:844950262337896478> <@${member.id}>さん、**${client.guilds.cache.get('751692700113305612').name}**へようこそ! <:rank_master:844950261953069097>
    <#752093558789505134>からルールを確認してください！
    `);
});

client.once('ready', () => {
    systemLog.info(`MRVN v.${package.version} 起動完了`);
    client.user.setActivity('m!help | ApexM Japan')
});