import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class OldRuins extends EventBase<Player> {
  constructor() {
    super('Old Ruins', 'Des vestiges antiques recèlent des mystères')
  }

  public resolve(player: Player, note: Note) {
    if (player.hasTag('treasure')) {
      note.add(
        new Note(
          "Les symboles ressemblaient à ceux de mon trésor. J'ai découvert un secret caché.",
          3
        )
      )
    } else if (player.hasTag('light')) {
      note.add(new Note("Avec ma lumière, j'ai exploré les recoins obscurs avec succès.", 2))
    } else {
      note.add(new Note("Je manquais d'équipement pour explorer plus loin, dommage."))
    }
    return Resolution.Continue
  }
}
