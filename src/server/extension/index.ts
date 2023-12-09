import { NodeCG } from '../server'
import { discordCountdownBot } from './discord_countdown_bot'
import { discordSandboxReceiver } from './discord_sandbox_receiver'
import { logoController } from './logo_controller'
import { runnerDataController } from './runner_data_controller'
import { sandboxController } from './sandbox_controller'
import { speakerController } from './speaker_controller'
import { timerController } from './timer_controller'

export default async (nodecg: NodeCG) => {
  nodecg.log.info('Hello, NodeCG extension!')
  runnerDataController(nodecg)
  timerController(nodecg)
  speakerController(nodecg)
  sandboxController(nodecg)
  discordSandboxReceiver(nodecg)
  discordCountdownBot(nodecg)
  logoController(nodecg)
}
