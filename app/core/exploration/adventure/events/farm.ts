import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class Farm extends EventBase<Player> {
  constructor() {
    super('Farm', 'Une ferme tenue par un couple de personnes âgées')
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    note.add(new Note("Le couple me propose d'acheter quelques produits"))
    if (!player.hasTag('money')) {
      note.add(
        new Note(
          "Je n'avais malheureusement pas de quoi leurs acheter des produits, ils m'ont quand même donner des oeufs"
        )
      )
      EventBase.addToBackpack(player, Items.Eggs, () => {
        note.add(new Note("Je n'ai pas de place dans mon sac pour les emporter"))
      })
      return false
    }
    note.add(new Note('POST {egg: boolean, cheese: boolean, bread: boolean, milk: boolean}'))
    if (
      !player.commands ||
      (!player.commands.egg &&
        !player.commands.cheese &&
        !player.commands.bread &&
        !player.commands.milk)
    ) {
      note.add(new Note("Je n'ai besoin de rien"))
      return false
    }
    if (player.commands.egg === true) {
      note.add(new Note("L'oeuf à une étrange couleur d'or", 1))
      EventBase.addToBackpack(player, Items.GoldenEgg, () => {
        note.add(new Note("Je n'ai pas de place dans mon sac pour l'emporter", -1))
      })
    }
    if (player.commands.cheese === true) {
      note.add(new Note('Je leur ai acheté du fromage', 1))
      EventBase.addToBackpack(player, Items.Cheese, () => {
        note.add(new Note("Je n'ai pas de place dans mon sac pour l'emporter", -1))
      })
    }
    if (player.commands.bread === true) {
      note.add(new Note('Je leur ai acheté du pain', 1))
      EventBase.addToBackpack(player, Items.Bread, () => {
        note.add(new Note("Je n'ai pas de place dans mon sac pour l'emporter", -1))
      })
    }
    if (player.commands.milk === true) {
      note.add(new Note('Je leur ai acheté du pain', 1))
      EventBase.addToBackpack(player, Items.Milk, () => {
        note.add(new Note("Je n'ai pas de place dans mon sac pour l'emporter", -1))
      })
    }
    return false
  }
}
