import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class FireCamp extends EventBase<Player> {
  constructor() {
    super('Fire Camp', 'Un bon endroit pour faire une pause')
  }

  public resolve(player: Player, note: Note): Note {
    super.resolve(player, note)
    if (player.hasTag('fire')) {
      note.add(new Note("J'ai pu rallumer ce vieux feu de camp", 1))
    }
    if (player.hasTag('water') && player.hasTag('food')) {
      note.add(new Note("C'est le bon moment pour un bon repas", 3))
    } else if (player.hasTag('water')) {
      note.add(new Note("Un peu d'eau avant de reprendre la route", 1))
    } else if (player.hasTag('food')) {
      note.add(new Note('Un petit casse-croûte avant de reprendre la route', 1))
    }
    note.add(new Note('Il est temps de reprendre la route', 1))
    return note
  }
}
