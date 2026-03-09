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

<nav class="flex flex-row justify-center p-4 gap-x-4">
	<a href= "/" class= "hover:scale-105">Home</a>
	{#if data.user?.role == "admin"}
	<a href="/admin" class= "hover:scale-105">Admin</a>
	{/if}
	<a  href="/post/new" class= "hover:scale-105">Create</a>
	

	{#if data.user}
	 <button onclick={logout}>Logout</button>

	 {:else}
	 <button onclick={() => goto('/auth/signup')}>signup</button>
	{/if}

</nav>

{#if data.user}
<div class="flex flex-col items-end p-4 pr-8 bg-red-500">
<h1 class="pt-2">This is {data.user.name}'s account</h1>
<h2 class="pt-2">{data.user.email}</h2>
<button onclick={logout}>Logout</button>
</div>
{/if}

<main>
{@render children()}
</main>

