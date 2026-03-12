<script lang="ts">
    import { delete_post, get_all_posts } from "./posts.remote";
    import { invalidateAll } from "$app/navigation";

    
    let posts =  $state(await get_all_posts());
    let deletingId = $state<string | null>(null);

    async function admin_delete_post(postId: string){
        deletingId = postId
        await delete_post(deletingId)
           await invalidateAll();
        posts = await get_all_posts()
        deletingId =null
    }
</script>

<div class="flex flex-wrap justify-evenly gap-8 mt-10">
{#each posts as post (post.id) }
<div class="p-8 rounded-lg bg-slate-800 w-[20%] p-8">

    <div class="grid grid-cols-2">
    <div>
        <h1><a href="/admin/post/{post.id}">{post.title}</a></h1>
    </div>
    <div class="flex justify-end items-start">
    {#if deletingId == post.id}
    <p>Deleting...</p>
    {:else}
     <button onclick={() => admin_delete_post(post.id)} class="bg-red-600 rounded-lg w-fit px-3 py-1">Delete</button>
    {/if}     
    </div>
   
    </div>
    <p>{post.body}</p>
</div>
{/each}

</div>