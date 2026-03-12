<script lang="ts">
import "../app.css";
import favicon from '$lib/assets/favicon.svg';
	import { authClient } from "$lib/auth-client";
	import { goto, invalidateAll } from "$app/navigation";
	
let { children, data } = $props();

function logout(){
	authClient.signOut({
		fetchOptions:{
			onSuccess: async() => {
				console.log("Logout done!")
				await invalidateAll()
				await goto('/auth/login', { replaceState: true })

			}
		}
	})
}

</script>

<svelte:head>
	<link rel="icon" href="{favicon}" />
</svelte:head>

<nav class="flex flex-row justify-center p-4 gap-x-20 text-2xl font-serif">
	<a href= "/" class= "hover:scale-105 bg-green-500 p-2 rounded-md ">Home</a>
	{#if data.user?.role == "admin"}
	<a href="/admin" class= "hover:scale-105 bg-red-600 p-2 rounded-md">Admin</a>
	{/if}
	<a  href="/post/new" class= "hover:scale-105 bg-blue-500 p-2 rounded-md">Create</a>
	

	{#if data.user}
	 <button onclick={logout} class="bg-red-600 p-2 rounded-md hover:scale-105">Logout</button>

	 {:else}
	 <button onclick={() => goto('/auth/signup')} class="bg-red-600 p-2 rounded-md hover:scale-105">Signup</button>
	{/if}

</nav>

{#if data.user}
<div class="flex flex-col items-end p-4 pr-8 bg-slate-600">
<h1 class="pt-2">This is {data.user.name}'s account</h1>
<h2 class="pt-2">{data.user.email}</h2>
<button onclick={logout}>Logout</button>
</div>
{/if}

<main>
{@render children()}
</main>

