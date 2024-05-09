import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Crypt extends EventBase<Player> {
  constructor() {
    super('Crypt', "Dans des ruines abandonnées, un escalier descend dans l'obscurité")
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('light')) {
      note.add(new Note("L'exploration sera bien plus simple avec de la lumière", 1))
    } else {
      note.add(
        new Note("C'est ce n'est peut-être pas une bonne idée de si aventurer sans lumière", 0)
      )
    }
    note.add(new Note("J'entends des bruits qui proviennent du fond de la crypte", 0))
    if (player.hasTag('sword') && player.hasTag('light')) {
      note.add(new Note('Des morts vivants ! Ils sont lents et faible, je vais les découper', 2))
    } else if (player.hasTag('weapon')) {
      note.add(
        new Note("C'était, des morts vivants. Heureusement que j'avais de quoi me défendre", 1)
      )
    } else {
      note.add(new Note('...', 0))
      return true
    }
    if (!player.hasTag('light')) {
      note.add(new Note('Je ne trouverait rien de plus ici', 0))
    } else {
      note.add(
        new Note("La tombe d'un roi ornée de pierre précieuse, elle est celée par un sortilège", 1)
      )
      if (player.hasTag('magic resistance')) {
        note.add(new Note("J'ai pu ouvrir la tombe sans problème", 2))
      }
    }
    return false
  }
}
