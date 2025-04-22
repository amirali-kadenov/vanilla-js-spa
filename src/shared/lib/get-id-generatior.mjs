/**
 * @param {number} start
 */
export function* getIdGenerator(start = 0) {
  let id = start

  while (true) {
    yield id++
  }
}
