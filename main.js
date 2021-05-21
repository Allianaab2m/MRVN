const Discord = require('discord.js');
const log4js = require('log4js');
const settings = require('./lib/settings');
const commands = require('./lib/commands'); // コマンド設定ファイル
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

const systemLog = log4js.getLogger('SYSTEM');

loggerInit();
client.login(settings.DISCORD_TOKEN);

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
})

client.once('ready', () => {
    systemLog.info('クライアント 準備完了');
});

client.on('guildMemberAdd', (member) => {
    systemLog.info(`メンバー参加: ${member.name}, UUID: ${user.id}`);
    client.channels.cache.get('752185115995537532').send(`
    :rank_predator: <@${member.id}>さん、${client.guilds.cache.get('751692700113305612').name}}へようこそ! :rank_master:
    <#752093558789505134> からルールを確認してください！
    `)
})