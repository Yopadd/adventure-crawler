import Note from '#app/core/exploration/player/report/note/note'
import { test } from '@japa/runner'

test.group('Note', () => {
  test('min score of note is always 0', async ({ expect }) => {
    const note = new Note('test', 2)
    note.add(new Note('test', -4))
    expect(note.score.get()).toEqual(0)
  })

  test('comments in note are concatenated after a join', ({ expect }) => {
    const note = new Note('UN', 0)
    note.add(new Note('DEUX', 0))
    expect(note.comment.get()).toBe('UN; DEUX')
  })
})
