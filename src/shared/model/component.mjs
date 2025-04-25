import { getIdGenerator } from '../lib/get-id-generatior.mjs'
import { resolveString } from '../lib/resolve-string.mjs'

/**
 * @typedef {Record<string, *>} PropsType
 */

/**
 * @template [State=unknown]
 * @template [Props=unknown]
 *
 * @typedef {(this: Component<State, Props>, props: Props) => string} RenderFunction
 */

/**
 * @template [State=unknown]
 * @template [Props=unknown]
 *
 * @typedef {(this: Component<State, Props>, element: HTMLElement) => (void | CleanupFunction)} MountFunction
 */

/**
 * @typedef {() => void} CleanupFunction
 */

/**
 * @template [State=unknown]
 * @template [Props=unknown]
 *
 * @typedef {Object} Options
 * @property {Props} [props]
 * @property {State} [initialState]
 * @property {RenderFunction<State, Props>} render
 * @property {MountFunction<State, Props>} [onMount]
 * @property {string} [className]
 */

const idGenerator = getIdGenerator()

/**
 * @template [State=unknown]
 * @template [Props=unknown]
 */
export class Component {
  isMounted = false

  /** @type {CleanupFunction[]} */
  cleanupFunctions = []

  /** @type {Map<string, Component<*,*>>} */
  children = new Map()

  /**
   * @param {Options<State, Props>} options
   */
  constructor({ props, initialState, render, onMount, className }) {
    const id = `${this.constructor.name}-${idGenerator.next().value}`

    /** @type {string} */
    this.id = id

    /** @type {State} */
    this.state = initialState ?? /** @type {State} */ ({})

    /**
     * @type {RenderFunction<State, Props>}
     * @this {Component<State, Props>}
     */
    this.render = render

    /**
     * @type {MountFunction<State, Props> | undefined}
     * @this {Component<State, Props>}
     */
    this.onMount = onMount

    /** @type {Props} */
    this.props = props ?? /** @type {Props} */ ({})

    /** @type {string} */
    this.className = className ?? ''
  }

  /**
   * Generate HTML with wrapper element
   */
  toHTML() {
    let html = this.render.call(this, this.props)

    html = this.processChildPlaceholders(html)

    return /* html */ `
      <div
        id="${this.id}"
        ${resolveString(
          this.className && `class="${resolveString(this.className)}"`
        )}
      >
        ${html}
      </div>
      `
  }

  /**
   * @param {string} content
   */
  processChildPlaceholders(content) {
    const placeholderRegex =
      /<component-placeholder\s+id="([^"]+)"[^>]*><\/component-placeholder>/g

    return content.replace(placeholderRegex, (_, childId) => {
      const childComponent = this.children.get(childId)

      if (!childComponent) {
        return `<!-- Child component ${childId} not found -->`
      }

      return childComponent.toHTML()
    })
  }

  /**
   * @template [State=Object]
   * @template [Props=Object]
   *
   * @param {string} childId
   * @param {Component<State, Props>} component
   */
  addChild(childId, component) {
    this.children.set(childId, component)
  }

  mount() {
    const element = document.getElementById(this.id)

    if (!element || this.isMounted) return

    this.isMounted = true

    this.mountChildren()

    if (!this.onMount) return

    try {
      const cleanup = this.onMount.call(this, element)
      if (cleanup) this.cleanupFunctions.push(cleanup)
    } catch (error) {
      console.error(`Error mounting component ${this.id}:`, error)
    }
  }

  unmount() {
    if (!this.isMounted) return

    this.unmountChildren()

    const element = document.getElementById(this.id)

    if (!element) return

    this.cleanupFunctions.forEach((cleanup) => {
      try {
        cleanup()
      } catch (error) {
        console.error(
          `Error in cleanup function for component ${this.id}:`,
          error
        )
      }
    })

    this.cleanupFunctions = []
    this.isMounted = false
  }

  mountChildren() {
    this.children.forEach((child) => {
      child.mount()
    })
  }

  unmountChildren() {
    this.children.forEach((child) => {
      if (child.isMounted) {
        child.unmount()
      }
    })
  }

  /**
   *
   * @param {Component} parent
   * @param {Component} child
   */
  static child(parent, child) {
    parent.addChild(child.id, child)

    return `<component-placeholder id="${child.id}"></component-placeholder>`
  }

  /**
   * @param {Partial<State>} partialState
   */
  setState(partialState) {
    this.state = { ...this.state, ...partialState }

    if (!this.isMounted) return

    const element = document.getElementById(this.id)

    if (!element) return

    this.unmount()
    element.outerHTML = this.toHTML()
    this.mount()
  }

  rerender() {
    const element = document.getElementById(this.id)
    if (!element) return

    this.unmountChildren()
    element.outerHTML = this.toHTML()
    this.mountChildren()
  }
}
