<script lang="ts">
import "../app.css";
import favicon from '$lib/assets/favicon.svg';

let { children, data } = $props();

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


<main>
{@render children()}
</main>

