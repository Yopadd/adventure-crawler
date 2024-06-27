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
    if (!player.hasTag('weapon')) {
      note.add(new Note("J'ai dû fuir ! C'était la seule chose que je pouvais faire !"))
      return false
    }
    if (player.countTag('weapon') === this.wolfsCount.get()) {
      note.add(
        new Note(
          this.wolfsCount.get() > 1
            ? "J'étais suffisamment armé pour leur tenir tête"
            : "J'étais suffisamment armé pour lui tenir tête",
          this.wolfsCount.get() * 2
        )
      )
      return false
    }
    note.add(
      new Note(
        'Ils étaient trop nombreux pour moi... Peut-être que je pouvais les calmer avec un peu de nourriture',
        player.countTag('weapon')
      )
    )
    if (!player.hasTag('meat')) {
      player.backpack.removeAllFromTag('meat')
      note.add(new Note("J'avais de quoi les calmer un peu", 1))
    } else {
      note.add(new Note("Je n'avais absolument rien, j'ai dû me débrouiller...", -1))
    }
    return false
  }
}

class WolfsCount extends NumberValidation {
  constructor(value: number) {
    super(value, { min: 1, max: 3, safe: true })
  }
}
