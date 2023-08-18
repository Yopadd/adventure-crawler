import Player from './player'

export default class PlayerAlreadyExistError extends Error {
  constructor(player: Player) {
    super(`player "${player.name}" already exist`)
  }
}
