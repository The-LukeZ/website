import { json } from "@sveltejs/kit";
import dayjs from "dayjs";

/** @type {import('../$types').RequestHandler} */
export async function GET() {
  return json({
    date: dayjs().toISOString(),
    year: dayjs().year(),
  });
}
