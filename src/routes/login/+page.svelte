<script context="module">
  export const load = async ({ session }) => {
    if (!session.user.exists) return {};
    return {
      status: 301,
      redirect: "/",
    };
  };
</script>

<script>
  import { auth } from "$lib/firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { request } from "$lib/fetch.js";
  import { goto, invalidateAll } from "$app/navigation";

  let email = "demo@gmail.com";
  let password = "12345678";

  const login = async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = userCredential._tokenResponse.idToken;
    await request("/api/auth", "POST", { idToken });
    invalidateAll();
    goto("/");
  };
</script>

<div>
  <h1>Login</h1>
  <p>Email</p>
  <input type="text" bind:value={email} />
  <p>Password</p>
  <input type="password" bind:value={password} />
  <button on:click={login}>Continue</button>
</div>
