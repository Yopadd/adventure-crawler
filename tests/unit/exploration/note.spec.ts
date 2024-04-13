import Note from '#app/core/exploration/player/report/note/note'
import { test } from '@japa/runner'

test.group('Note', () => {
  test('min score of note is always 0', async ({ expect }) => {
    const note = Note.Empty
    note.add(new Note('test', -1))
    expect(note.score.get()).toEqual(0)
  })
})
