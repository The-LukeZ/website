import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  if (!params.slug) {
    return json({ error: "slug is required" }, { status: 400 });
  }

  const conerts = (await import("$lib/demo_concerts.json")).default;
  const concert = conerts.find((c) => c._id === params.slug);

  if (!concert) {
    return json({ error: "concert not found" }, { status: 404 });
  }

  return json(concert);
}
