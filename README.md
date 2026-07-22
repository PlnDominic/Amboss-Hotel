# Anboss Hotel

Marketing website for Anboss Hotel — Santasi Apre, Kumasi. Built with Next.js (App Router), Tailwind CSS and TypeScript, from the [Claude Design](https://claude.ai/design) mockup.

## Pages

- **Home** (`/`) — hero, featured rooms, and a room-type tab panel (Single / Double / Twin)
- **Rooms** (`/rooms`) — full breakdown of each room type, with pricing
- **Amenities** (`/amenities`) — hotel facilities
- **Booking** (`/booking`) — reserve a room with live availability and pricing
- **Contact** (`/contact`) — general enquiry form and location details
- **Admin** (`/admin/bookings`) — password-protected list of bookings, not linked from the public site

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `ADMIN_PASSWORD` — password for `/admin/bookings`. Falls back to a well-known default if unset; **set a real value in production**.
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — Gmail account used to email new bookings. `GMAIL_APP_PASSWORD` must be a 16-character [Gmail App Password](https://myaccount.google.com/apppasswords) (requires 2-Step Verification on the account) — Google no longer accepts a regular account password for SMTP login. If these are unset, booking emails are skipped with a console warning; the booking itself still succeeds.
- `BOOKING_NOTIFICATION_EMAIL` — optional recipient for booking emails, defaults to `GMAIL_USER`.

## Booking system

- Room data (pricing, nightly rate, and how many physical rooms exist per type) lives in `src/data/rooms.ts`.
- `src/lib/bookings.ts` persists bookings to a JSON file at `data/bookings.json` (created automatically, gitignored) and checks availability by counting overlapping, non-cancelled bookings against each room type's `totalUnits`.
- `POST /api/bookings` validates and creates a booking, then emails a notification via `src/lib/mailer.ts` (nodemailer + Gmail).
- `GET /api/availability` powers the live "X rooms left" check in the booking form as dates change.
- `/admin/bookings` (guarded by a password-derived cookie set via `/api/admin/login`) lists all bookings and lets you confirm, cancel, or delete them.

**Limitation:** the JSON file store is a single-process solution — fine for a normal long-running Node.js server (`npm start` on a VM/container), but it will **not** persist reliably on serverless platforms with multiple/ephemeral instances (e.g. Vercel's default deployment). For that kind of deployment, swap `src/lib/bookings.ts` for a real database.

## Notes

- Room and amenity photos without a real photo yet render as styled placeholders — see the `image` field on `RoomInfo` in `src/data/rooms.ts` and the `galleryImages` array in `src/data/gallery.ts` to swap in more photography.
- Styling uses Tailwind CSS v4 with brand colors/fonts defined in `src/app/globals.css`.
