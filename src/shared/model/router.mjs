/** @typedef {import('@/shared/model/component.mjs').Component<any, any>} Component */

import { resolveString } from '../lib/resolve-string.mjs'

/**
 * @typedef {() => Promise<Component>} LazyComponent
 * A function that returns a Promise resolving to a Component.
 * Used for lazy loading components to improve initial load performance.
 */

const ROUTER_VIEW_ID = 'router-view'

/**
 * @typedef {Object} Route
 * @property {string} path - The URL path pattern for the route (e.g. '/home', '/about'). Required.
 * @property {Component | LazyComponent} component - The component to render for this route, can be either a direct component or a lazy-loaded one.
 * @property {Routes} [children] - Optional nested child routes for this route.
 * @property {Component} [placeholder] - Optional component to show while the main component is loading.
 */

/**
 * @typedef {Route[]} Routes
 * An array of route definitions that make up the application's routing structure.
 */

/**
 * @typedef {Object} Options
 * @property {Routes} routes - The complete routing configuration for the application.
 * @property {HTMLElement} rootElement - The DOM element where the router will render components.
 * @property {Component} notFoundComponent - The component to render when no matching route is found (404).
 */

/**
 * @typedef {Object} RouteMatch
 * @property {Component | LazyComponent} component - The matched component.
 * @property {Component | LazyComponent} [layout] - Optional parent layout component.
 * @property {Component } [placeholder] - Optional loading placeholder.
 */

export class Router {
  /** @type {Component | null} */
  static #activeComponent = null

  /** @type {Component | null} */
  static #activeLayoutComponent = null

  /** @type {Routes} */
  static #routes = []

  /** @type {Component} */
  static #notFoundComponent

  /** @type {HTMLElement} */
  static #rootElement

  /**
   * Initialize the router with the provided configuration.
   * @param {object} options - Router configuration options.
   * @param {Routes} options.routes - The complete routing configuration for the application.
   * @param {Component} options.notFoundComponent - Component to render for 404 routes.
   * @param {HTMLElement} options.rootElement - DOM element where components will be rendered.
   */
  static init({ routes, notFoundComponent, rootElement }) {
    Router.#routes = routes
    Router.#notFoundComponent = notFoundComponent
    Router.#rootElement = rootElement

    window.addEventListener('popstate', Router.#handleRouteChange)
    document.addEventListener('click', Router.#handleLinkClick)
    Router.#handleRouteChange()
  }

  /**
   * Handles click events on anchor elements to prevent default navigation
   * and use the router's navigation system instead.
   * @param {MouseEvent} e - The click event object.
   */
  static #handleLinkClick = (e) => {
    const link = /** @type {HTMLElement | null} */ (e.target)?.closest('a')
    if (!link) return

    const href = link.getAttribute('href')
    if (!href || href.charAt(0) !== '/' || link.getAttribute('target')) return

    e.preventDefault()
    Router.navigate(href)
  }

  /**
   * Navigate to a new route and update the browser history.
   * @param {string} path - The target path to navigate to.
   * @param {Object} [state={}] - Optional state data to be passed during navigation.
   */
  static navigate(path, state = {}) {
    Router.#unmountActiveComponents()
    window.history.pushState(state, '', path)
    Router.#handleRouteChange()
  }

  /**
   * Unmounts the currently active component and cleans up its resources.
   */
  static #unmountActiveComponents() {
    if (Router.#activeComponent) {
      Router.#activeComponent.unmount()
      Router.#activeComponent = null
    }

    if (Router.#activeLayoutComponent) {
      Router.#activeLayoutComponent.unmount()
      Router.#activeLayoutComponent = null
    }
  }

  /**
   * Handles route changes by finding and rendering the appropriate component.
   * Supports nested routes with layouts and loading placeholders.
   */
  static #handleRouteChange = async () => {
    Router.#unmountActiveComponents()

    const match = Router.#findRouteComponent(window.location.pathname)
    if (!match) {
      Router.#renderComponent(Router.#notFoundComponent)
      return
    }
    // Show placeholder if defined
    Router.#rootElement.innerHTML = match.placeholder
      ? match.placeholder.toHTML()
      : '<div>Loading...</div>'

    const layout = match.layout
      ? await Router.#resolveComponent(match.layout)
      : null
    const component = await Router.#resolveComponent(match.component)

    if (layout) {
      Router.#rootElement.innerHTML = layout.toHTML()

      layout.mount()

      const viewEl = document.getElementById(ROUTER_VIEW_ID)

      if (viewEl) {
        const content = component.toHTML()
        viewEl.innerHTML = content
        component.mount()
      }

      Router.#activeComponent = component
      Router.#activeLayoutComponent = layout
    } else {
      Router.#renderComponent(component)
    }
  }

  /**
   * Resolves a component, handling both synchronous and lazy-loaded components.
   * @param {Component | LazyComponent} component - The component to resolve.
   * @returns {Promise<Component>} The resolved component.
   */
  static async #resolveComponent(component) {
    if (typeof component === 'function') {
      return await component()
    }
    return component
  }

  /**
   * Finds the matching route component and its associated layout and placeholder
   * for a given path. Supports layout routes with a path and defaulting to first child.
   * @param {string} path - The path to match against routes.
   * @param {Routes} [routes=Router.#routes] - Optional routes to search through.
   * @param {Component | LazyComponent} [parentLayout]
   * @param {Component} [parentPlaceholder]
   * @returns {RouteMatch | null}
   */
  static #findRouteComponent(
    path,
    routes = Router.#routes,
    parentLayout,
    parentPlaceholder
  ) {
    for (const route of routes) {
      if (!route.path) continue

      if (route.path === path) {
        if (route.children && route.children.length > 0) {
          const firstChild = route.children[0]
          window.history.replaceState({}, '', firstChild.path)
          return {
            layout: route.component,
            component: firstChild.component,
            placeholder: firstChild.placeholder || route.placeholder,
          }
        }

        return {
          component: route.component,
          layout: parentLayout,
          placeholder: route.placeholder || parentPlaceholder,
        }
      }

      if (route.children) {
        const childMatch = Router.#findRouteComponent(
          path,
          route.children,
          route.component,
          route.placeholder
        )
        if (childMatch) return childMatch
      }
    }

    return null
  }

  /**
   * Renders a component directly into the root element without a layout.
   * @param {Component} component - The component to render.
   */
  static #renderComponent(component) {
    const content = component.toHTML()
    Router.#rootElement.innerHTML = content
    Router.#activeComponent = component
    Router.#activeComponent.mount()
  }

  /**
   * Creates the placeholder element for rendering child routes within a layout.
   * @param {string} className - The class name for the placeholder element.
   * @returns {string} - The HTML string for the placeholder element.
   */
  static createChildPlaceholder(className) {
    return `<div ${resolveString(className && `class="${className}"`)} id="${ROUTER_VIEW_ID}"></div>`
  }

  static renderActiveRoute = () => {
    if (Router.#activeComponent) {
      Router.#renderComponent(Router.#activeComponent)
    }
  }
}
