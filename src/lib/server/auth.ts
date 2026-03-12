import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { admin } from 'better-auth/plugins';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			const { data, error } = await resend.emails.send({
				from: 'onboarding@resend.dev',
				to: user.email,
				subject: 'Verify your email',
				html: `Click here to verify your account: <a href="${url}">${url}</a>`
			})
			console.log("Resend-result", data)
			console.log("Error", error)
		},
		autoSignInAfterVerification: true,
	},
	plugins: [
		admin(),
		sveltekitCookies(getRequestEvent)
	]
});