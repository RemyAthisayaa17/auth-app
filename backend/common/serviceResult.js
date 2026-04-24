/**
 * Standardized return shape for all service functions.
 * Controllers read .code and dispatch the correct HTTP response.
 *
 * @param {string} code    - Named constant from the relevant *Constants file
 * @param {*}      data    - Payload to forward to the client (optional)
 */
export function serviceResult(code, data = null) {
  return { code, data }
}