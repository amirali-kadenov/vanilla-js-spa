import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Component } from '@/shared/model/component.mjs'
import { Input } from '@/shared/ui/input/input.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { simplifyFraction } from '../../lib/utils.mjs'
import { CurrencyIcon } from '../currency-icon/currency-icon.mjs'
import { CrossIcon } from './icons/cross.mjs'
import { deleteRate } from './model.mjs'

/**
 * @typedef {Object} Props
 * @property {import("./converter.mjs").Converter} converter
 * @property {import("./converter.mjs").ExchangeRate} rate
 * @property {import("./converter.mjs").CurrencyPage} currencyPage
 * @property {boolean} [isDeletable]
 */

const DELETE_ICON_CLASS = 'converter__input-delete-button'

/**
 * @extends {Component<unknown, Props>}
 */
export class ConverterInput extends Component {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super({
      props,
      onMount: (element) => {
        const deleteButton = element.querySelector(`.${DELETE_ICON_CLASS}`)

        if (!props.isDeletable || !deleteButton) {
          return
        }

        const handleDelete = () =>
          deleteRate(props.currencyPage, props.converter, props.rate)

        deleteButton.addEventListener('click', handleDelete)

        return () => {
          deleteButton.removeEventListener('click', handleDelete)
        }
      },
      render: ({ converter, rate, isDeletable }) => {
        const convertedValue = Number(converter.state.value) * Number(rate.rate)

        return /* html */ `
          <div class="converter__input">
            <div class="converter__input-section">
              ${CurrencyIcon({
                leftIconCode: rate.to,
              })}
              ${Typography({
                variant: Typography.Variants.TITLE_2,
                children: rate.to,
                tag: 'span',
                weight: Typography.Weights.EMPHASIZED,
                className: 'converter__input-currency',
              })}
            </div>

            <div
              class="converter__input-section converter__input-section--right"
            >
              ${Component.child(
                this,
                new Input({
                  value: simplifyFraction(convertedValue),
                  name: rate.to,
                  id: rate.to,
                  elementClassName: 'converter__input-element',
                  onChange: (value) => {
                    const convertedValue = Number(value) / Number(rate.rate)

                    converter.setState({
                      value: simplifyFraction(convertedValue),
                    })
                  },
                })
              )}
              ${resolveString(
                isDeletable &&
                  /* html */ `
                    <button
                      class="${DELETE_ICON_CLASS}"
                    >
                      ${CrossIcon()}
                    </button>
              `
              )}
            </div>
          </div>
    `
      },
    })
  }
}
