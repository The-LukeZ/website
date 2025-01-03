import ky from "ky";
import { PUBLIC_BASE_URL } from "$env/static/public";

export async function load() {
  const _res = await ky.get(PUBLIC_BASE_URL + "/api/date").json();
  return {
    date: _res.date,
    year: _res.year,
  };
}
