import { Component } from '@/shared/model/component.mjs'
import './modal.scss'

/**
 * @typedef {Object} ModalOptions
 * @property {string} content - The HTML content to display in the modal
 */

const MODAL_CLASS = 'modal'
const MODAL_VISIBLE_CLASS = 'modal--visible'
export const MODAL_CLOSE_ATTRIBUTE = 'data-close-modal'

export class Modal extends Component {
  modalRoot = document.getElementById('modal-root')

  /**
   * @param {ModalOptions} props
   */
  constructor(props) {
    super({
      props,
      render: () => {
        this.renderInModalRoot()
        return ''
      },
      onMount: () => {
        if (!this.container) {
          return
        }

        const modal = this.container.querySelector(`.${MODAL_CLASS}`)

        if (!modal) {
          return
        }

        this.modal = modal

        const handleClose = this.close.bind(this)
        modal.addEventListener('click', handleClose)

        return () => {
          modal.removeEventListener('click', handleClose)
          this.removeFromModalRoot()
        }
      },
    })
  }

  getModalHtml() {
    return /* html */ `
      <div class="modal">
        <div class="modal__overlay" ${MODAL_CLOSE_ATTRIBUTE}></div>
        <div class="modal__container">
          <button class="modal__close-button" aria-label="Close modal" ${MODAL_CLOSE_ATTRIBUTE}>
            &times;
          </button>
          <div class="modal__content">${this.props.content}</div>
        </div>
      </div>
    `
  }

  renderInModalRoot() {
    if (!this.modalRoot) {
      return
    }

    const container = document.createElement('div')
    container.id = this.id
    container.innerHTML = this.getModalHtml()

    this.container = container
    this.modalRoot.appendChild(container)
  }

  removeFromModalRoot() {
    if (!this.modalRoot || !this.container) {
      return
    }

    this.modalRoot.removeChild(this.container)
    this.container = null
  }

  /** @this {Modal} */
  open() {
    requestAnimationFrame(() => {
      document.body.style.setProperty('overflow', 'hidden')
      this.modal.classList.add(MODAL_VISIBLE_CLASS)
    })
  }

  /**
   * @this {Modal}
   * @param {Event} e
   */
  close(e) {
    const target = /** @type {HTMLElement | null} */ (e.target)

    if (!target?.hasAttribute(MODAL_CLOSE_ATTRIBUTE)) {
      return
    }

    requestAnimationFrame(() => {
      document.body.style.removeProperty('overflow')
      this.modal.classList.remove(MODAL_VISIBLE_CLASS)
    })
  }
}
