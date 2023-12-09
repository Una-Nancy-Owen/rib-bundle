import { NodeCG } from '../server'
import { GatewayIntentBits, Events, Client, EmbedBuilder, ColorResolvable } from 'discord.js'
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
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(/\s+/)
    if (command == commandName) {
      const title = args.join('')
      await message.channel.send({
        embeds: [getImgEmbedMessage(blue, getCountdownText(title, 10), imageUrl)],
      })
      await sleep(5000)
      await message.channel.send({ embeds: [getEmbedMessage(green, getCountdownText(title, 5))] })
      await sleep(2000)
      await message.channel.send({ embeds: [getEmbedMessage(orange, getCountdownText(title, 3))] })
      await sleep(1000)
      await message.channel.send({ embeds: [getEmbedMessage(orange, getCountdownText(title, 2))] })
      await sleep(1000)
      await message.channel.send({ embeds: [getEmbedMessage(orange, getCountdownText(title, 1))] })
      await sleep(1000)
      await message.channel.send({
        embeds: [getEmbedMessage(red, getCountdownText(title, 0))],
      })
    }
  })

  nodecg.listenFor('toggleCountdownBot', (value) => {
    if (value) {
      client.login(process.env.DISCORD_SANDBOX_TOKEN)
    } else {
      client.destroy()
    }
    countdownBotRep.value = value
    isRunning = value
  })
}

const getImgEmbedMessage = (color: ColorResolvable, title: string, imageUrl: string): EmbedBuilder => {
  const embed = new EmbedBuilder().setTitle(title).setColor(color).setImage(imageUrl).setTimestamp()
  return embed
}

const getEmbedMessage = (color: ColorResolvable, title: string): EmbedBuilder => {
  const embed = new EmbedBuilder().setTitle(title).setColor(color).setTimestamp()
  return embed
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
