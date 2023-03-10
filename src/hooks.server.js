import admin from "firebase-admin";
import { init } from "$lib/firebase-admin";

export const handle = async ({ event, resolve }) => {
  // get cookies from browser

  const session = event.cookies.get("session");
  let user;

  init();

  if (!session) {
    console.log("No session!");
    return await resolve(event);
  }

  // find the user based on the session
  // if `user` exists set `events.local`

  try {
    const data = await admin.auth().verifySessionCookie(session);
    const uid = data.uid;

    // Get user data
    user = await admin.auth().getUser(uid);
    if (user) {
      event.locals.user = user.providerData[0];
    }
  } catch (error) {
    console.log(error);
  }
  // load page as normal
  return await resolve(event);
};
