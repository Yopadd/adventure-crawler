import { game } from '#app/core/game'

export default class InstallController {
  async handle() {
    await game.install()
    return 'App is correctly installed'
  }
}
