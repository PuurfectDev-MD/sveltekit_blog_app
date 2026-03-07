<script lang="ts">

    import {get_post_by_id} from "../../admin/posts.remote";
      import {page} from "$app/state";
    const post = await get_post_by_id(page.params.id!)
</script>


<h1>{post?.title}</h1>
<p>{post?.body}</p>