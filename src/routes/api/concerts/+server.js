import { json } from "@sveltejs/kit";
import dayjs from "dayjs";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

let ratelimter = new RateLimiterMemory({ duration: 5, points: 5, blockDuration: 60 });

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, getClientAddress }) {
  try {
    await ratelimter.consume(getClientAddress(), 1);
  } catch (rej) {
    if (rej instanceof RateLimiterRes)
      return json(
        {
          error: `You are being ratelimited. Try again in ${rej.msBeforeNext / 1000} seconds`,
          wait_seconds: rej.msBeforeNext / 1000,
        },
        { status: 429 },
      );
  }

  let concerts = (await import("$lib/demo_concerts.json")).default;

  /**
   * @type {any}
   */
  const body = request.body;
  const nowTs = dayjs();

  if (body?.search) {
    concerts = concerts.filter((c) => c.name.toLowerCase().includes(body.search.toLowerCase()));
  }
  if (body?.before) {
    concerts = concerts.filter((c) => dayjs(c.date).isBefore(nowTs));
  } else if (body?.after) {
    concerts = concerts.filter((c) => dayjs(c.date).isAfter(nowTs));
  }
  if (body?.skip) {
    concerts = concerts.slice(body.skip);
  }
  if (body?.limit) {
    concerts = concerts.slice(0, body.limit);
  }

  return json(concerts);
}
