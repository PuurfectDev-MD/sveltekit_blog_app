 <script lang="ts">
	import { get_post_by_id, update_post } from "../../posts.remote";
    import {page} from "$app/state";

    const post = await get_post_by_id(page.params.id!);
 </script>


 
<h1>Post Page</h1>
<!-- 
<div class="row">
    <h1> {post?.title}</h1>
    <h3>{post?.body}</h3>
</div>
 -->


<form {...update_post}>
<input {...update_post.fields.id.as('text')} value="{post?.id}" readonly/>
    <div class="row">
        <label>
            Title:
            <input {...update_post.fields.title.as('text')} value="{post?.title}"/>
        </label>
        {#each update_post.fields.title.issues() as issue(issue.message)}
        <p>{issue.message}</p>
        {/each}
    </div>
    <div class="row">
        <label>Body: <textarea {...update_post.fields.body.as('text')} value="{post?.body}" class="text-black"></textarea></label>
    </div>

    <button type= "submit">Post </button>
</form>