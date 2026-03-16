# Supabase Reset Password Email Template

> [!info] Intermediate landing page
> To prevent email prefetching (security scanners, link previews) from consuming the one-time token before the user clicks, the reset link goes to an intermediate page with a "Continuer" button. The user's click triggers the redirect, not the prefetcher.

---

## 1. Update the Supabase Email Template

1. Go to **Supabase Dashboard** → **Authentication** → **Email Templates**
2. Select **Reset password**
3. Replace the default link with the intermediate page link below.

### Template change

**Before (direct link — token consumed by prefetchers):**
```html
<a href="{{ .ConfirmationURL }}">Reset your password</a>
```

**After (intermediate page — token consumed only on user click):**
```html
<a href="{{ .SiteURL }}/reset-password/confirm?redirect_url={{ .ConfirmationURL | urlquery }}">Réinitialiser mon mot de passe</a>
```

> [!warning] URL encoding required
> `{{ .ConfirmationURL }}` contains `&` characters that would break the query string. The `| urlquery` pipe encodes it. If your Supabase project does not support `urlquery`, the link will be malformed — in that case, use the [OTP flow](https://supabase.com/docs/guides/auth/auth-email-templates#email-prefetching) (Option 1) with `{{ .Token }}` instead.

---

## 2. Prerequisites

- **Site URL** (Authentication → URL Configuration) must be your app origin, e.g. `https://app.lepassant.app`
- **Redirect URLs** must include `https://app.lepassant.app/reset-password` (and `/reset-password/confirm` if your Supabase version validates it)

---

## 3. Flow

1. User requests password reset → Supabase sends email
2. Email link points to `https://app.lepassant.app/reset-password/confirm?redirect_url=<encoded Supabase verify URL>`
3. User lands on intermediate page, sees "Continuer"
4. User clicks → redirect to Supabase verify → Supabase redirects to `/reset-password` with session
5. User sets new password
