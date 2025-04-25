import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Component } from '@/shared/model/component.mjs'
import { Input } from '@/shared/ui/input/input.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { applyInputMask } from '../lib.mjs'

/**
 * @typedef {Object} TimerInputProps
 * @property {'hours' | 'minutes' | 'seconds'} name
 * @property {Component} timer
 * @property {string} className
 * @property {string} label
 * @property {number} inputMaxValue
 */

export class TimerInput extends Component {
  /**
   * @param {TimerInputProps} props
   */
  constructor({ name, timer, className, label, inputMaxValue }) {
    super({
      render: () => {
        return /* html */ `
           <div
            class="${resolveString('timer__input', className)}"
          >
            ${Component.child(
              this,
              new Input({
                name,
                id: name,
                value:
                  timer.state[name] === null ? '' : String(timer.state[name]),
                maxLength: 2,
                placeholder: '00',
                onChange: (value) => {
                  timer.setState({
                    ...timer.state,
                    [name]: applyInputMask(value, inputMaxValue),
                  })
                },
              })
            )}
            ${Typography({
              variant: Typography.Variants.TITLE_3,
              children: label,
              tag: 'label',
              className: 'timer__input-label',
            })}
          </div>
            `
      },
    })
  }
}
