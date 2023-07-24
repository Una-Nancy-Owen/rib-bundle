import type NodeCG from '@nodecg/types';
import { GatewayIntentBits, Client } from 'discord.js'
import dotenv from 'dotenv'
import type { DiscordMessage } from "./replicant";

dotenv.config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

module.exports = async function (nodecg: NodeCG.ServerAPI) {
  nodecg.log.info("Hello, from your bundle's extension!");
  const myRep = nodecg.Replicant<DiscordMessage>('sandboxRep', {
    defaultValue: {
      message: "no message",
      url: "no url"
    }
  });

  nodecg.Replicant<DiscordMessage>('sandboxRep').on('change', (newVal) => {
    if (newVal == undefined) return;
    console.log('discordRep message: %s', newVal.message);
    console.log('discordRep url: %s', newVal.url);
  });

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const file = message.attachments.first();
    const _message = message.content;
    let _url = '';
    if (file) {
      if (!file.height && !file.width) {
      } else {
        _url = file.url;
      }
    }
    myRep.value = {
      message: _message,
      url: _url,
    };
  });
  client.login(process.env.DISCORD_TOKEN);
};
