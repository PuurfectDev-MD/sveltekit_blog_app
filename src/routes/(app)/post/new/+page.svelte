<script lang="ts">
    import {create_post} from "../../user.remote"
</script>


<h1 class="text-2xl p-8">New Post</h1>
<div class="flex flex-col justify-center items-center">
<form {...create_post}>
<div class="flex flex-col gap-y-10">
    <div class="row">
        <label>
            Title:
            <input {...create_post.fields.title.as('text')} class="p-2"/>
        </label>
        {#each create_post.fields.title.issues() as issue(issue.message)}
        <p>{issue.message}</p>
        {/each}
    </div>
    <div class="row">
        <label><textarea {...create_post.fields.body.as('text')} class="p-2 w-full h-60 text-black"></textarea></label>
    </div>
    <button type= "submit">Post </button>
    </div>
</form>
</div>