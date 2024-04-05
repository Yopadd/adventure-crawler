import env from '#start/env'
import Report from '#app/core/exploration/player/logbook/report/report'

export default class Logbook {
  public readonly maxSize: number
  public readonly reports: Report[]

  constructor(public readonly size: number) {
    this.maxSize = env.get('LOGBOOK_SIZE')
  }

  public add(report: Report) {
    if (this.size + 1 > this.maxSize) {
      throw new Error('Logbook is full')
    }
    this.reports.push(report)
  }
}
