This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment

Copy `.env.example` to `.env` and fill it in.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the contact form | [Resend](https://resend.com/api-keys) key used by the contact form's Server Action to email submissions. |
| `NEXT_PUBLIC_SITE_URL` | Once a custom domain exists | Absolute origin for share previews (`og:image`), `sitemap.xml` and `robots.txt`, e.g. `https://mostudio.dev`. |

Set `RESEND_API_KEY` in the Vercel project too — without it, production submissions fail into the form's delivery error while local development keeps working.

The form sends from the shared `onboarding@resend.dev` sender, which needs no verified domain but may **only** deliver to the Resend account's own address. That recipient is `site.email` in `src/lib/site.ts`; any other value returns a 403. Verifying a domain is only necessary to send mail *to* visitors (an auto-reply), which the form does not do — it sets `reply_to` to the visitor instead.

Until `NEXT_PUBLIC_SITE_URL` is set, the site falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (keep "Automatically expose System Environment Variables" on in the Vercel project), then to `http://localhost:3000`. The URL is baked in at build time, so redeploy after changing it.

After a production deploy, check the share preview with [opengraph.xyz](https://www.opengraph.xyz), [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). The last two also refresh cached previews.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
