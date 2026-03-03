<script lang="ts">
import "../app.css";
import favicon from '$lib/assets/favicon.svg';
	import { authClient } from "$lib/auth-client";
	import { goto } from "$app/navigation";

let { children, data } = $props();

function logout(){
	authClient.signOut({
		fetchOptions:{
			onSuccess: async() => {
				console.log("Logout done!")
				 window.location.href = '/auth/login' // updates the server side also  -didnt used goto cause thats client side only

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
	<a href="/admin" class= "hover:scale-105">Admin</a>
	<a>IDK</a>
	<a>Create</a>
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

