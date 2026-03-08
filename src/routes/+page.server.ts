import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    console.log(locals.user?.role + "is detected")
    if (locals.user?.id) {
        console.log(locals.user.id)
        throw redirect(302, `/${locals.user.id}`)
    }
}
