import { EventName } from '#app/core/install/event/event'
import { randomInt } from 'node:crypto'

export const Events = {
  Cliff(): EventName {
    return 'Cliff'
  },
  Collector(): EventName {
    return 'Collector'
  },
  CrossingLavaRiver(): EventName {
    return 'Crossing Lava River'
  },
  Crypt(): EventName {
    return 'Crypt'
  },
  FireCamp(): EventName {
    return 'Fire Camp'
  },
  Dragon(): EventName {
    return 'Dragon'
  },
  Thief(): EventName {
    return 'Thief'
  },
  TunnelInTheDark(): EventName {
    return 'Tunnel In The Dark'
  },
  Vampire(): EventName {
    return 'Vampire'
  },
  ItemChallenge(challenge?: number): EventName {
    function randomScoreMaxFrom(value: string): number {
      const max = Array.from(value)
        .map((c) => c.charCodeAt(0))
        .reduce((a, b) => a + b, 0)
      return randomInt(0, max)
    }
    challenge = challenge ?? randomScoreMaxFrom('etaonihsrl'.repeat(5))
    return `Item Challenge:${challenge}`
  },
  Wolfs(wolfCount: number = randomInt(1, 3)): EventName {
    return `Wolfs:${wolfCount}`
  },
}

// Remove event to randomiser
Object.defineProperty(Events, 'ItemChallenge', {
  enumerable: false,
})
