<script lang="ts">
	import { goto } from '$app/navigation';
  import {authClient} from '$lib/auth-client';


  let error  = $state('');
  let errorMessage = $state('');

   async function  signup(e:Event){
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const password_confirm = form.password_confirm.value;

    if (password !== password_confirm){
        error = "Password dont match"
        return;
    }

    if (!username || !email || !password || !password_confirm){
        error = 'All fields are required';
        return;
    }

    console.log("Signup button pressed- all valid")

    await authClient.signUp.email({
        email,password, name:username,
    }, {
        onSuccess: async () =>{
            goto('/');
        },
        onError: (ctx) =>{
            errorMessage  = ctx.error.message;
            console.error(errorMessage);
        }
    });
  }

</script>

<div class="box-1">
<h1>Signup</h1>

<form onsubmit={signup}>
    <div class="row">
        <label>
        Username:
            <input class="text-black" required type="text" id="username" />
        </label>
    </div>
        <div class="row">
        <label>
        Email:
            <input class="text-black"  required type="email" id="email" />
        </label>
    </div>
        
        <div class="row">
        <label>
        Password:
            <input class="text-black"  required type="password" id="password" />
        </label>
    </div>
        <div class="row">
        <label>
        Confirm Passowrd:
            <input class="text-black"  required type="password" id="password_confirm" />
        </label>
    </div>

    {#if error}
    <p class="text-red-500">{error}</p>
    {/if}
    <button type="submit"> Signup</button>
</form>

</div>