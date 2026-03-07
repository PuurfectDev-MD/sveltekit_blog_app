import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    if (locals.user?.id) {
        console.log(locals.user.id)
        throw redirect(302, `/${locals.user.id}`)
    }
}
