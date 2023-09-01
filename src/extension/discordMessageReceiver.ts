import { NodeCG } from './nodecg';
import { GatewayIntentBits, Client } from 'discord.js'
import { AssistContent } from "rib-bundle";
import dotenv from 'dotenv'


export function initDiscordMessageReceiver(nodecg: NodeCG) {
    dotenv.config()

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });
    client.once('ready', () => {
        console.log('Ready!');
    });


    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (message.channelId !== process.env.DISCORD_MONITORING_CHANNEL_ID) return;
        const file = message.attachments.first();
        const _message = message.content;
        let _url = '';
        if (file) {
            if (!file.height && !file.width) {
            } else {
                _url = file.url;
            }
        }
        let discordMessage: AssistContent = <AssistContent>{
            group: -10,
            header: '',
            content: '',
            url: '',
        }
        const newLineRegex = /[\r\n]+/gm;
        if (newLineRegex.test(_message)) {
            const headerRegex = /.+/gm;
            const _header = _message.match(headerRegex);
            if (_header !== null && _header !== undefined) {
                discordMessage.header = _header[0];
            }
            const contentRegex = /(?<=[\r\n]).+/gm;
            const _content = _message.match(contentRegex);
            if (_content !== null && _content !== undefined) {
                _content.map((val, i) => discordMessage.content += `${val}\n`);
            }
        } else {
            if (_message !== '' || _message !== undefined) {
                discordMessage.header = _message;
            }
            if (_url !== '' || _url !== undefined) {
                discordMessage.url = _url;
            }
        }
        nodecg.sendMessage('setAssistContent', discordMessage);
    });
    client.login(process.env.DISCORD_TOKEN);
}