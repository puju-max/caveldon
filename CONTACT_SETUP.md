# CAVELDON Contact / Setup & Launch Guide

**Status:** Ready-to-configure source. No inbox, domain, AWS resources, or live contact API has been provisioned. Inquiries are **copy-only** until both public frontend variables are configured and the backend is deployed successfully.

## System architecture

Visitor `/contact/` → JavaScript + Cloudflare Turnstile widget → API Gateway HTTP API (`POST /inquiry`) → Node.js 22 Lambda validates inputs and Turnstile token → Amazon SES v2 emails your **business inbox**. The system stores **no project-inquiry database**. Inquiries still pass through third-party services and email systems, whose logging and retention you must account for in your privacy documentation.

**This is an initial business-inquiry channel, not a secure portal for patient information, passwords, customer databases, credentials, medical records, or large confidential documents.**

## What you need to acquire/configure

1. **A domain you own.** `caveldon.com` is an illustrative future choice; ownership, availability, and trademark rights are not assumed.
2. **A real email inbox**, ideally `hello@<your-domain>` via Microsoft 365, Google Workspace, Fastmail, Zoho Mail, or another email host. **Amazon SES is not a mailbox product**; SES will send website notifications to that inbox but doesn't create the address or host incoming mail.
3. **AWS account and AWS region** for Lambda, API Gateway, SES and Secrets Manager. Choose a region that fits your operations and any applicable data-handling commitments.
4. **SES verified sender domain or email address**, with DNS DKIM records. Configure SPF and DMARC appropriately for your mail environment. If SES is in its sandbox, sending to arbitrary unverified recipients is restricted: request production SES sending access when ready.
5. **Cloudflare Turnstile site key and secret key**, configured for the exact public site hostname. Only the *site key* is public. Place the secret key in AWS Secrets Manager, not the Astro `.env` file or browser JavaScript.
6. **An approved privacy notice** explaining who operates the site, what inquiry data is collected, service providers and purposes, transfers where relevant, retention, contact method and privacy rights. Review rules relevant to your customer locations; do not publish a dummy legal policy.

## Email setup (once you have domain ownership)

- In your domain registrar's DNS, configure your email provider's **MX**, **SPF**, **DKIM**, and **DMARC** records following their guidance. Avoid conflicting SPF TXT records.
- Create the actual mailbox `hello@your-domain.example` and test receiving and sending mail.
- In **Amazon SES**, verify the sender identity for the **same AWS region** in which the Contact Lambda will run. SES domain verification/DKIM DNS records are separate from mailbox provider settings.
- Decide `SenderEmail` and `NotificationEmail` (these can be the same mailbox address). Test SES separately before publishing the form.
- Do not use a visitor's email as SES From address: the API uses it only as **Reply-To**.

## Turnstile & AWS deployment

- Create a Cloudflare Turnstile widget for your deployed website hostname, e.g. `www.your-domain.example`, and note its public site key.
- Save its **secret key** as a Secrets Manager **plain text** secret in the deployment AWS region. Save the generated ARN. Never commit the secret to this repository.
- Install AWS CLI, AWS SAM CLI, and Node.js 22. Set up your AWS credentials and region securely.
- From the project directory:

```sh
cd infra/contact-api
npm test                   # no external dependency needed for these core validation tests
sam build --template-file template.yaml
sam deploy --guided
```

During guided deployment supply:

| SAM parameter | Example | Important |
|---|---|---|
| `AllowedSiteOrigin` | `https://www.your-domain.example` | Must exactly equal browser request Origin; no path or trailing slash |
| `SenderEmail` | `hello@your-domain.example` | SES-verified sender identity |
| `NotificationEmail` | `hello@your-domain.example` | Deliver to the actual working mailbox |
| `SesIdentityName` | `your-domain.example` | Verified SES identity name used to scope send permission |
| `TurnstileSecretArn` | `arn:aws:secretsmanager:...:secret:...` | ARN of secret containing Turnstile server key |

SAM should print `InquiryApiUrl` after a successful deployment. Copy it for the Astro configuration. Do not present the API publicly as a secured authentication endpoint: it is intentionally anonymous and relies on spam checks. Consider WAF, API-level throttling, and monitoring/alarms before promoting a public campaign.

## Simplest option: a booking link

You don't need the AWS backend to start taking calls. Set `PUBLIC_BOOKING_URL` to a Cal.com or Calendly link and `PUBLIC_CONTACT_EMAIL` to a real mailbox. Every "Book a call" button then opens your calendar, and the contact page shows your email. Deploy the backend below later if you want the form to send messages too.

## Configure Astro (only after backend and mailbox tests)

Copy `.env.example` to `.env` in the **root** Astro project and set:

```dotenv
PUBLIC_SITE_LIVE=false
PUBLIC_SITE_URL=https://www.your-domain.example
PUBLIC_CONTACT_EMAIL=hello@your-domain.example
PUBLIC_BOOKING_URL=https://cal.com/your-name/30min
PUBLIC_CONTACT_API_URL=https://YOUR-API-ID.execute-api.YOUR-REGION.amazonaws.com/inquiry
PUBLIC_TURNSTILE_SITE_KEY=YOUR_PUBLIC_SITE_KEY
```

Keep `PUBLIC_SITE_LIVE=false` until every public-facing claim, draft article, and privacy requirement is reviewed. A functioning form is not the same as making the entire website production-ready. When the `PUBLIC_CONTACT_API_URL` **or** `PUBLIC_TURNSTILE_SITE_KEY` is missing, the Contact form remains **copy-only**.

Never set `PUBLIC_TURNSTILE_SECRET_KEY`, AWS secret keys, SES credentials, or private personal information in frontend variables. Everything prefixed with `PUBLIC_` can reach the browser.

**Rebuild the static site** (`npm run build`) after editing `.env`, then deploy the new `dist/` output. In Astro static builds, public variables are compiled into the generated HTML.

## Functional launch tests

1. Visit `/contact/` and send a message using a **non-sensitive test inquiry**.
2. Confirm the backend returns success **and** the business mailbox actually receives it (including spam folder), then reply to the submitter using Reply-To.
3. Submit a bad email, unchecked consent, incomplete message, and an expired captcha; ensure they are rejected. Test mobile layout and keyboard focus.
4. Temporarily simulate an unavailable API or SES rejection and ensure the site **does not** show success.
5. Check no query values, project descriptions or email addresses leak into access/application logs. This implementation does not log request bodies intentionally. Audit your hosting/WAF/monitoring settings.
6. Set AWS budget alerts, API alarm thresholds, and a practical lifecycle for inquiry emails. Confirm deletion/retention and relevant data protection commitments.
7. Check `PUBLIC_SITE_LIVE` and `draft:` flags before making the rest of the site publicly searchable.

## Commands / tests without AWS configuration

```sh
npm install
npm run dev
# Open http://localhost:4321/contact/
# Form operates in copy-only preview mode until configured.

cd infra/contact-api
npm test
```

## Notes & limitations

- `Origin` and CORS are checked, but **CORS is not an authentication system**. Turnstile makes automated abuse harder but does not eliminate it. Consider WAF and IP-based throttling for higher traffic.
- SES `SendEmail` accepts an email for delivery; it does not guarantee that a recipient read it or that every mailbox will accept it.
- The AWS SAM infrastructure has **not** been deployed or validated against an AWS account in this delivery. Run `sam validate --lint`, build, and staging smoke tests before production.
- Costs for SES, API Gateway, Lambda, Secrets Manager, DNS, and mailbox hosting may apply.
- Verify legal/trademark rights to the CAVELDON name and control of the chosen domain before publishing company addresses.
