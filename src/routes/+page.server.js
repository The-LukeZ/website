export async function load() {
  // TODO: Load data from internal API

  /** @type {DBModels.Concert[]} */
  let concerts = (await import("$lib/demo_concerts.json")).default;

  return {
    concerts: concerts,
  };
}
