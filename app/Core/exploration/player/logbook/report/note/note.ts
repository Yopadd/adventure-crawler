import { PlayerScore } from 'App/Core/exploration/player/player'
import { StringValidation } from 'App/Core/validations/string-validation'

export class Comment extends StringValidation {
  constructor(comment: string) {
    super(comment, { maxLength: 10_000 })
  }

  public join(comment: Comment, separator: string = '; ') {
    return new Comment(this.value + separator + comment.value)
  }

  public static Empty = new Comment('')
}

export default class Note {
  constructor(public readonly comment: Comment, public readonly score: PlayerScore) {}

  public add(note: Note): Note {
    return new Note(this.comment.join(note.comment), this.score.add(note.score))
  }

  public static Empty = new Note(Comment.Empty, PlayerScore.Zero)
}
