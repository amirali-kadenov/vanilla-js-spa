import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Component } from '@/shared/model/component.mjs'
import { Button } from '@/shared/ui/button/button.mjs'
import { Typography } from '@/shared/ui/typography/typography.mjs'
import { getTimeInMs } from './lib.mjs'
import { SandGlassIcon } from './ui/sand-glass-icon.mjs'
import { TimerInput } from './ui/timer-input.mjs'
import './timer.scss'

/**
 * @typedef {Object} TimerState
 * @property {number | null} hours
 * @property {number | null} minutes
 * @property {number | null} seconds
 * @property {boolean} isRunning
 * @property {boolean} isPaused
 * @property {number} intervalId
 * @property {number} setTime
 */

/** @type {TimerState} */
const initialValues = {
  hours: null,
  minutes: null,
  seconds: null,
  isRunning: false,
  isPaused: false,
  intervalId: 0,
  setTime: 0,
}

const Timer = new Component({
  initialState: initialValues,
  className: 'timer',
  render: function () {
    const currentTime = getTimeInMs(
      this.state.hours,
      this.state.minutes,
      this.state.seconds
    )

    const percentage = ((currentTime / this.state.setTime) * 100).toFixed(2)

    return /* html */ `
        ${Typography({
        variant: Typography.Variants.TITLE_1,
        children: 'Countdown timer',
        weight: Typography.Weights.EMPHASIZED,
        tag: 'h1',
        className: 'timer__title',
      })}

      <div class="timer__content">
        <div class="timer__sandglass-wrapper">
          <div class="timer__sandglass-container">
            <div class="timer__sandglass">
              ${SandGlassIcon()}
              ${resolveString(
                this.state.isRunning &&
                  /*html */ `<div class="timer__sandglass-drip"></div>`
              )}
              <div
                style="--percentage: ${percentage || 0}%"
                class="timer__sandglass-sand timer__sandglass-sand--top"
              >
                <div class="timer__sandglass-sand-inner"></div>
              </div>
              <div
                style="--percentage: ${this.state.setTime ? percentage : 100}%"
                class="timer__sandglass-sand timer__sandglass-sand--bottom"
              >
                <div class="timer__sandglass-sand-inner"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="timer__controls">
          <div class="timer__inputs">
            ${Component.child(
              this,
              new TimerInput({
                name: 'hours',
                timer: this,
                className: 'timer__input--hours',
                label: 'Hours',
                inputMaxValue: 23,
              })
            )}
            ${Component.child(
              this,
              new TimerInput({
                name: 'minutes',
                timer: this,
                className: 'timer__input--minutes',
                label: 'Minutes',
                inputMaxValue: 59,
              })
            )}
            ${Component.child(
              this,
              new TimerInput({
                name: 'seconds',
                timer: this,
                className: 'timer__input--seconds',
                label: 'Seconds',
                inputMaxValue: 59,
              })
            )}
          </div>

          <div class="timer__buttons">
            ${Button({
              children: 'Reset',
              className: 'timer__button',
              id: 'reset',
              variant: Button.Variants.RED,
            })}
            ${Button({
              children: this.state.isRunning ? 'Pause' : 'Start',
              className: 'timer__button',
              id: 'action',
              disabled:
                this.state.hours === null &&
                this.state.minutes === null &&
                this.state.seconds === null,
            })}
          </div>
        </div>
      </div>
        `
  },
  onMount: function (element) {
    const actionButton = element.querySelector('#action')
    const resetButton = element.querySelector('#reset')
    if (!actionButton || !resetButton) return

    const handleReset = () => {
      clearInterval(this.state.intervalId)
      this.setState(initialValues)
    }

    const handleAction = () => {
      if (this.state.isRunning) {
        this.setState({
          ...this.state,
          isRunning: false,
          isPaused: true,
        })
        clearInterval(this.state.intervalId)

        return
      }

      const newSetTime = this.state.isPaused
        ? this.state.setTime
        : getTimeInMs(
            Number(this.state.hours),
            Number(this.state.minutes),
            Number(this.state.seconds)
          )

      this.setState({
        ...this.state,
        isPaused: false,
        isRunning: true,
        setTime: newSetTime,
      })

      this.state.intervalId = setInterval(() => {
        const seconds = Number(this.state.seconds)
        const minutes = Number(this.state.minutes)
        const hours = Number(this.state.hours)

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(this.state.intervalId)
          this.setState({
            ...this.state,
            isRunning: false,
            isPaused: false,
          })
          return
        }

        if (seconds === 0) {
          this.setState({
            ...this.state,
            seconds: 59,
            minutes: minutes === 0 && hours > 0 ? 59 : minutes - 1,
            hours: minutes === 0 && hours > 0 ? hours - 1 : hours,
          })
        } else {
          this.setState({
            ...this.state,
            seconds: seconds - 1,
          })
        }
      }, 1000)
    }

    resetButton.addEventListener('click', handleReset)
    actionButton.addEventListener('click', handleAction)
    return () => {
      actionButton.removeEventListener('click', handleAction)
      resetButton.removeEventListener('click', handleReset)
    }
  },
})

export default Timer
