import { getDate } from "$lib/utils/utilityFuncs";
import { json } from "@sveltejs/kit";

/** @type {import('../$types').RequestHandler} */
export async function GET() {
  return json(getDate());
}
