import { Component } from '@/shared/model/component.mjs'
import { onInputMount } from './lib.mjs'
import { renderInput } from './ui.mjs'
import './input.scss'

/**
 * @typedef {Object} InputProps
 * @property {string} [type='text']
 * @property {string} placeholder
 * @property {string} name
 * @property {string} id
 * @property {string} [value]
 * @property {string | null} [error]
 * @property {string} [leftIcon]
 * @property {string} [rightIcon]
 * @property {(e: Event) => void} [onInput]
 * @property {string} [className]
 * @property {string} [autocomplete='off']
 */

/**
 * @template [State=Object]
 * @extends {Component<State, InputProps>}
 */
export class Input extends Component {
  /**
   * @param {InputProps} props
   */
  constructor(props) {
    super({
      props,
      render: renderInput,
      onMount: onInputMount,
    })
  }
}
