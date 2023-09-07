import Report from 'App/Core/exploration/player/logbook/report/report'
import GetPageInput from 'App/Core/pages/get-page-input'
import NotFoundError from '../../errors/not-found.error'
import { GetDungeonsUseCaseDungeonService } from '../../preparation/use-cases/get-dungeons.use-case'
import { InitiateDungeonsUseCaseDungeonService } from '../../use-cases/initiate-dungeons.use-case'
import { ExploreDungeonUseCaseDungeonRepository } from '../use-cases/explore-dungeon.use-case'
import Dungeon, { DungeonEvent } from './dungeon'

export interface DungeonServiceDungeonRepository {
  findAll(input: GetPageInput): Promise<Dungeon[]>
  find(id: string): Promise<Dungeon | undefined>
  countAll(): Promise<number>
  save(dungeon: Dungeon): Promise<Dungeon>
}

export interface DungeonServiceExploreDungeonResultRepository {
  save(result: Report): Promise<Report>
}

export default class DungeonService
  implements
    InitiateDungeonsUseCaseDungeonService,
    GetDungeonsUseCaseDungeonService,
    ExploreDungeonUseCaseDungeonRepository
{
  constructor(private readonly dungeonRepository: DungeonServiceDungeonRepository) {}

  public getAll(input: GetPageInput): Promise<Dungeon[]> {
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

  public create(properties: DungeonEvent[]): Promise<Dungeon> {
    return this.dungeonRepository.save(new Dungeon(properties))
  }
}
