import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class Vampire extends EventBase<Player> {
  constructor(private readonly gender: 'F' | 'M') {
    const starter = ['Une cave sombre', 'Un petit bosquet dans la pénombre', 'Une grotte']
    super(`Vampire:${gender}`, EventBase.randomPick(starter))
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    if (!player.hasTag('light')) {
      note.add(new Note('Je ne voyais rien dans cette obscurité...', 0))
      return Resolution.EndOfAdventure
    }
    note.add(
      new Note(
        "J'avais de quoi m'éclairer, j'ai pu avancer... Je crois avoir vu quelque chose bouger !",
        1
      )
    )
    if (player.hasTag('treasure')) {
      const treasureCount = player.countTag('treasure')
      player.backpack.removeAllFromTag('treasure')
      note.add(
        new Note(
          `C'était ${this.gender === 'M' ? 'un' : 'une'} vampire ! ${this.gender === 'M' ? 'Il' : 'Elle'} m'a ${this.gender === 'M' ? 'laissé' : 'laissée'} la vie sauve contre mes trésors`,
          treasureCount * 2
        )
      )
    } else if (!(player.hasTag('armor') && player.hasTag('weapon'))) {
      note.add(
        new Note(
          `${this.gender === 'M' ? 'Un' : 'Une'} vampire ! ${this.gender === 'M' ? 'Il' : 'Elle'} était rapide, je n'avais aucune chance contre ${this.gender === 'M' ? 'lui' : 'elle'} !`,
          0
        )
      )
    } else if (player.hasTag('armor') && !player.hasTag('weapon')) {
      note.add(
        new Note(
          `${this.gender === 'M' ? 'Un' : 'Une'} vampire ! ${this.gender === 'M' ? 'Il' : 'Elle'} était rapide, mais je lui ai échappé`,
          1
        )
      )
    } else {
      note.add(
        new Note(
          `${this.gender === 'M' ? 'Un' : 'Une'} vampire ! J'avais de quoi ${this.gender === 'M' ? 'le' : 'la'} combattre`
        )
      )
    }
    return Resolution.Continue
  }
}
