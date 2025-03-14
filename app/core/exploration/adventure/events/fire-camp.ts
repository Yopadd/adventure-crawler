import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class FireCamp extends EventBase<Player> {
  constructor() {
    super('Fire Camp', 'Un bon endroit pour faire une pause')
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    if (player.hasTag('fire')) {
      note.add(new Note("J'avais pu rallumer ce vieux feu de camp", 1))
    }
    if (player.hasTag('water') && player.hasTag('food')) {
      note.add(new Note("C'était le bon moment pour un bon repas", 3))
    } else if (player.hasTag('water')) {
      note.add(new Note("Un peu d'eau avant de reprendre la route", 1))
    } else if (player.hasTag('food')) {
      note.add(new Note('Un petit casse-croûte avant de reprendre la route', 1))
    }
    note.add(new Note('Il était temps de reprendre la route', 1))
    return Resolution.Continue
  }
}
