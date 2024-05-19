import { randomInt } from 'node:crypto'

export type EventName = ReturnType<(typeof Events)[keyof typeof Events]>

export const Events = {
  Cliff() {
    return 'Cliff' as const
  },
  Collector() {
    return 'Collector' as const
  },
  CrossingLavaRiver() {
    return 'Crossing Lava River' as const
  },
  Crypt() {
    return 'Crypt' as const
  },
  FireCamp() {
    return 'Fire Camp' as const
  },
  Dragon() {
    return 'Dragon' as const
  },
  Thief() {
    return 'Thief' as const
  },
  TunnelInTheDark() {
    return 'Tunnel In The Dark' as const
  },
  Vampire() {
    return 'Vampire' as const
  },
  ItemChallenge(challenge?: number) {
    function randomScoreMaxFrom(value: string): number {
      const max = Array.from(value)
        .map((c) => c.charCodeAt(0))
        .reduce((a, b) => a + b, 0)
      return randomInt(max)
    }
    challenge = challenge ?? randomScoreMaxFrom('etaonihsrl'.repeat(5))
    return `Item Challenge:${challenge}` as const
  },
  Wolfs(wolfCount: number = randomInt(1, 3)) {
    return `Wolfs:${wolfCount}` as const
  },
  GoldOffering() {
    return 'Gold Offering' as const
  },
  SacrificeRoom() {
    return 'Sacrifice Room' as const
  },
  Demons() {
    return 'Demons' as const
  },
  MountainHiking() {
    return 'Mountain Hiking' as const
  },
  ForestHiking() {
    return 'Forest Hiking' as const
  },
  Farm() {
    return 'Farm' as const
  },
}

// Remove events of randomiser
Object.defineProperties(Events, {
  ItemChallenge: {
    enumerable: false,
  },
  GoldOffering: {
    enumerable: false,
  },
  SacrificeRoom: {
    enumerable: false,
  },
})
