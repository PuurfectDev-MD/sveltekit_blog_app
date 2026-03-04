<script lang="ts">


    let error = $state('');
    let errorMessage = $state('');
  import {authClient} from '$lib/auth-client';
	import { goto, invalidateAll } from '$app/navigation';

   async function  login(e:Event){
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
  
    const email = form.email.value;
    const password = form.password.value;
  

    if (!email || !password){
        error = 'All fields are required';
        return;
    }

    console.log("Login button pressed- all valid")

    await authClient.signIn.email({
        email,password
    }, {
        onSuccess: async (ctx) =>{
            console.log("Login Done")
            await invalidateAll()
            await goto(`/${ctx.data.user.id}`);
        },
        onError: (ctx) =>{
            errorMessage  = ctx.error.message;
            console.error(errorMessage);
            
        }
    });
  }

</script>



<div class="flex flex-row justify-center gap-y-4">

<form onsubmit={login} class= "pt-10">

    
<h1 class="p-4 text-3xl font-bold">Log In</h1>
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

    {#if error}
    <p class="text-red-500">{error}</p>
    {/if}
    <button type="submit" class="p-4 mt-8 bg-green-200 rounded-xl text-black"> Login</button>
</form>

</div>


<div class="flex gap-x-6 p-5 mt-4 justify-center">
<h1>Dont have an account?</h1>
<a href= "/auth/signup">Signup</a>
</div>