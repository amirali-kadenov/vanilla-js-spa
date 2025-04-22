/**
 * @typedef {import('./component.mjs').Component} Component
 */

const cacheMap = new Map()

/**
 * @param {string}componentPath
 * @returns {Promise<Component>} The resolved component, with caching.
 */
export async function lazyLoad(componentPath) {
  // Check if the component is already cached
  if (cacheMap.has(componentPath)) {
    return cacheMap.get(componentPath)
  }

  await new Promise((res) => setTimeout(res, 1000))
  // @vite-ignore
  // Resolve the component and store it in the cache
  const imported = await import(componentPath)
  const component = imported.default
  cacheMap.set(componentPath, component)

  return component
}
