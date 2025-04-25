import { Component } from '@/shared/model/component.mjs'
import './loader.scss'

/**
 * Loader Component
 * @extends {Component}
 */
export class Loader extends Component {
  /**
   * Create a new Loader component
   */
  constructor() {
    super({
      render: function () {
        return /* html */ `
          <div class="loader">
            <div class="loader__spinner"></div>
          </div>
        `
      },
    })
  }
}
