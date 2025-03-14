import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class Farm extends EventBase<Player> {
  constructor() {
    super('Farm', 'Une ferme tenue par un couple de personnes âgées')
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    note.add(new Note("Le couple me proposait d'acheter quelques produits"))
    if (!player.hasTag('money')) {
      note.add(
        new Note(
          "Je n'avais malheureusement pas de quoi leur acheter des produits, ils m'ont quand même donné des œufs"
        )
      )
      player.backpack.add(Items.Eggs, () => {
        note.add(new Note("Je n'avais pas de place dans mon sac pour les emporter"))
      })
      return Resolution.Continue
    }
    note.add(new Note('POST {egg: boolean, cheese: boolean, bread: boolean, milk: boolean}'))
    if (
      !player.commands ||
      (!player.commands.egg &&
        !player.commands.cheese &&
        !player.commands.bread &&
        !player.commands.milk)
    ) {
      note.add(new Note("Je n'avais besoin de rien"))
      return Resolution.Continue
    }
    if (player.commands.egg === true) {
      note.add(new Note("L'œuf avait une étrange couleur d'or", 1))
      player.backpack.add(Items.GoldenEgg, () => {
        note.add(new Note("Je n'avais pas de place dans mon sac pour l'emporter", -1))
      })
    }
    if (player.commands.cheese === true) {
      note.add(new Note('Je leur avais acheté du fromage', 1))
      player.backpack.add(Items.Cheese, () => {
        note.add(new Note("Mais, je n'avais pas de place dans mon sac pour l'emporter", -1))
      })
    }
    if (player.commands.bread === true) {
      note.add(new Note('Je leur avais acheté du pain', 1))
      player.backpack.add(Items.Bread, () => {
        note.add(new Note("Mais, je n'avais pas de place dans mon sac pour l'emporter", -1))
      })
    }
    if (player.commands.milk === true) {
      note.add(new Note('Je leur avais acheté du lait', 1))
      player.backpack.add(Items.Milk, () => {
        note.add(new Note("Mais je n'avais pas de place dans mon sac pour l'emporter", -1))
      })
    }
    return Resolution.Continue
  }
}
