<script lang="ts">
    import { get_all_posts } from "./posts.remote";

    
    const posts =  await get_all_posts();

</script>

<a href="admin/post/new" class="p-8"> New post </a>

<ol>
{#each posts as post (post.id) }
<li>
<a href="/admin/post/{post.id}">
    {post.title}</a>
</li>
{/each}

</ol>