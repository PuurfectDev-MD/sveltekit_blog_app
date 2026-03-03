<script lang="ts">
	import { all_posts } from "$lib/info.remote.js";

    const posts = await all_posts();
let {data} = $props();

</script>

<div class="flex flex-col items-end p-4 pr-8 bg-red-500">
<h1 class="pt-2">This is {data.user.name}'s account</h1>
<h2 class="pt-2">{data.user.email}</h2>
</div>

<div class="card flex flex-wrap justify-evenly  gap-x-10 mt-[5%">
    {#each posts as post}<a href="/view/{post.id}">
    <div class= "bg-slate-700 mt-10 p-10 rounded-xl">
        <h1>{post.title}</h1>
        <h2>{post.body}</h2>
        <p class="pt-2">{post.createdAt}</p>
    </div></a>
    {/each}
</div>