import Adventure, { AdventureName } from '#app/core/exploration/adventure/adventure'
import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class TreasureHunter extends EventBase<Player> {
  private readonly treasureMap: TreasureMap

  constructor(adventureList: AdventureName[]) {
    const adventureListString = adventureList.map((name) => name.get()).join(';')
    super(`TreasureHunter:${adventureListString}`, "Un chasseur de trésor s'est présenté à moi")
    this.treasureMap = new TreasureMap(adventureList)
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    const adventuresVisited = player.adventuresVisited.map(({ adventure }) => adventure)
    if (this.treasureMap.compare(adventuresVisited)) {
      note.add(
        new Note(
          "Je lui indiqué la piste que j'ai trouvé et il m'a remercié fortement pour mon aide",
          this.treasureMap.length
        )
      )
    } else {
      note.add(
        new Note(
          "Il m'a donner une carte au trésor, il me demande de revenir le voir si je trouve quelque chose"
        )
      )
      note.add(new Note(this.treasureMap.toString()))
    }
    return false
  }
}

class TreasureMap {
  public readonly length: number

  constructor(private readonly adventureList: AdventureName[]) {
    this.length = adventureList.length
  }

  compare(adventures: Adventure[]): boolean {
    const adventureListReverse = this.adventureList.reverse()
    for (const index in adventureListReverse) {
      const predicate =
        adventures.at(Number(index))?.name.equal(adventureListReverse[index]) ?? false
      if (!predicate) return false
    }
    return true
  }

  toString() {
    return this.adventureList.map((name) => `GET ${name.get()}`).join('\n')
  }
}
