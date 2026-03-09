<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/state";
	import { redirect } from "@sveltejs/kit";
	import { delete_post } from "../../admin/posts.remote";
    import { user_posts_by_id } from "./user_posts.remote"

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
            
                <div class="bg-slate-700 mt-10 rounded-xl m-4 max-h-60 max-w-80 overflow-hidden p-10">
                <div class="flex flex-row justify-between">
                      <h1 class="text-3xl">{post.title}</h1>
                      {#if post_to_delete != null }
                        <p>Deleting</p>
                        {:else}
                         <button onclick={() => delete_user_post(post.id)} class="px-4 bg-red-600 rounded-xl w-fit">Delete</button>
                      {/if}
                     
                </div><a href="/view/{post.id}">
                  
                    <h2>{post.body}</h2>
                    <p class="pt-2">{post.createdAt}</p>
                        </a>
                </div>
       
        {:else}
            <p>No posts found.</p>
        {/each}
    {/await}
</div>