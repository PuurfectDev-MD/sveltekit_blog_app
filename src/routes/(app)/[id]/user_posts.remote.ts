import { query } from "$app/server";
import { db } from "$lib/server/db";
import * as v from 'valibot';

export const user_posts_by_id = query(v.string(), async (id) => db.query.post.findMany({
    where: (p, { eq }) => eq(p.authorId, id)
})
);
