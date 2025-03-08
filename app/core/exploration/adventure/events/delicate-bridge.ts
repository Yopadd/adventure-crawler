import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class DelicateBridge extends EventBase<Player> {
  constructor() {
    super('Delicate Bridge', 'Un vieux pont suspendu grince sous vos pieds')
  }

  public resolve(player: Player, note: Note) {
    if (player.hasTag('alert')) {
      note.add(new Note("Grâce à ma vigilance, j'ai traversé avec prudence.", 2))
    } else if (player.hasTag('strength')) {
      note.add(
        new Note(
          "J'ai renforcé la structure avec ce que j'avais et j'ai traversé en toute sécurité.",
          3
        )
      )
    } else {
      note.add(new Note("Le pont s'est effondré sous mon poids... Quelle chute !"))
    }
    return Resolution.Continue
  }
}
