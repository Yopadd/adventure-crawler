import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class Castel extends EventBase<Player> {
  constructor() {
    super('Castel', "Un château abandonné au milieu d'une forêt")
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    note.add(
      new Note(
        "Il ne semblait n'y avoir personne dans ce château, je pourrais peut-être trouver un endroit où m'installer pour la nuit"
      )
    )
    if (player.hasTag('fire') && (player.hasTag('food') || player.hasTag('water'))) {
      note.add(
        new Note("Je me suis installé·e dans une chambre à l'abri du vent et allumé un feu", 2)
      )
    }
    note.add(
      new Note(
        "J'entendais un bruit provenant du sous-sol du château, on aurait dit des bruits de pas et de métal qui s'entrechoquaient"
      )
    )
    if (player.hasTag('weapon')) {
      note.add(
        new Note(
          'En arrivant au sous-sol, je suis tombé·e sur des armures animées par la magie, elles protégeaient probablement quelque chose',
          1
        )
      )
      if (player.hasTag('stealth')) {
        new Note(
          "Elles étaient nombreuses mais peu agiles, avec un peu de discrétion, j'ai pu passer derrière elles sans souci",
          1
        )
      } else {
        const bonus = player.countTag('care') && player.countTag('shield')
        player.backpack.removeAllFromTag('care')
        new Note("Elles étaient nombreuses et il m'a été difficile d'en venir à bout", bonus - 2)
      }
      if (player.hasTag('shield')) {
        note.add(
          new Note(
            "J'ai poussé une porte piégée et une flèche sortie d'un mur s'est plantée dans mon bouclier",
            1
          )
        )
      } else if (player.hasTag('potion', 'care')) {
        note.add(
          new Note(
            "J'ai poussé une porte piégée et une flèche sortie d'un mur s'est plantée directement dans mon ventre, j'ai pu éviter la mort grâce à une potion de soins",
            1
          )
        )
      } else {
        note.add(
          new Note(
            "J'ai poussé une porte piégée et une flèche sortie d'un mur s'est plantée directement dans mon ventre, je vais peut-être mourir ici",
            -1
          )
        )
        return true
      }
      note.add(
        new Note(
          "Derrière la porte se trouvait une salle au trésor, j'y ai trouvé une petite statuette en or particulièrement sublime",
          1
        )
      )
      player.backpack.add(Items.OldStatuette, () => {
        note.add(new Note("Je ne pouvais malheureusement pas l'emporter avec moi"))
      })
    } else {
      note.add(
        new Note("Je n'avais rien pour me défendre, je ferais mieux de partir discrètement d'ici")
      )
    }

    return false
  }
}
