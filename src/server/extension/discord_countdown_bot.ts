import { NodeCG } from '../server'
import { GatewayIntentBits, Events, Client, EmbedBuilder, ColorResolvable, TextChannel } from 'discord.js'
import dotenv from 'dotenv'
import { TimerSignal } from 'rib-bundle'

export const discordCountdownBot = (nodecg: NodeCG) => {
  const countdownBotRep = nodecg.Replicant('isRunningCountdownBot')
  countdownBotRep.value = false
  let isRunning: boolean = countdownBotRep.value ?? false
  let currentTitle = ''
  const PREFIX: string = '!'
  const COMMAND_NAME: string = 'yum'
  const BLUE = `#0099ff`
  const GREEN = `#00ff66`
  const ORANGE = `#ff8833`
  const RED = `#ff0000`

  dotenv.config()

  const IMAGE_URL = process.env.COUNTDOWN_IMAGE_URL ?? ''
  const COUNTDOWN_CHANNEL_ID = process.env.DISCORD_COUNTDOWN_CHANNEL_ID ?? ''

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
    if (!message.content.startsWith(PREFIX)) return
    const [command, ...args] = message.content.slice(PREFIX.length).split(/\s+/)
    if (command == COMMAND_NAME) {
      const title = args.join('')
      const channelID = message.channelId
      if (title.length == 0) {
        await countdown(channelID, currentTitle)
      } else {
        await countdown(channelID, title)
      }
    }
  })

  nodecg.listenFor('toggleCountdownBot', (value) => {
    if (value) {
      client.login(process.env.DISCORD_COUNTDOWN_TOKEN)
      currentTitle = nodecg.readReplicant('currentRunnerGroup').title[0]
    } else {
      client.destroy()
    }
    countdownBotRep.value = value
    isRunning = value
  })

  nodecg.listenFor('startCountdownAndTimer', async () => {
    if (!isRunning) return
    await countdown(COUNTDOWN_CHANNEL_ID, currentTitle)
    const timerSignal: TimerSignal = {
      signalType: 'Start',
      all: true,
      index: 0,
    }
    nodecg.sendMessage('setTimerSignal', timerSignal)
  })

  nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
    currentTitle = newValue.title[0]
  })

  const countdown = async (channelID: string, title: string) => {
    await sendImgEmbedMessage(channelID, BLUE, getCountdownText(title, 10), IMAGE_URL)
    await sleep(5000)
    await sendEmbedMessage(channelID, GREEN, getCountdownText(title, 5))
    await sleep(2000)
    await sendEmbedMessage(channelID, ORANGE, getCountdownText(title, 3))
    await sleep(1000)
    await sendEmbedMessage(channelID, ORANGE, getCountdownText(title, 2))
    await sleep(1000)
    await sendEmbedMessage(channelID, ORANGE, getCountdownText(title, 1))
    await sleep(1000)
    await sendEmbedMessage(channelID, RED, getCountdownText(title, 0))
  }

  const sendImgEmbedMessage = async (
    channelID: string,
    color: ColorResolvable,
    title: string,
    imageUrl: string
  ): Promise<void> => {
    if (isRunning) {
      const embed = new EmbedBuilder().setTitle(title).setColor(color).setImage(imageUrl).setTimestamp()
      await (client.channels.cache.get(channelID) as TextChannel).send({ embeds: [embed] })
    }
  }

  const sendEmbedMessage = async (channelID: string, color: ColorResolvable, title: string): Promise<void> => {
    if (isRunning) {
      const embed = new EmbedBuilder().setTitle(title).setColor(color).setTimestamp()
      await (client.channels.cache.get(channelID) as TextChannel).send({ embeds: [embed] })
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
