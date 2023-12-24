import { NodeCG } from '../server'
import { GatewayIntentBits, Events, Client, EmbedBuilder, ColorResolvable, Message } from 'discord.js'
import dotenv from 'dotenv'

export const discordCountdownBot = (nodecg: NodeCG) => {
  const countdownBotRep = nodecg.Replicant('isRunningCountdownBot')
  countdownBotRep.value = false
  let isRunning: boolean = countdownBotRep.value ?? false
  const prefix: string = '!'
  const commandName: string = 'yum'
  const blue = `#0099ff`
  const green = `#00ff66`
  const orange = `#ff8833`
  const red = `#ff0000`

  dotenv.config()

  const imageUrl = process.env.COUNTDOWN_IMAGE_URL ?? ''

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
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(/\s+/)
    if (command == commandName) {
      const title = args.join('')
      await sendImgEmbedMessage(message, blue, getCountdownText(title, 10), imageUrl)
      await sleep(5000)
      await sendEmbedMessage(message, green, getCountdownText(title, 5))
      await sleep(2000)
      await sendEmbedMessage(message, orange, getCountdownText(title, 3))
      await sleep(1000)
      await sendEmbedMessage(message, orange, getCountdownText(title, 2))
      await sleep(1000)
      await sendEmbedMessage(message, orange, getCountdownText(title, 1))
      await sleep(1000)
      await sendEmbedMessage(message, red, getCountdownText(title, 0))
    }
  })

  nodecg.listenFor('toggleCountdownBot', (value) => {
    if (value) {
      client.login(process.env.DISCORD_COUNTDOWN_TOKEN)
    } else {
      client.destroy()
    }
    countdownBotRep.value = value
    isRunning = value
  })

  const sendImgEmbedMessage = async (
    message: Message<boolean>,
    color: ColorResolvable,
    title: string,
    imageUrl: string
  ): Promise<void> => {
    if (isRunning) {
      const embed = new EmbedBuilder().setTitle(title).setColor(color).setImage(imageUrl).setTimestamp()
      await message.channel.send({ embeds: [embed] })
    }
  }

  const sendEmbedMessage = async (message: Message<boolean>, color: ColorResolvable, title: string): Promise<void> => {
    if (isRunning) {
      const embed = new EmbedBuilder().setTitle(title).setColor(color).setTimestamp()
      await message.channel.send({ embeds: [embed] })
    }
  }
}

const getCountdownText = (title: string, count: number) => {
  if (count == 10) {
    return `『${title}』開始のカウントダウン通知です。\nスタートまであと${count.toString()}秒`
  } else if (count == 0) {
    return `『${title}』\nスタート！`
  } else {
    return `『${title}』\nスタートまであと ${count.toString()}秒`
  }
}

const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
