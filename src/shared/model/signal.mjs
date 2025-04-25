/**
 * @template T
 * @typedef {(value: T) => void} Callback
 */

/**
 * @template T
 * @typedef {() => T} Getter
 */

/**
 * @template T
 * @typedef {(value: T) => void} Setter
 */

/**
 * @typedef {() => void} Unsubscribe
 */

/**
 * @template T
 * @typedef {(callback: Callback<T>) => Unsubscribe} Subscribe
 */

/**
/**
 * Creates a reactive signal: a getter/setter pair with subscription support.
 * Useful for managing reactive state in plain JavaScript.
 *
 * @template T
 * @param {T} initialValue - The initial value of the signal.
 * @returns {[Getter<T> & { subscribe: Subscribe<T> }, Setter<T>]} A tuple of [getter, setter].
 *
 * The getter has a `subscribe` method:
 *   getter.subscribe((value: T) => void): () => void
 *   - Subscribes to value changes, returns an unsubscribe function.
 */
export const createSignal = (initialValue) => {
  let value = initialValue

  const subscribers = new Set()

  /** @returns {T} */
  const get = () => value

  /** @param {T} newValue */
  const set = (newValue) => {
    value = newValue

    subscribers.forEach((fn) => fn(value))
  }

  /**
   * @param {(val: T) => void} callback
   * @returns {() => void} Unsubscribe function
   */
  const subscribe = (callback) => {
    subscribers.add(callback)

    callback(value) // immediate call with current value

    return () => subscribers.delete(callback)
  }

  // Attach subscribe method to getter
  get.subscribe = subscribe

  return [get, set]
}
