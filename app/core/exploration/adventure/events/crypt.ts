import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Crypt extends EventBase<Player> {
  constructor() {
    super('Crypt', "Dans des ruines abandonnées, un escalier descendait dans l'obscurité")
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('light')) {
      note.add(new Note("L'exploration a été bien plus simple avec de la lumière", 1))
    } else {
      note.add(new Note("Ce n'était peut-être pas une bonne idée de s'y aventurer sans lumière", 0))
    }
    note.add(new Note("J'entendais des bruits qui provenaient du fond de la crypte", 0))
    if (player.hasTag('sword') && player.hasTag('light')) {
      note.add(new Note('Des morts-vivants ! Ils étaient lents et faibles, je les ai découpés', 2))
    } else if (player.hasTag('weapon')) {
      note.add(
        new Note("C'étaient des morts-vivants. Heureusement que j'avais de quoi me défendre", 1)
      )
    } else {
      note.add(new Note('...', 0))
      return true
    }
    if (!player.hasTag('light')) {
      note.add(new Note('Je ne trouverais rien de plus ici', 0))
    } else {
      note.add(
        new Note(
          "La tombe d'un roi ornée de pierres précieuses, elle était scellée par un sortilège",
          1
        )
      )
      if (player.hasTag('magic resistance')) {
        note.add(new Note("J'ai pu ouvrir la tombe sans problème", 2))
      }
    }
    return false
  }
}
