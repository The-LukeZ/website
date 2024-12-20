import { Concert, concertSchema } from "../models/concert";
import demoConcerts from "$lib/demo_concerts.json";

export async function fetchConcerts() {
  // return Concert.find({}, null, { sort: { date: 1 } });
  return demoConcerts;
}

export function fetchConcertById(id) {
  return Concert.findById(id);
}

/**
 *
 * @param {concertSchema} data
 */
export function createConcert(data) {
  return Concert.create(data);
}
