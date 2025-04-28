import { Component } from '@/shared/model/component.mjs'
import { onInputMount } from './lib.mjs'
import { renderInput } from './ui.mjs'
import './input.scss'

/**
 * @typedef {(value: string | undefined) => void} OnInput
 * @typedef {(value: string | undefined) => void} OnChange
 */

/**
 * @typedef {Object} InputProps
 * @property {string} [type='text']
 * @property {string} [placeholder]
 * @property {string} name
 * @property {string} id
 * @property {string | number} [value]
 * @property {string | null} [error]
 * @property {string} [leftIcon]
 * @property {string} [rightIcon]
 * @property {OnInput} [onInput]
 * @property {OnChange} [onChange]
 * @property {string} [className]
 * @property {string} [elementClassName]
 * @property {string} [autocomplete='off']
 * @property {number} [maxLength]
 * @property {boolean} [disabled]
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
      className: props.elementClassName,
      render: renderInput,
      onMount: onInputMount,
    })
  }
}
