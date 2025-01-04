import dayjs from "dayjs";

/**
 *
 * @param {string} link
 * @returns {string}
 */
export function prettyURL(link) {
  return link.replace(/(https:\/\/|\/$)/gi, "");
}

export function getDate() {
  const _nowTs =  dayjs();
  return {
    date: _nowTs.toISOString(),
    year: _nowTs.year(),
  }
}