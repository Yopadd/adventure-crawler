import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { NumberValidation } from '#app/core/validations/number-validation'

export default class Wolfs extends EventBase<Player> {
  private readonly wolfsCount: WolfsCount

  constructor(wolfsCount: number) {
    const wc = new WolfsCount(wolfsCount)
    super(`Wolfs:${wc.get()}`, wolfsCount > 1 ? 'Des loups !' : 'Un loup !')
    this.wolfsCount = wc
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('goat')) {
      note.add(
        new Note(
          this.wolfsCount.get() > 1
            ? 'Les loups ont bizarrement fui à en nous voyant'
            : 'Le loups ont bizarrement fui à en nous voyant',
          6
        )
      )
      return false
    }

    if (!player.hasTag('weapon')) {
      note.add(new Note("J'ai dû fuir ! C'était la seule chose que je pouvais faire !"))
      return false
    } else if (player.countTag('weapon') >= this.wolfsCount.get()) {
      note.add(
        new Note(
          this.wolfsCount.get() > 1
            ? "J'étais suffisamment armé pour leur tenir tête"
            : "J'étais suffisamment armé pour lui tenir tête",
          this.wolfsCount.get() * 2
        )
      )
      return false
    } else {
      note.add(new Note('Ils étaient trop nombreux pour moi...', player.countTag('weapon')))
    }

    if (player.hasTag('animal')) {
      const animalCount = player.countTag('animal')
      if (animalCount > 1) {
        note.add(new Note("Mais mes animaux m'ont permis faire diversion et de m'échapper", 2))
      } else {
        note.add(new Note("Mais mon animal m'a permis faire diversion et de m'échapper", 1))
      }
    } else if (player.hasTag('meat')) {
      player.backpack.removeAllFromTag('meat')
      note.add(
        new Note(
          `Mais j'avais de quoi calmer ${this.wolfsCount.get() > 1 ? 'leur faim' : 'sa faim'}`,
          1
        )
      )
    } else {
      note.add(new Note("j'ai dû me débrouiller pour fuir...", -1))
    }
    return false
  }
}

class WolfsCount extends NumberValidation {
  constructor(value: number) {
    super(value, { min: 1, max: 3, safe: true })
  }
}
