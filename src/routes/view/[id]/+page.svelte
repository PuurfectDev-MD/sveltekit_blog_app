<script lang="ts">
    import {post_by_id} from "$lib/info.remote";
      import {page} from "$app/state";
    const post = await post_by_id(page.params.id!)
</script>


<h1>{post?.title}</h1>
<p>{post?.body}</p>