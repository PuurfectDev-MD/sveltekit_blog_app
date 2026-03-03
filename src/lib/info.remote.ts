import { db } from "$lib/server/db";
import { query } from "$app/server"
import { eq } from 'drizzle-orm'
import * as v from 'valibot';

export const all_posts = query(async () => db.query.post.findMany());


export const post_by_id = query(v.string(), async (id) => db.query.post.findFirst({
    where: (p, { eq }) => eq(p.id, id)
}));