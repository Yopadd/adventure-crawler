import { PlayerScore } from '#app/core/exploration/player/player'
import { StringValidation } from '#app/core/validations/string-validation'

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
  public readonly comment: Comment
  public readonly score: PlayerScore

  constructor(comment = '', score = 0) {
    this.comment = new Comment(comment)
    this.score = new PlayerScore(score)
  }

  public add(note: Note): Note {
    return new Note(this.comment.join(note.comment).get(), this.score.add(note.score).get())
  }

  public static Empty = new Note()
}
