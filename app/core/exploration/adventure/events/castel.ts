import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class Castel extends EventBase<Player> {
  constructor() {
    super('Castel', "Un chateau abandonner au milieux d'une forêt")
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    note.add(
      new Note(
        "Il ne semble n'y avoir personne dans ce chateau, je pourrais peut-être un endroit où m'installer pour la nuit"
      )
    )
    if (player.hasTag('fire') && (player.hasTag('food') || player.hasTag('water'))) {
      note.add(
        new Note("Je me suis installé dans une chambre à l'abri du vent et allumé un feu", 2)
      )
    }
    note.add(
      new Note(
        "J'entends un bruit qui provient du sous-sol du chateau, on dirait des bruits de pas et de métal qui s'entrechoque"
      )
    )
    if (player.hasTag('weapon')) {
      note.add(
        new Note(
          'En arrivant au sous-sol je suis tombé sur des armures animées par la magie, elles protègent probablement quelque chose',
          1
        )
      )
      if (player.hasTag('stealth')) {
        new Note(
          "Elles étaient nombreuse mais peut agile, avec un peu de discrétion j'ai pu passer derrière elles sans soucis",
          1
        )
      } else {
        const bonus = player.countTag('care') && player.countTag('shield')
        player.backpack.removeAllFromTag('care')
        new Note("Elle étaient nombreuse il m'a était difficile d'en venir à bout", bonus - 2)
      }
      if (player.hasTag('shield')) {
        note.add(
          new Note(
            "J'ai poussé une porte piégée et une flèche sortie d'un mur c'est plantée dans mon bouclier",
            1
          )
        )
      } else if (player.hasTag('potion', 'care')) {
        note.add(
          new Note(
            "J'ai poussé une porte piégée et une flèche sortie d'un mur c'est plantée directement dans mon ventre, j'ai pu éviter la mort grace à une potion de soins",
            1
          )
        )
      } else {
        note.add(
          new Note(
            "J'ai poussé une porte piégée et une flèche sortie d'un mur c'est plantée directement dans mon ventre, je vais peut-être mourir ici",
            -1
          )
        )
        return true
      }
      note.add(
        new Note(
          "Derrière la porte se trouvait une salle au trésor, j'y ai trouvé une petit statuette en or particulièrement sublime",
          1
        )
      )
      player.backpack.add(Items.OldStatuette, () => {
        note.add(new Note("Je ne peux malheureusement pas l'emporter avec moi"))
      })
    } else {
      note.add(
        new Note("Je n'ai rien pour me défendre je ferais mieux de partir discrètement d'ici")
      )
    }

    return false
  }
}
