import { redirect } from '@sveltejs/kit'

export function load({ locals }) {
    if (!locals.user?.id) {
        console.log("user not detected")
        throw redirect(303, "/")
    }
}