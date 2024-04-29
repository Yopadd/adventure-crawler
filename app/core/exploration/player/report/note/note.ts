import { PlayerScore } from '#app/core/exploration/player/player'
import { StringValidation } from '#app/core/validations/string-validation'

export class Comment extends StringValidation {
  constructor(comment: string) {
    super(comment, { maxLength: 10_000 })
  }

  public join(comment: Comment, separator: string = '; ') {
    this.value = this.value + separator + comment.value
    return this
  }

  public static Empty = new Comment('')
}

export default class Note {
  private _comment: Comment
  private _score: number

  constructor(comment = '', score = 0) {
    this._comment = new Comment(comment)
    this._score = score
  }

  public add(note: Note, separator?: string): Note {
    if (this._comment.get().length > 0) {
      this._comment.join(note._comment, separator)
    } else {
      this._comment = note._comment
    }
    this._score += note._score
    return this
  }

  public get score(): PlayerScore {
    return new PlayerScore(this._score)
  }

  public get comment(): Comment {
    return new Comment(this._comment.get())
  }

  public static get Empty() {
    return new Note()
  }
}
