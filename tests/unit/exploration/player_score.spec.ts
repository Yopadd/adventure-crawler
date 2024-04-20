import { PlayerScore } from '#app/core/exploration/player/player'
import { test } from '@japa/runner'

test.group('Player score', () => {
  test('min score is always 0', async ({ expect }) => {
    const score = new PlayerScore(-4)
    expect(score.get()).toEqual(0)
  })
})
