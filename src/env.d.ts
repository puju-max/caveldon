/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_LIVE?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_BOOKING_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CONTACT_API_URL?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: string;
  readonly PUBLIC_ANALYTICS_ID?: string;
  readonly PUBLIC_ANALYTICS_SRC?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv; }
