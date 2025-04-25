import { resolveString } from '@/shared/lib/resolve-string.mjs'
import { Component } from '@/shared/model/component.mjs'
import './select.scss'

/**
 * @typedef {Object} Option
 * @property {string} value - The option value
 * @property {string} label - The display text for the option
 */

/**
 * @typedef {(value: string) => void} OnChange
 */

/**
 * @typedef {Object} SelectProps
 * @property {Option[]} options - Available options for the select
 * @property {OnChange} onChange - Callback when selection changes
 * @property {string} controlText
 * @property {string} controlClassName
 */

/**
 * @typedef {Object} SelectState
 * @property {Option|null} selectedOption - Currently selected option
 */

const DATA_OPEN = 'data-open'

/**
 * @typedef {Object} ToggleMenuParams
 * @property {HTMLElement} menu
 * @property {HTMLElement} control
 * @property {boolean} isOpen
 */

/**
 * Select Component
 * @extends {Component<SelectState, SelectProps>}
 */
export class Select extends Component {
  /**
   * Create a new Select component
   * @param {SelectProps} props - Component properties
   */
  constructor(props) {
    super({
      props,
      initialState: {
        selectedOption: null,
      },
      render: function ({ options, controlText, controlClassName }) {
        return /* html */ `
          <div class="select">
            <button
              class="${resolveString('select__control', controlClassName)}"
              tabindex="0"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-controls="select-menu"
            >
              ${controlText}
            </button>

            <div
              class="select__menu"
              role="listbox"
              id="select-menu"
            >
              ${options
                .map((option) => {
                  const isSelected =
                    this.state.selectedOption?.value === option.value

                  return /* html */ `
                    <div
                      class="${resolveString(
                        'select__option',
                        isSelected && 'select__option--selected'
                      )}"
                      data-value="${option.value}"
                      aria-selected="${isSelected}"
                      role="option"
                    >
                      ${option.label}
                    </div>
                  `
                })
                .join('')}
            </div>
          </div>
        `
      },
      onMount: function (element) {
        const selectControl = /** @type {HTMLElement} */ (
          element.querySelector('.select__control')
        )
        const selectMenu = /** @type {HTMLElement} */ (
          element.querySelector('.select__menu')
        )

        if (!selectControl || !selectMenu) {
          return
        }

        /**
         * @param {ToggleMenuParams} params
         */
        const toggleMenu = ({ menu, control, isOpen }) => {
          menu.setAttribute(DATA_OPEN, String(isOpen))
          control.setAttribute('aria-expanded', String(isOpen))
          menu.classList.toggle('select__menu--open', isOpen)

          if (isOpen) {
            requestAnimationFrame(() => {
              const controlRect = control.getBoundingClientRect()
              const menuRect = menu.getBoundingClientRect()
              const viewportHeight = window.innerHeight
              const spaceBelow = viewportHeight - controlRect.bottom
              const spaceAbove = controlRect.top

              if (spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
                menu.classList.add('select__menu--top')
              } else {
                menu.classList.remove('select__menu--top')
              }
            })

            document.addEventListener('click', handleDocumentClick)
          } else {
            document.removeEventListener('click', handleDocumentClick)
          }
        }

        /**
         * @param {string} value
         * @param {HTMLElement} menu
         * @param {HTMLElement} control
         */
        const selectOption = (value, menu, control) => {
          this.setState({
            selectedOption: this.props.options.find(
              (option) => option.value === value
            ),
          })

          toggleMenu({ menu, control, isOpen: false })
          this.props.onChange?.(value)
        }

        /** @param {MouseEvent} e */
        const handleDocumentClick = (e) => {
          if (!element.contains(/** @type {Node} */ (e.target))) {
            toggleMenu({
              menu: selectMenu,
              control: selectControl,
              isOpen: false,
            })
          }
        }

        /** @param {MouseEvent} e */
        const handleClick = (e) => {
          e.stopPropagation()

          const target = /** @type {HTMLElement | null} */ (e.target)

          if (!target) return

          // handle control click
          if (target.closest('.select__control')) {
            const isOpen = selectMenu.getAttribute(DATA_OPEN) === 'true'
            toggleMenu({
              menu: selectMenu,
              control: selectControl,
              isOpen: !isOpen,
            })
            return
          }

          // handle option click
          if (target.closest('.select__option')) {
            const value = target.getAttribute('data-value')

            if (!value) return

            selectOption(value, selectMenu, selectControl)
          }
        }

        /** @param {Event} e */
        const handleKeyDown = (e) => {
          const key = /** @type {KeyboardEvent} */ (e).key
          const isEscape = key === 'Escape'
          const isOpen = selectMenu.getAttribute(DATA_OPEN) === 'true'

          if (isEscape && isOpen) {
            e.preventDefault()
            toggleMenu({
              menu: selectMenu,
              control: selectControl,
              isOpen: false,
            })
            return
          }

          const isEnterOrSpace = key === 'Enter' || key === ' '

          if (isEnterOrSpace && !isOpen) {
            e.preventDefault()
            toggleMenu({
              menu: selectMenu,
              control: selectControl,
              isOpen: true,
            })
          }
        }

        element.addEventListener('click', handleClick)
        selectControl.addEventListener('keydown', handleKeyDown)

        return () => {
          element.removeEventListener('click', handleClick)
          selectControl.removeEventListener('keydown', handleKeyDown)
          document.removeEventListener('click', handleDocumentClick)
        }
      },
    })
  }
}
