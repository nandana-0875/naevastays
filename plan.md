# Naeve Stay — Implementation Plan

## Product scope

Naeve Stay is a single-page, photo-led homestay portfolio for Varkala, Kerala. It is a showcase only: there is no booking flow, calendar, payment, reservation form, enquiry form, customer data capture, or on-site availability logic. The only conversion path is an editable external Booking.com link.

Because the user has not supplied property photography yet, the first version uses clearly labeled, non-stock placeholder image panels and a documented asset map. Each placeholder is wired to an easy-to-replace filename so the supplied photographs can become the visual center without reworking the layout.

## Design direction

- **Design movement:** Kerala editorial hospitality — a quiet blend of boutique guesthouse minimalism, travel-journal composition, and tactile print-like restraint.
- **Core principles:** photography before interface; generous breathing room; factual warmth; quiet premium details.
- **Color philosophy:** warm ivory and cream keep the page sunlit; sand and terracotta add the feeling of laterite earth and Kerala clay; muted sage brings in tropical foliage; warm brown and deep charcoal provide legibility and grounding. The ownable signature color is **Naeve terracotta** `#B56346`.
- **Layout paradigm:** a vertical editorial promenade rather than a dashboard or card grid. Wide, asymmetric bands are punctuated by narrow text columns, oversized numerals, and full-bleed image moments.
- **Signature elements:** hairline rules with small uppercase labels; terracotta “chapter” markers and coordinates; clipped image windows with quiet captions and filename labels while placeholders are active.
- **Interaction philosophy:** interactions are calm and useful. Filters refine the photo journal without reflow drama; the lightbox lets a visitor linger; hover motion is a gentle lift/zoom rather than a flashy effect.
- **Animation:** CSS entrance reveals use a short opacity/translate transition; image hover uses a 1.04 scale and caption fade; the hero scroll cue gently pulses. No parallax or perpetual motion.
- **Typography system:** `Cormorant Garamond` for editorial headings and brand wordmark; `DM Sans` for labels, navigation, body copy, controls, and metadata. Headings use high contrast and generous line-height; supporting copy stays compact and readable.
- **Brand essence:** A quiet, considered homestay portfolio for travelers who want to feel close to Varkala’s cliff, sea, and everyday rhythm. Personality: **grounded, attentive, unhurried**.
- **Brand voice:** warm and specific, never salesy or generic. Example lines: “A homely corner of Varkala.” / “Let the day take its own shape.”
- **Wordmark & logo:** a typographic N monogram formed from two offset vertical strokes, echoing a doorway and a palm shadow; the wordmark uses a small terracotta overline and letterspaced NAEVE STAY.
- **Signature brand color:** Naeve terracotta `#B56346`.

## Site structure

- `index.html` contains the single-page content sections and semantic landmarks.
- `styles.css` owns the visual system, responsive editorial compositions, placeholder treatments, lightbox, nav drawer, and reduced-motion behavior.
- `script.js` owns the mobile menu, smooth anchor navigation, gallery filters, lightbox state, and safe external-link behavior.
- `public/images/` is the photo handoff area. `README.md` documents the exact placeholder filenames for hero, property spaces, and Varkala scenes.
- `public/manus-routes.json` declares the only page route (`/`) for the preview and publication contract.
- `app.config.ts` holds a small project logo metadata export for the accepted checkpoint.

## Serving and constraints

The site is a dependency-free static frontend served on the configured Webdev port `3000` via a minimal Python HTTP server for preview. No server, database, auth, storage, payments, maps API, or form endpoint is needed. The “map” is intentionally a labeled visual placeholder with an editable Google Maps link until the exact location is supplied.

## Content decisions

The property feature list is restricted to the supplied facts. Room categories remain generic; no room names, room numbers, appliances, or unprovided amenities are invented. Terrace copy is presented as the supplied suggestion but is framed as editable copy in the source. Varkala photography is also placeholder-only until accurate user-provided images are added.
