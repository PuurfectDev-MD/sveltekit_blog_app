 <script lang="ts">
	import { get_post_by_id, update_post } from "../../../user.remote";
    import {page} from "$app/state";

    const post = await get_post_by_id(page.params.id!);
 </script>


 
<h1 class="text-2xl p-8">Edit</h1>
<div class="flex flex-col justify-center items-center">
<form {...update_post}>
<input {...update_post.fields.id.as('text')} class="hidden" value="{post?.id}" readonly/>
<div class="flex flex-col gap-y-10">
    <div class="row">
        <label>
            <input {...update_post.fields.title.as('text')} value="{post?.title}" class="p-4"/>
        </label>
        {#each update_post.fields.title.issues() as issue(issue.message)}
        <p>{issue.message}</p>
        {/each}
    </div>
    <div class="row h-full ">
        <label> <textarea {...update_post.fields.body.as('text')} value="{post?.body}" class="text-black p-4 w-full h-60" ></textarea></label>
    </div>

    <button type= "submit">Done </button>
    </div>
</form>
</div>