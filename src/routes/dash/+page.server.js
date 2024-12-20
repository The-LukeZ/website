import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (!locals.loggedIn) {
    return redirect(302, "/dash/login");
  } else {
    return {
      loggedIn: false,
    };
  }
}
