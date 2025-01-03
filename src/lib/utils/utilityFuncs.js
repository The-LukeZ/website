/**
 *
 * @param {string} link
 * @returns {string}
 */
export function prettyURL(link) {
  return link.replace(/(https:\/\/|\/$)/gi, "");
}
