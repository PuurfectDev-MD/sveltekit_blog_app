import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
    console.log(locals);
    if (locals.user?.id) {
        console.log("User already logged in");
        throw redirect(302, "/");
    }
}