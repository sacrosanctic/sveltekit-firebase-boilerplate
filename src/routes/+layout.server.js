export async function load({locals}){
  let user;
  if(locals.user){
    user = JSON.parse(JSON.stringify(locals.user));
  }
  return {
    user:user,
  }
}