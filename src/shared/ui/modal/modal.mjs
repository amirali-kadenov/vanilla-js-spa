import { resolveString } from '@/shared/lib/resolve-string.mjs'
import './modal.scss'

/**
 * @typedef {() => void} Cleanup
 */

/**
 * @typedef {(this: Modal) => void | Cleanup} OnMount
 */

/**
 * @typedef {Object} ModalProps
 * @property {() =>string} render - HTML string to be injected inside the modal
 * @property {boolean} [closeOnBackdrop=true] - Whether to close modal on backdrop click
 * @property {OnMount} [onMount] - Callback fired after modal mount. Can return cleanup function
 * @property {boolean} [withCloseButton=true] - Whether to show close button
 */

/** Modal class constants */
const MODAL_VISIBLE = 'modal--visible'
const MODAL_CLOSE = 'modal__close'
const MODAL_BACKDROP = 'modal-backdrop'

/**
 * Modal window management class
 */
export class Modal {
  /** @type {number} Count of opened modals */
  static openCount = 0

  /**
   * @param {ModalProps} props - Modal props
   */
  constructor({
    render,
    onMount,
    closeOnBackdrop = true,
    withCloseButton = true,
  }) {
    /** @type {() => string} function to render Modal HTML content */
    this.render = render

    /** @type {boolean} Close on backdrop click flag */
    this.closeOnBackdrop = closeOnBackdrop

    /** @type {OnMount | undefined} Mount callback */
    this.onMount = onMount

    /** @type {Cleanup | null} Cleanup function */
    this.cleanup = null

    /** @type {HTMLDivElement | null} Modal DOM element */
    this.modal = null

    this.isClosed = false

    this.withCloseButton = withCloseButton

    this.init()
  }

  /**
   * Initialize modal window
   * @private
   */
  init() {
    const modal = document.createElement('div')
    modal.className = 'modal'

    modal.innerHTML = /* html */ `
      <div class="modal__backdrop"></div>
      <div class="modal__content">
        ${resolveString(
          this.withCloseButton &&
            /* html */ `
              <button
                class="${MODAL_CLOSE}"
                aria-label="Close"
              >
                &times;
              </button>
        `
        )}
        ${this.render()}
      </div>
    `

    this.modal = modal

    const modalClose = modal.querySelector(`.${MODAL_CLOSE}`)

    if (modalClose) {
      modalClose.addEventListener('click', () => this.close())
    }

    if (!this.closeOnBackdrop) return

    const backdrop = modal.querySelector(`.${MODAL_BACKDROP}`)

    if (!backdrop) return

    backdrop.addEventListener('click', () => this.close())
  }

  /**
   * Open modal window and show backdrop
   */
  open() {
    const root = document.getElementById('modal-root')
    const modal = this.modal

    if (!root || !modal) {
      console.warn('Modal root or backdrop not found in DOM.')
      return
    }

    this.isClosed = false

    root.appendChild(modal)

    requestAnimationFrame(() => {
      modal.classList.add(MODAL_VISIBLE)
    })

    if (!this.onMount) return

    const cleanup = this.onMount()

    if (typeof cleanup === 'function') {
      this.cleanup = cleanup
    }
  }

  /**
   * Close modal window and manage backdrop visibility
   */
  close() {
    const modal = this.modal

    if (this.isClosed) return

    this.isClosed = true

    if (!modal) return

    modal.classList.remove(MODAL_VISIBLE)

    modal.addEventListener(
      'transitionend',
      () => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal)
        }

        if (this.cleanup) {
          this.cleanup()
        }
      },
      { once: true }
    )
  }
}
