<script lang="ts">

    import {get_post_by_id} from "../../admin/posts.remote";
      import {page} from "$app/state";
    const post = await get_post_by_id(page.params.id!)
</script>

<div class="flex flex-col justify-center items-center gap-y-5 p-8 w-full">
<div class= "flex flex-row w-full ">
<h1 class= "text-2xl font-bol left-1/2 flex-1 text-center">{post?.title}</h1>
<a href= "/post/update/{post?.id}">Edit</a>
</div>
<p class= "text-lg pt-8">{post?.body}</p>
</div>