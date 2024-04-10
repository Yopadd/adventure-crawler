import Dungeon, {
  DungeonEventDescription,
  DungeonEventName,
  DungeonName,
} from '#app/core/exploration/dungeon/dungeon'
import { PlayerScore } from '#app/core/exploration/player/player'
import Note, { Comment } from '#app/core/exploration/player/report/note/note'
import { DungeonRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import DungeonModel from '#models/dungeon.model'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async getByName(name: string): Promise<Dungeon> {
    const model = await DungeonModel.findOrFail(name)
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
