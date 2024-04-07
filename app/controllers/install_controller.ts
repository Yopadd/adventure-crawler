import { game } from '#app/core/game'
import env from '#start/env'

export default class InstallController {
  async handle() {
    const DUNGEON_COUNT = env.get('DUNGEON_COUNT')
    await game.install({ dungeonCount: DUNGEON_COUNT })
    return 'App is correctly installed'
  }
}
