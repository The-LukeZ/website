import dayjs from "dayjs";

export const prerender = false;

/**
 * 1. load concerts from a real API
 * 2. add concerts to the state
 * 3. if an ID (#ID) is given, also add this concert to the state
 */

export async function load() {
  // TODO: load concerts from a real API

  /** @type {DBModels.Concert[]} */
  let concerts = (await import("$lib/demo_concerts.json")).default;
  const nowTs = dayjs();

  return {
    concerts: concerts.filter((concert) => dayjs(concert.date).isAfter(nowTs)),
  };
}
