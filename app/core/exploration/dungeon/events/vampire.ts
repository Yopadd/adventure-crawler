import EventBase from '#app/core/exploration/dungeon/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Vampire extends EventBase<Player> {
  constructor() {
    const starter = ['Une cave sombre', 'Un petit bosquet dans la pénombre', 'Une grotte']
    super('Vampire', EventBase.RandomPick(starter))
  }

  public resolve(player: Player): Note {
    if (!player.hasTag('light')) {
      return new Note("Je ne vois rien dans cette obscurité... Mais qu'es ce que !", 0)
    }
    let note = new Note(
      "J'ai de quoi m'éclairer, je vais pouvoir avancer... Je crois avoir vu quelque chose bouger !",
      1
    )
    if (!(player.hasTag('armor') && player.hasTag('weapon'))) {
      note.add(new Note("Un vampire ! il est rapide, je n'ai aucune chance contre lui !", 0))
    } else if (player.hasTag('armor') && !player.hasTag('weapon')) {
      note.add(new Note('Un vampire ! il est rapide, je pense pouvoir le échapper', 1))
    } else {
      note.add(new Note("Un vampire, j'ai de quoi le combattre ...ça va le faire"))
    }
    return note
  }
}
