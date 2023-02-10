export default class NotFoundError extends Error {
  constructor(str: string) {
    super(`${str} not found`)
  }
}
