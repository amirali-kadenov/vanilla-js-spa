import { CURRENCY_CODE_TO_ICON_NAME_MAP } from '../../lib/constants.mjs'
import { getIconUrl } from '../../lib/utils.mjs'
import './currency-icon.scss'

const UNKNOWN_ICON_NAME = 'unknown'

/**
 * @param {Object} props
 * @param {string} props.leftIconCode
 * @param {string} [props.rightIconCode]
 * */
export const CurrencyIcon = ({ leftIconCode, rightIconCode }) => {
  const leftIconName =
    CURRENCY_CODE_TO_ICON_NAME_MAP[leftIconCode] ?? UNKNOWN_ICON_NAME

  if (!rightIconCode) {
    return /* html */ `
      <img
        src="${getIconUrl(leftIconName)}"
        alt="${leftIconName}"
        class="currency-icon"
        width="32"
        height="32"
      />
  `
  }

  const rightIconName =
    CURRENCY_CODE_TO_ICON_NAME_MAP[rightIconCode] ?? UNKNOWN_ICON_NAME

  return /* html */ `
    <div class="currency-icon-container">
      <div class="currency-icon-wrapper">
        <img
          src="${getIconUrl(leftIconName)}"
          alt="${leftIconName}"
          class="currency-icon"
          width="32"
          height="32"
        />
      </div>
      <div class="currency-icon-wrapper">
        <img
          src="${getIconUrl(rightIconName)}"
          alt="${rightIconName}"
          class="currency-icon"
          width="32"
          height="32"
        />
      </div>
    </div>
    `
}
