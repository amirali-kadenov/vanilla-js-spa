/**
 * Hook for saving and restoring element scroll position in sessionStorage
 * @param {HTMLElement} element - Parent element
 * @param {string} selector - Selector for finding element
 * @returns {(() => void) | undefined} - Function to save scroll position
 */
export const useSessionScroll = (element, selector) => {
  const target = element.querySelector(selector)

  if (!target) return undefined

  const id = getScrollSessionId(selector)

  const scrollTop = sessionStorage.getItem(id)
  console.log({ target, id, scrollTop })
  target.scrollTop = Number(scrollTop) || 0

  return () => {
    sessionStorage.setItem(id, target.scrollTop.toString())
  }
}

/**
 * Generates unique identifier for saving scroll position
 * @param {string} selector - Element selector
 * @returns {string} - Unique identifier
 */
export const getScrollSessionId = (selector) => selector + '-scrollTop'
