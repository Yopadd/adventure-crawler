import { randomUUID } from 'node:crypto'
import Dungeon, { DungeonEventName, DungeonName } from '../dungeon/dungeon.js'

export interface DungeonRepository {
  create(dungeon: Dungeon): Promise<void>
  countAll(): Promise<number>
}

interface InitiateDungeonsUseCaseInput {
  dungeonCount: number
}

export default class InitiateDungeonsUseCase {
  constructor(private readonly dungeonRepository: DungeonRepository) {}

  public async apply(input: InitiateDungeonsUseCaseInput) {
    const countOfExistingDungeons = await this.dungeonRepository.countAll()
    for (let i = input.dungeonCount - countOfExistingDungeons; i >= 0; i--) {
      await this.dungeonRepository.create(
        new Dungeon(new DungeonName(randomUUID()), [DungeonEventName.LAVA])
      )
    }
  }
}
