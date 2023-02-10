import { UseCase } from '../application'
import Dungeon, { DungeonProperty } from '../dungeon/dungeon'
import DungeonPropertyLava from '../dungeon/properties/dungeon-property-lava'

export interface InitiateDungeonsUseCaseDungeonService {
  create(properties: DungeonProperty[]): Promise<Dungeon>
  countAll(): Promise<number>
}

interface InitiateDungeonsUseCaseInput {
  countOfDungeon: number
}

export default class InitiateDungeonsUseCase implements UseCase<InitiateDungeonsUseCaseInput> {
  constructor(private readonly dungeonsService: InitiateDungeonsUseCaseDungeonService) {}

  public async apply(input: InitiateDungeonsUseCaseInput) {
    const countOfExistingDungeons = await this.dungeonsService.countAll()
    for (let i = input.countOfDungeon - countOfExistingDungeons; i > 0; i--) {
      await this.dungeonsService.create([new DungeonPropertyLava()])
    }
  }
}
