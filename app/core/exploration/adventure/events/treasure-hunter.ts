import Adventure, { AdventureName, Resolution } from '#app/core/exploration/adventure/adventure'
import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class TreasureHunter extends EventBase<Player> {
  private readonly treasureMap: TreasureMap

  constructor(
    adventureList: AdventureName[],
    private readonly gender: 'F' | 'M'
  ) {
    const adventureListString = adventureList.map((name) => name.get()).join(';')
    super(
      `TreasureHunter:${adventureListString}:${gender}`,
      `${gender === 'M' ? 'Un chasseur' : 'Une chasseuse'} de trésors s'est ${gender === 'M' ? 'présenté' : 'présentée'} à moi`
    )
    this.treasureMap = new TreasureMap(adventureList)
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    const adventuresVisited = player.adventuresVisited.map(({ adventure }) => adventure)
    if (player.hasTag('treasure')) {
      note.add(
        new Note(
          `${this.gender === 'M' ? 'Attiré' : 'Attirée'} et ${this.gender === 'M' ? 'impressionné' : 'impressionnée'} par mes trésors ${this.gender === 'M' ? 'il' : 'elle'} voulait discuter entre aventurier·e, ont à passé un bon moment`,
          1
        )
      )
      return Resolution.Continue
    }
    if (this.treasureMap.compare(adventuresVisited)) {
      note.add(
        new Note(
          `Je lui ai ${this.gender === 'M' ? 'indiqué' : 'indiquée'} indiqué la piste que j'avais trouvée et il m'a remercié chaleureusement pour mon aide`,
          this.treasureMap.length * 4
        )
      )
    } else {
      note.add(
        new Note(
          `${this.gender === 'M' ? 'Il' : 'Elle'} m'a ${this.gender === 'M' ? 'donné' : 'donnée'} une carte au trésor et m'a ${this.gender === 'M' ? 'demandé' : 'demandée'} de revenir ${this.gender === 'M' ? 'le' : 'la'} voir si je trouvais quelque chose`
        )
      )
      note.add(new Note(this.treasureMap.toString()))
    }
    return Resolution.Continue
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
