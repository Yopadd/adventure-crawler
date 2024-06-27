import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Vampire extends EventBase<Player> {
  constructor() {
    const starter = ['Une cave sombre', 'Un petit bosquet dans la pénombre', 'Une grotte']
    super('Vampire', EventBase.randomPick(starter))
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (!player.hasTag('light')) {
      note.add(new Note('Je ne voyais rien dans cette obscurité...', 0))
      return true
    }
    note.add(
      new Note(
        "J'avais de quoi m'éclairer, j'ai pu avancer... Je crois avoir vu quelque chose bouger !",
        1
      )
    )
    if (!(player.hasTag('armor') && player.hasTag('weapon'))) {
      note.add(new Note("Un vampire ! Il était rapide, je n'avais aucune chance contre lui !", 0))
    } else if (player.hasTag('armor') && !player.hasTag('weapon')) {
      note.add(new Note('Un vampire ! Il était rapide, mais je lui ai échappé', 1))
    } else {
      note.add(new Note("Un vampire ! J'avais de quoi le combattre"))
    }
    return false
  }
}
