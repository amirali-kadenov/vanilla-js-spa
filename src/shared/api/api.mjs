/**
 * HTTP client for API requests
 * @class
 */

/**
 * @typedef {(config: RequestInit) => Promise<RequestInit>} RequestInterceptor
 */

/**
 * @typedef {(response: Response) => Promise<Response>} ResponseInterceptor
 */

export class Api {
  /**
   * @param {string} baseURL - Base URL for all API requests
   */
  constructor(baseURL) {
    this.baseURL = baseURL
    /** @type {{ request: RequestInterceptor[], response: ResponseInterceptor[] }} */
    this.interceptors = {
      request: [],
      response: [],
    }
  }

  /**
   * Adds a request interceptor
   * @param {RequestInterceptor} interceptor - Request interceptor function
   */
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor)
  }

  /**
   * Adds a response interceptor
   * @param {ResponseInterceptor} interceptor - Response interceptor function
   */
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor)
  }

  /**
   * Makes an HTTP request
   * @param {string} url - Request URL
   * @param {RequestInit} [options={}] - Request options
   */
  async request(url, options = {}) {
    const fullURL = this.baseURL + url
    let config = { ...options }

    // Apply request interceptors
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config)
    }

    try {
      const response = await fetch(fullURL, config)
      let result = response

      // Apply response interceptors
      for (const interceptor of this.interceptors.response) {
        result = await interceptor(result)
      }

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }

      return result
    } catch (error) {
      console.error('HTTP request failed:', error)
      throw error
    }
  }

  /**
   * Makes a GET request
   * @param {string} url - Request URL
   * @param {RequestInit} [options={}] - Request options
   */
  get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' })
  }
}
