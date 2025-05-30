import { Component } from '@/shared/model/component.mjs'
import { Auth } from '../auth.mjs'

/**
 * @template {Object} State
 * @template {Object} Props
 * @extends {Component<State, Props>}
 */
export class ProtectedRoute extends Component {
  /** @typedef {import('@/shared/model/component.mjs').Options<State, Props>} Options */

  /** @param {Options} options */
  constructor(options) {
    super({
      initialState: options.initialState,
      render: options.render,
      onMount: (element) => {
        if (!Auth.checkAuth()) {
          return
        }

        const cleanup = options.onMount?.call(this, element)
        return cleanup
      },
    })
  }
}
