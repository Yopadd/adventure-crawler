import EventBase from '#app/core/exploration/adventure/event-base'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class Dragon extends EventBase<Player> {
  constructor() {
    super(
      'Dragon',
      "Un dragon ! C'est un dragon qui dort juste devant moi. Derrière lui ce trouve un trésor d'une valeur inestimable. Repartir vivant avec quelques pierres précieuses, c'est l'assurance d'une vie paisible"
    )
  }

  public resolve(player: Player, note: Note): Note | null {
    super.resolve(player, note)
    if (player.hasTag('stealth')) {
      try {
        player.backpack.add(Items.GoldNuggets)
      } catch (err) {
        Backpack.handleBackFullError(err, () => {
          note.add(
            new Note("J'ai réussi à me faufiler. Mais je n'ai pas de place dans mon sac...", 1)
          )
        })
      }
      note.add(new Note("J'ai réussi à me faufiler sans un bruit et à récupérer quelque chose", 1))
    }
    return note
  }
}
