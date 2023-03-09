import PlayerModel from 'App/Models/Player.model'
import { DateTime } from 'luxon'
import GetPageInput from '../pages/get-page-input'
import Player from './player'
import { PlayerServicePlayerRepository } from './player.service'

export default class PlayerRepository implements PlayerServicePlayerRepository {
  private readonly players = new Map<string, Player>()

  public async findAll(input: GetPageInput): Promise<Player[]> {
    return input.getPage(this.players.values())
  }

  public async findByName(name: string): Promise<Player | undefined> {
    return Array.from(this.players.values()).find((player) => player.name.get() === name)
  }

  public async countAll(): Promise<number> {
    return this.players.size
  }

  public async save(player: Player, password: string): Promise<Player> {
    await PlayerModel.create({
      id: player.id,
      name: player.name.get(),
      createdAt: DateTime.now(),
      password: password,
    })
    return player
  }

  public flush() {
    this.players.clear()
  }
}
