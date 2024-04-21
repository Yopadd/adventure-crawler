import { game } from '#app/core/game'

export default class UninstallController {
  async handle() {
    await game.uninstall()
    return 'Game is correctly uninstalled'
  }
}
