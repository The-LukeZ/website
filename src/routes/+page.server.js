import dayjs from "dayjs";

export async function load() {
  // TODO: Load data from internal API

  /** @type {DBModels.Concert[]} */
  let concerts = (await import("$lib/demo_concerts.json")).default;

  const nowTs = dayjs();

  return {
    concerts: concerts.filter((concert) => dayjs(concert.date).isAfter(nowTs)),
  };
}
