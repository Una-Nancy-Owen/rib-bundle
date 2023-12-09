import { AssistContent } from 'rib-bundle'
import { NodeCG } from '../server'
import { GatewayIntentBits, Events, Client } from 'discord.js'
import dotenv from 'dotenv'

export const discordSandboxReceiver = (nodecg: NodeCG) => {
  const sandboxRep = nodecg.Replicant('isRunningSandboxReceiver')
  sandboxRep.value = false
  let isRunning: boolean = sandboxRep.value ?? false
  dotenv.config()

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  })

  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.id}`)
  })

  client.on('messageCreate', async (message) => {
    if (!isRunning) return
    if (message.author.bot) return
    if (message.channelId != process.env.DISCORD_MONITORING_CHANNEL_ID) return
    const file = message.attachments.first()
    const content = message.content
    let url = ''
    if (file) {
      if (file.height && file.width) {
        url = file.url
      }
    }
    const assistContent: AssistContent = discordMessageToAssistContent(content, url)
    nodecg.sendMessage('overrideSandbox', assistContent)
  })

  nodecg.listenFor('toggleSandboxReceiver', (value) => {
    if (value) {
      client.login(process.env.DISCORD_SANDBOX_TOKEN)
    } else {
      client.destroy()
    }
    sandboxRep.value = value
    isRunning = value
  })
}

const discordMessageToAssistContent = (content: string, url: string): AssistContent => {
  let discordMessage: AssistContent = <AssistContent>{
    group: -10,
    header: '',
    content: '',
    url: '',
  }
  const newLineRegex = /[\r\n]+/gm
  if (newLineRegex.test(content)) {
    const headerRegex = /.+/gm
    const matchedHeader = content.match(headerRegex)
    if (matchedHeader != null) {
      discordMessage.header = matchedHeader[0]
    }
    const contentRegex = /(?<=[\r\n]).+/gm
    const matchedContent = content.match(contentRegex)
    if (matchedContent != null) {
      matchedContent.map((val) => (discordMessage.content += `${val}\n`))
    }
  } else {
    if (content != '' || content != null) {
      discordMessage.header = content
    }
    if (url != '' || url != null) {
      discordMessage.url = url
    }
  }
  return discordMessage
}
