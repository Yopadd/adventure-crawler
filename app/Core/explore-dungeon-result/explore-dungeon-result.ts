import Dungeon from "../dungeon/dungeon";
import Player from "../player/player";
import { NumberValidation } from "../validations/number-validation";
import { StringValidation } from "../validations/string-validation";

export default class ExploreDungeonResult {
  readonly score: ExploreDungeonResultScore;
  readonly message: ExploreDungeonResultMessage;
  readonly player: Player;
  readonly dungeon: Dungeon;
  readonly exploreAt: Date;

  constructor(
    player: Player,
    dungeon: Dungeon,
    score: number,
    message: string,
    exploreAt = new Date()
  ) {
    this.score = new ExploreDungeonResultScore(score);
    this.message = new ExploreDungeonResultMessage(message);
    this.player = player;
    this.dungeon = dungeon;
    this.exploreAt = exploreAt;
  }
}

class ExploreDungeonResultScore extends NumberValidation {
  constructor(score: number) {
    super(score, { min: 0, max: Infinity });
  }
}

class ExploreDungeonResultMessage extends StringValidation {
  constructor(message: string) {
    super(message, { maxLength: 10_000 });
  }
}
