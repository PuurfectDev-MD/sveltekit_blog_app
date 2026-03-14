<script lang="ts">
import "../app.css";
import favicon from '$lib/assets/favicon.svg';
	import { authClient } from "$lib/auth-client";
	import { goto, invalidateAll } from "$app/navigation";
	
let { children, data } = $props();
let logging_out = $state(false);

function logout(){
	logging_out=true
	authClient.signOut({
		fetchOptions:{
			onSuccess: async() => {
				console.log("Logout done!")
				await invalidateAll()
				logging_out=false
				await goto('/auth/login', { replaceState: true })

			}
		}
	})
}

</script>

<svelte:head>
	<link rel="icon" href="/images/icon.png" />
</svelte:head>

<nav class="flex flex-row justify-center p-4 md:gap-x-20 gap-x-10 md:text-2xl text-xl font-serif">
	<a href= "/" onclick={() => invalidateAll()} class= "hover:scale-105 bg-green-500 p-2 rounded-md ">Home</a>
	{#if data.user?.role == "admin"}
	<a href="/admin" class= "hover:scale-105 bg-red-600 p-2 rounded-md">Admin</a>
	{/if}
	<a  href="/post/new" class= "hover:scale-105 bg-blue-500 p-2 rounded-md">Create</a>
	

	{#if data.user}
	 <button onclick={logout} class="bg-red-600 p-2 rounded-md hover:scale-105">{logging_out ? 'Logging Off' : "Log Out"}</button>

	 {:else}
	 <button onclick={() => goto('/auth/signup')} class="bg-red-600 p-2 rounded-md hover:scale-105">Signup</button>
	{/if}

</nav>

{#if data.user}
<div class="flex flex-col items-end p-4 pr-8 bg-slate-600">
<h1 class="pt-2">This is {data.user.name}'s account</h1>
<h2 class="pt-2">{data.user.email}</h2>
<button onclick={logout}>{logging_out ? 'Logging Off' : "Log Out"}</button>
</div>
{/if}

 {#if logging_out }
     <div class="fixed bg-green-500 text-white md:w-[40%] md:h-[10vh] w-[90%] rounded-lg shadow-lg md:bottom-[80%] md:right-[-2rem] bottom-[8vh] right-[-1rem] transition-all animate-pulse">
        <p class="md:text-2xl px-8 py-4 text-xl">Come back Soon :)</p>
        </div>
    {/if}

<main>
{@render children()}
</main>

