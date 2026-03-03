export async function load({ locals }) {
    console.log(locals)
    const user = locals.user;
    return { user: locals.user ?? null };
}
