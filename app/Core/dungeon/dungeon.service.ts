import NotFoundError from '../errors/not-found.error'
import ExploreDungeonResult from '../explore-dungeon-result/explore-dungeon-result'
import { default as GetPageInput, default as getPageInput } from '../pages/get-page-input'
import Player from '../player/player'
import { ExploreDungeonUseCaseDungeonService } from '../use-cases/explore-dungeon.use-case'
import { GetDungeonsUseCaseDungeonService } from '../use-cases/get-dungeons.use-case'
import { InitiateDungeonsUseCaseDungeonService } from '../use-cases/initiate-dungeons.use-case'
import Dungeon, { DungeonProperty } from './dungeon'

export interface DungeonServiceDungeonRepository {
  findAll(input: GetPageInput): Promise<Dungeon[]>
  find(id: string): Promise<Dungeon | undefined>
  countAll(): Promise<number>
  save(dungeon: Dungeon): Promise<Dungeon>
}

export interface DungeonServiceExploreDungeonResultRepository {
  save(result: ExploreDungeonResult): Promise<ExploreDungeonResult>
}

export default class DungeonService
  implements
    InitiateDungeonsUseCaseDungeonService,
    GetDungeonsUseCaseDungeonService,
    ExploreDungeonUseCaseDungeonService
{
  constructor(
    private readonly dungeonRepository: DungeonServiceDungeonRepository,
    private readonly exploreDungeonResultRepository: DungeonServiceExploreDungeonResultRepository
  ) {}

  public getAll(input: getPageInput): Promise<Dungeon[]> {
    return this.dungeonRepository.findAll(input)
  }

  public async get(id: string): Promise<Dungeon> {
    const dungeon = await this.dungeonRepository.find(id)
    if (!dungeon) {
      throw new NotFoundError(`Dungeon "${id}"`)
    }
    return dungeon
  }

  public countAll(): Promise<number> {
    return this.dungeonRepository.countAll()
  }

  public create(properties: DungeonProperty[]): Promise<Dungeon> {
    return this.dungeonRepository.save(new Dungeon(properties))
  }

  public explore(player: Player, dungeon: Dungeon): Promise<ExploreDungeonResult> {
    const score = dungeon.resolve(player.inventory)
    const message = dungeon.properties.map((property) => property.description).join('\n')
    return this.exploreDungeonResultRepository.save(
      new ExploreDungeonResult(player, dungeon, score, message)
    )
  }
}
