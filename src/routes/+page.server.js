import demoConcerts from "$lib/demo_concerts.json";

export function load() {
  // Load data from internal API
  return {
    concerts: demoConcerts,
  };
}
