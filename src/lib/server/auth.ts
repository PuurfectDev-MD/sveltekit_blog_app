import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { admin } from 'better-auth/plugins';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: env.GMAIL_USER,
		pass: env.GMAIL_APP_PASSWORD
	}
})

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
			await transporter.sendMail({
				from: env.GMAIL_USER,
				to: user.email,
				subject: 'Verify your email',
				html: `Click here to verify your account: <a href="${url}">${url}</a>`
			})
		},
		autoSignInAfterVerification: true,
	},
	plugins: [
		admin(),
		sveltekitCookies(getRequestEvent)
	]
});