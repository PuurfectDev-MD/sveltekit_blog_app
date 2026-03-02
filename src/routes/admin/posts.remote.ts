import { form, getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import * as v from 'valibot';
import { auth } from "$lib/server/auth";
import { post } from "$lib/server/db/schema";

export const get_all_posts = query(async () => db.query.post.findMany());


export const create_post = form(v.object({
    title: v.pipe(v.string(), v.nonEmpty('Title is required')),
    body: v.pipe(v.string(), v.nonEmpty())
}), async ({ title, body }) => {
    const event = getRequestEvent();   // getting the session info
    const session = await auth.api.getSession({
        headers: event.request.headers
    })

    if (!session?.user?.id) {
        error(401, "Unauthoeized");
        return;
    }
    const slug = title.toLowerCase().replace(/ /g, "-");
    await db.insert(post).values({
        title,
        slug,
        body,
        authorId: session.user.id
    });
    redirect(303, "/admin");
});