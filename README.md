## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

- Chapter 6
1. To install the [Vercel Postgres SDK](https://vercel.com/docs/storage/vercel-postgres/sdk):
	```bash
	pnpm i @vercel/postgres
	```

- Chapter 11
1. Install use-debounce:
	```bash
	pnpm i use-debounce
	```
	---
	
	*You don't want to fetch data on the client as this would expose your database secrets (remember, you're not using an API layer)*
	
	---

- Chapter 15
1. Install NextAuth.js by running the following command in your terminal:
	```bash
	pnpm i next-auth@beta
	```
	Here, you're installing the beta version of NextAuth.js, which is compatible with Next.js 14.

2. Next, generate a secret key for your application. This key is used to encrypt cookies, ensuring the security of user sessions. You can do this by running the following command in your terminal:

	```bash
	openssl rand -base64 32
	```

For more: [Adding Authentication](https://nextjs.org/learn/dashboard-app/adding-authentication)