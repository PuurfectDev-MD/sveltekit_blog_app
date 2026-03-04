<script lang="ts">
    import { page } from "$app/state";
    import { user_posts_by_id } from "./user_posts.remote"

    let postsPromise = user_posts_by_id(page.params.id!);
</script>

<div class="card flex flex-wrap justify-evenly gap-x-10 mt-[5%]">
    {#await postsPromise}
        <p>Loading posts...</p>
    {:then posts}
        {#each (posts ?? []) as post}
            <a href="/view/{post.id}">
                <div class="bg-slate-700 mt-10 p-10 rounded-xl">
                    <h1>{post.title}</h1>
                    <h2>{post.body}</h2>
                    <p class="pt-2">{post.createdAt}</p>
                </div>
            </a>
        {:else}
            <p>No posts found.</p>
        {/each}
    {/await}
</div>