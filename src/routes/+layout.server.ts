import type { LayoutServerLoad } from './$types.js'

export async function load({ locals, setHeaders }) {
    setHeaders({ 'cache-control': 'no-store' });
    const user = locals.user;
    return { user: locals.user ?? null };
}

