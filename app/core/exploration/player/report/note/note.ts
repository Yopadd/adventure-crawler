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
  private _score: number

  constructor(comment = '', score = 0) {
    this.comment = new Comment(comment)
    this._score = score
  }

  public add(note: Note): Note {
    return new Note(this.comment.join(note.comment).get(), this.score.add(note.score).get())
  }

  public get score(): PlayerScore {
    return new PlayerScore(this._score)
  }

  public static Empty = new Note()
}
