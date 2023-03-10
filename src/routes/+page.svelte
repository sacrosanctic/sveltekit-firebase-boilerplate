<script>
  import { request } from "$lib/fetch";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { collection, onSnapshot, addDoc } from "firebase/firestore";
  import { db, auth, app } from "$lib/firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import { onMount } from "svelte";
  export let data;

  let todos = [];

  let username, email, password;
  data = [];

  const signup = async () => {
    const userRecord = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userRecord.user, { displayName: username });
    const idToken = await getIdToken(userRecord.user, true);
    await request("/api/auth", "POST", { idToken });
    goto("/");
  };

  const signOutUser = async () => {
    await request("/api/auth", "DELETE");
    window.location.replace("/login");
  };

  if ($page.data.user) {
    onMount(() => {
      const query = collection(db, "Todos");
      const unsubscribe = onSnapshot(query, (snapshot) => {
        data = snapshot.docs.map((doc) => doc.data());
        todos = data;
      });

      return unsubscribe;
    });
  }

  const addTodo = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await addDoc(collection(db, "Todos"), {
      author: data.get("author"),
      completed: false,
      task: data.get("task"),
    });
  };
</script>

<div>
  {#if $page.data.user}
    {console.log(auth.currentUser)}
    <p>Username : {$page.data.user.displayName}</p>
    <p>Email : {$page.data.user.email}</p>
    <button on:click={signOutUser}>Logout</button>
    <form on:submit={(e) => addTodo(e)}>
      <input
        type="hidden"
        name="author"
        value={$page.data.user.email}
        placeholder=""
      />
      <input type="text" placeholder="Enter Task" name="task" />
      <button>Submit</button>
    </form>
    {#each todos as item}
      <li>Author: {item.author} ;Task:{item.task}</li>
    {/each}
  {:else}
    Dont have account dont worry create here
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}
</div>
