import admin from 'firebase-admin';
import { dev } from "$app/environment";
import { json } from "@sveltejs/kit";

//7 days to expire
const expiresIn = 1000*60*60*24*7;
const secure = dev ? "":"secret";
export const POST = async({cookies,request}) => {
  const { idToken } = await request.json()
console.log("working...")
  try{
    const sessionCookie = await admin.auth().createSessionCookie(idToken,{expiresIn});
    cookies.set('session',sessionCookie, {
      // send cookie for every page
      path: '/',
      // server side only cookie so you can't use `document.cookie`
      httpOnly: true,
      // only requests from same site can send cookies
      // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
      sameSite: 'strict',
      // only sent over HTTPS in production
      secure: process.env.NODE_ENV === 'production',
      // set cookie to expire after a week
      maxAge: expiresIn,
    })

    console.log("created token sucesfully...")

    return json({
      status:200
    })
  }catch(e){
    console.error(e)
    return json({
      status:500
    })
  }
}

export const DELETE = async ({cookies}) => {
  cookies.set('session', '', {
    path: '/',
    expires: new Date(0),
  })

  return json({
    status:200
  })
}