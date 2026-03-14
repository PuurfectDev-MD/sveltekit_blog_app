<script lang="ts">
	import { goto } from '$app/navigation';
  import {authClient} from '$lib/auth-client';


  let error  = $state('');
  let errorMessage = $state('');

  let signing = $state(false);

   async function  signup(e:Event){
    e.preventDefault();
    error = ''
    errorMessage = ''
    
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
            console.log("Going to verify page")
             window.location.href = '/auth/verify'
        },
        onError: (ctx) =>{
            errorMessage  = ctx.error.message;
            console.error(errorMessage);
            signing = false;
        }
    });
  }

</script>

<div class="flex flex-row justify-center gap-y-4">
<form onsubmit={signup} class= "pt-10">
<div class="flex gap-x-5 p-4">
    <h1 class="text-3xl font-bold">Signup >> </h1>
    <h2 class="text-2xl pt-1">To begin noting snippets!</h2>
</div>

    <div class="row p-4">
        <label>
        Username:
            <input class="text-black ml-4" required type="text" id="username" />
        </label>
    </div>
        <div class="row p-4">
        <label>
        Email:
            <input class="text-black ml-4"  required type="email" id="email" />
        </label>
    </div>
        
        <div class="row p-4">
        <label>
        Password:
            <input class="text-black ml-4"  required type="password" id="password" />
        </label>
    </div>
        <div class="row p-4">
        <label>
        Confirm Passowrd:
            <input class="text-black ml-4"  required type="password" id="password_confirm" />
        </label>
    </div>
         <button type="submit" onclick={() => {
        signing= true
    }} class="p-4 bg-green-200 rounded-xl text-black mt-8"> {signing ? 'Signing up...' : 'Signup'}</button>
  

</form>

 {#if signing }
    <div class="fixed bg-green-500 text-white w-[40%] md:h-[10vh] h-[15vh] rounded-lg shadow-lg bottom-[80%] right-[-2rem] transition-all animate-pulse">
        <p class="md:text-2xl px-8 py-4 text-xl">Preparing your space :)</p>
        </div>
    {/if}

</div>

<div class="flex justify-center gap-x-6 p-5 mt-10">
<h1>Already Have an account?</h1>
<a href= "/auth/login">Login</a>
</div>

<div class="flex flex-col justify-center items-center">
  {#if errorMessage || error}
            <h1 class="text-red-500 text-3xl">{errorMessage}</h1>
            <h1 class="text-red-500 text-3xl">{error}</h1>
            {:else}
            <p></p>
        {/if}
</div>