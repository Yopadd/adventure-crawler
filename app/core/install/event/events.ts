import { randomInt } from 'node:crypto'

export type EventName = ReturnType<(typeof Events)[keyof typeof Events]>

export const Events = {
  Cliff(_?: string[]) {
    return 'Cliff' as const
  },
  Collector(_?: string[]) {
    return 'Collector' as const
  },
  CrossingLavaRiver(_?: string[]) {
    return 'Crossing Lava River' as const
  },
  Crypt(_?: string[]) {
    return 'Crypt' as const
  },
  FireCamp(_?: string[]) {
    return 'Fire Camp' as const
  },
  Dragon(_?: string[]) {
    return 'Dragon' as const
  },
  Thief(_?: string[]) {
    return 'Thief' as const
  },
  TunnelInTheDark(_?: string[]) {
    return 'Tunnel In The Dark' as const
  },
  Vampire(_?: string[]) {
    return 'Vampire' as const
  },
  ItemChallenge(_?: string[], challenge?: number) {
    function randomScoreMaxFrom(value: string): number {
      const max = Array.from(value)
        .map((c) => c.charCodeAt(0))
        .reduce((a, b) => a + b, 0)
      return randomInt(max)
    }
    challenge = challenge ?? randomScoreMaxFrom('etaonihsrl'.repeat(5))
    return `Item Challenge:${challenge}` as const
  },
  Wolfs(_?: string[], wolfCount: number = randomInt(1, 3)) {
    return `Wolfs:${wolfCount}` as const
  },
  GoldOffering(_?: string[]) {
    return 'Gold Offering' as const
  },
  SacrificeRoom(_?: string[]) {
    return 'Sacrifice Room' as const
  },
  Demons(_?: string[]) {
    return 'Demons' as const
  },
  MountainHiking(_?: string[]) {
    return 'Mountain Hiking' as const
  },
  ForestHiking(_?: string[]) {
    return 'Forest Hiking' as const
  },
  Farm(_?: string[]) {
    return 'Farm' as const
  },
  Castel(_?: string[]) {
    return 'Castel' as const
  },
  WizardHunt(_?: string[]) {
    return 'Wizard hunt' as const
  },
  TreasureHunter(adventureList?: string[]) {
    const names: string[] = []
    if (adventureList) {
      for (let i = 0; i < randomInt(1, 10); i++) {
        const name = adventureList[randomInt(0, adventureList?.length - 1)]
        if (!names.includes(name)) {
          names.push(adventureList[randomInt(0, adventureList?.length - 1)])
        }
      }
    }
    return `TreasureHunter:${names}` as const
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
