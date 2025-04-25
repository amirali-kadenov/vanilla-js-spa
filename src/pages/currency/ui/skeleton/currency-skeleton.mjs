import { Component } from '@/shared/model/component.mjs'
import './currency-skeleton.scss'

/**
 * @param {number} count
 * @param {string} skeleton
 * @returns {string} HTML for currency skeleton
 */
const createPlaceholders = (count, skeleton) => {
  return Array(count)
    .fill(null)
    .map(() => skeleton)
    .join('')
}

/**
 * @returns {string} HTML for currency skeleton
 */
export const CurrencySkeleton = new Component({
  className: 'skeleton',
  render: function () {
    return /* html */ `
        <div class="skeleton__rates">
        <div class="skeleton__rates-header">
          <div class="skeleton__rates-title"></div>
          <div class="skeleton__rates-date"></div>
        </div>
        <div class="skeleton__rates-data">
          <div class="skeleton__rates-column">
            <div class="skeleton__rates-column-title"></div>
            <div class="skeleton__rates-list">
              ${createPlaceholders(14, RATES_ITEM_WITH_ICON)}
            </div>
          </div>
          <div class="skeleton__rates-column">
            <div class="skeleton__rates-column-title"></div>
            <div class="skeleton__rates-list">
              ${createPlaceholders(14, RATES_ITEM)}
            </div>
          </div>
          <div class="skeleton__rates-column">
            <div class="skeleton__rates-column-title"></div>
            <div class="skeleton__rates-list">
              ${createPlaceholders(14, RATES_ITEM)}
            </div>
          </div>
        </div>
      </div>
      <div class="skeleton__converter">
        <div class="skeleton__converter-title"></div>
        <div class="skeleton__converter-inputs">
          ${createPlaceholders(5, CONVERTER_INPUT)}
        </div>
        <div class="skeleton__converter-add"></div>
      </div>
  `
  },
})

const RATES_ITEM_WITH_ICON = /* html */ `
  <div class="skeleton__rates-item">
    <div class="skeleton__rates-item-icon"></div>
    <div class="skeleton__rates-item-text"></div>
  </div>
`

const RATES_ITEM = /* html */ `
  <div class="skeleton__rates-item">
    <div class="skeleton__rates-item-text"></div>
  </div>
`

const CONVERTER_INPUT = /* html */ `
  <div class="skeleton__converter-input">
    <div class="skeleton__converter-input-icon"></div>
    <div class="skeleton__converter-input-currency"></div>
    <div class="skeleton__converter-input-field"></div>
  </div>
`
