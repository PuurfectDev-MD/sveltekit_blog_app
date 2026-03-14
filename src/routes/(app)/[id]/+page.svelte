<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/state";
	import { redirect } from "@sveltejs/kit";
	import { delete_post } from "../../admin/posts.remote";
    import { user_posts_by_id } from "./user_posts.remote"
	import { stopPropagation } from "svelte/legacy";

    let postsPromise =$state(user_posts_by_id(page.params.id!)) ;

    let post_to_delete= $state<string| null>(null);

    async function delete_user_post (post_id: string){
        post_to_delete = post_id
        await delete_post(post_to_delete)
        await invalidateAll()
        postsPromise = user_posts_by_id(page.params.id!)
        post_to_delete = null
    }
</script>

<div class="card flex flex-wrap justify-evenly gap-x-10 mt-[5%]">
    {#await postsPromise}
        <p>Loading posts...</p>
    {:then posts}
        {#each (posts ?? []) as post}
            <a href="/view/{post.id}">
                <div class="bg-slate-700 mt-10 rounded-xl m-4 max-h-60 max-w-80 overflow-hidden p-10 z-0">
                <div class="flex flex-row justify-between">
                      <h1 class="text-3xl z-10">{post.title}</h1>
                      {#if post_to_delete != null }
                        <p>Delete</p> 
                        {:else}
                         <button onclick={(e) =>{e.preventDefault(); e.stopPropagation(); delete_user_post(post.id)}} class="px-4 bg-red-600 rounded-xl w-fit z-50">Delete</button>
                      {/if}
                     
                </div>
                    <h2 class="z-10 py-4">{post.body}</h2>
                    <p class="pt-2 bottom-0">{post.createdAt}</p>
                        
                </div></a>

                {#if post_to_delete }
                <div class="fixed bg-green-500 text-white w-[40%] h-[10vh] rounded-lg shadow-lg bottom-[80%] right-[-2rem] transition-all animate-pulse">
                    <p class="md:text-2xl px-8 py-4 text-xl">Deleting.... Give me a moment :)</p>
                    </div>
                {/if}
       
        {:else}
            <p>No posts found.</p>
        {/each}
    {/await}
</div>