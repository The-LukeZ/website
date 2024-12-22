import dayjs from 'dayjs';

export const prerender = false;

/**
 * 1. Figure out which page we are on (default to 1 if not given or invalid)
 * 2. Load the concerts for that page
 * 3. add concerts to the state
 * 4. if an ID (#ID) is given, also add this concert to the state
 */

export async function load({ url }) {
  // TODO: load concerts from a real API

  /** @type {DBModels.Concert[]} */
  let concerts = (await import("$lib/demo_concerts.json")).default;
  const nowTs = dayjs();

  const pageNumber = parseInt(new URLSearchParams(url.search).get("page") ?? "1");

  return {
    concerts: concerts.filter((concert) => dayjs(concert.date).isAfter(nowTs)),
    pageNumber: pageNumber,
    highlightedConcert: null,
  };
}
