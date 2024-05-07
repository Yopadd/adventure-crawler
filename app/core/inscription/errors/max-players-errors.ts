export default class MaxPlayerErrors extends Error {
  constructor() {
    super('Max players reached')
  }
}
