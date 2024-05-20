import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class Dragon extends EventBase<Player> {
  constructor() {
    super(
      'Dragon',
      "Un dragon qui dort juste devant moi. Derrière lui se trouve un trésor d'une valeur inestimable. Repartir vivant avec quelques pierres précieuses, c'est l'assurance d'une vie paisible"
    )
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('stealth')) {
      player.backpack.add(Items.GoldNuggets, () => {
        note.add(
          new Note("J'ai réussi à me faufiler. Mais je n'ai pas de place dans mon sac...", 1)
        )
      })
      note.add(new Note("J'ai réussi à me faufiler sans un bruit et à récupérer quelque chose", 1))
    } else if (
      player.countTag('weapon') > 2 &&
      player.hasTag('fire resistance') &&
      player.hasTag('armor')
    ) {
      note.add(new Note("Le dragon c'est réveillé mais, j'ai réussi à le vaincre !", 2))
      player.backpack.add(Items.GoldNuggets, () => {
        note.add(new Note("Malheureusement je n'ai pas de place pour prendre mes récompenses", 0))
      })
    } else {
      note.add(new Note("Je tiens à ma vie, il faut que je part rapidement d'ici", 0))
    }
    return false
  }
}
