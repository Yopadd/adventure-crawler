import Report from 'App/Core/exploration/player/logbook/report/report'

export default class Logbook {
  constructor(public readonly reports: Report[]) {}
}
