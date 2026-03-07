import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (locals.user?.role !== 'admin') {
        console.log(locals)
        console.log("role" + locals.user.role)
        console.log("not an admin")
        throw redirect(302, `/`)
    }
}