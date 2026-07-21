# Anboss Hotel

Marketing website for Anboss Hotel — Santasi Apre, Kumasi. Built with Next.js (App Router), Tailwind CSS and TypeScript, from the [Claude Design](https://claude.ai/design) mockup.

## Pages

- **Home** (`/`) — hero, featured rooms, and a room-type tab panel (Single / Double / Twin)
- **Rooms** (`/rooms`) — full breakdown of each room type
- **Amenities** (`/amenities`) — hotel facilities
- **Contact** (`/contact`) — enquiry form and location details

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

## Notes

- Room and amenity photos are placeholders — swap the `ImagePlaceholder` components in `src/app/*` for real photography when available.
- Styling uses Tailwind CSS v4 with brand colors/fonts defined in `src/app/globals.css`.
