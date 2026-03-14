<script lang="ts">
    import {create_post} from "../../user.remote"

    let posting = $state(false)
</script>


<h1 class="text-2xl p-8 font-eagle">New snippet</h1>
<div class="flex flex-col justify-start px-4">
<form {...create_post}>
<div class="flex flex-col gap-y-10 font-serif">
    <div class="row">
        <label>
            Title:
            <input {...create_post.fields.title.as('text')} class="p-2 ml-4 text-white bg-gray-700 rounded-md"/>
        </label>
        {#each create_post.fields.title.issues() as issue(issue.message)}
        <p>{issue.message}</p>
        {/each}
    </div>
    <div class="row">
        <label><textarea {...create_post.fields.body.as('text')} class="p-2 w-full h-60 text-white bg-gray-700 rounded-md"></textarea></label>
    </div>
    <button type= "submit" onclick={()=> {
        posting = true
    }}> {posting ? 'Posting..' : 'Post'} </button>

    </div>
</form>
 {#if posting }
    <div class="fixed bg-green-500 text-white w-[40%] h-[10vh] rounded-lg shadow-lg bottom-[50%] right-[-2rem] transition-all animate-pulse">
        <p class="md:text-2xl px-8 py-4 text-xl">Posting.... Give me a moment :)</p>
        </div>
    {/if}
</div>