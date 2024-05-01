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

  public resolve(player: Player, note: Note): Note {
    super.resolve(player, note)
    if (!player.hasTag('weapon')) {
      note.add(new Note("Fuir ! C'est la seul chose que je puise faire !"))
      return note
    }
    if (player.countTag('weapon') === this.wolfsCount.get()) {
      note.add(
        new Note(
          this.wolfsCount.get() > 1
            ? 'Je suis suffisamment armé pour leurs tenir tête'
            : 'Je suis suffisamment armé pour lui tenir tête',
          this.wolfsCount.get() * 2
        )
      )
      return note
    }
    note.add(
      new Note(
        'Il sont trop nombreux pour moi... Je peux peut-être les calmer avec un peu de nourriture',
        player.countTag('weapon')
      )
    )
    if (!player.hasTag('meat')) {
      player.backpack.removeAllFromTag('meat')
      note.add(new Note('Voile de quoi les calmer un peu', 1))
    } else {
      note.add(new Note("Je n'ai absolument rien je vais devoir me débrouiller", -1))
    }
    return note
  }
}

class WolfsCount extends NumberValidation {
  constructor(value: number) {
    super(value, { min: 1, max: 3, safe: true })
  }
}
