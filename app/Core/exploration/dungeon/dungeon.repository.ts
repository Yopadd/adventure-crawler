import DungeonModel from 'App/Models/Dungeon.model'
import Note, { Comment } from '../player/logbook/report/note/note'
import { PlayerScore } from '../player/player'
import { DungeonRepository } from '../use-cases/explore-dungeon.use-case'
import Dungeon, { DungeonEventDescription, DungeonEventName, DungeonName } from './dungeon'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async getByName(name: string): Promise<Dungeon> {
    const model = await DungeonModel.findOrFail(name)
    // TODO : https://docs.adonisjs.com/reference/orm/decorators#column use serialize and consume
    return new Dungeon(
      new DungeonName(model.name),
      model.events.split(';').map(() => ({
        name: DungeonEventName.LAVA,
        description: new DungeonEventDescription(''),
        resolve() {
          return new Note(new Comment(''), PlayerScore.Zero)
        },
      }))
    )
  }
}
