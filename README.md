# Handoff: sophiapilot — Porsche VIN Decoder (Phase 1 MVP)

## Overview
A Porsche VIN decoder: paste a VIN, get factory specs, AI-explained option codes, and production info. Anonymous users get a full basic decode; a login wall gates Collector Score, Market Value, and Auction History (Phase 2+, shown here only as locked teasers). Built as an SEO-driven acquisition funnel converting to free-account signup.

## About the Design Files
The files in this bundle are **design references built as HTML prototypes** (Design Components — self-contained `.dc.html` files with inline styles and a small runtime, `support.js`) showing intended layout, copy, and interaction — not production code to copy directly. The task is to **recreate these designs in your target stack** (the PRD assumes React + TypeScript + Tailwind/ShadCN + Supabase) using your codebase's existing patterns and libraries.

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy are final for Phase 1; recreate pixel-close using the design tokens below. Car photography is placeholder ("drop an image" slots) — swap for real photos.

## Design System
"Modernist": flat, architectural, mono red-on-white, Archivo typeface, 0 border-radius, strong 2px dividers. Tokens are CSS custom properties in `styles.css` — reuse them as your Tailwind theme extension (`--color-bg #f3f2f2`, `--color-text #201e1d`, `--color-accent #ec3013`, plus 100–900 tonal ramps for neutral/accent). Component classes (`.btn`, `.card`, `.tag`, `.table`, `.nav`, `.field`/`.input`, `.dialog`) are in the same file — port these to your component library.

## Screens
1. **Homepage** (`Homepage.dc.html`) — nav, hero with VIN search input + "Decode VIN" CTA + example-VIN link, hero photo slot, 3-up feature cards, social-proof strip, accent-field closing CTA band, footer with SEO explainer links.
2. **VIN Results** (`VinResults.dc.html`) — VIN header, hero photo + thumbnail strip, spec table (model/year/generation/engine/hp/transmission/drive/colors/MSRP/plant/production), factory option list with AI plain-English explanations, "Collector Intelligence" 3-card row (Collector Score / Market Value / Auction History) rendered blurred behind a lock CTA, closing Garage-signup banner.
3. **Create Account** (`CreateAccount.dc.html`) — split screen: left accent-field panel listing unlocked benefits, right form (Google/Apple/email+password).
4. **Strategy Docs** (`StrategyDocs.dc.html`) — flowing document: PRD, user flow, IA, DB schema, API architecture, SEO approach, Phase 2–6 roadmap table.

## Interactions & Behavior
- Homepage search submit and "example VIN" both route to the VIN Results page.
- VIN Results "Unlock ___" buttons and the closing banner route to Create Account.
- Create Account submit routes back to VIN Results (post-auth landing).
- All buttons/links use the design system's themed hover/active/focus states (accent ramp steps, 2px accent focus ring) — no browser defaults.

## State Management (for real implementation)
- `vin` search input state on Homepage.
- Auth state (anonymous vs. logged-in) gates Collector Intelligence content on VIN Results — anonymous sees blurred/locked, logged-in sees real values.
- Garage/save state per user (see schema).

## Design Tokens
See `styles.css` — all colors, spacing (`--space-1..8`), radius (`0` throughout), and shadows are CSS variables there. Font: Archivo (Google Fonts), weight 800 for headings.

## Assets
No real photography — `image-slot.js` placeholders mark where car photos go (hero + 4 thumbnails on VIN Results, 1 hero on Homepage). Icons are inline Lucide-style SVGs (checkmarks on Create Account).

## Files
- `Homepage.dc.html`, `VinResults.dc.html`, `CreateAccount.dc.html`, `StrategyDocs.dc.html` — the four screens/doc above.
- `styles.css` — the Modernist design system (tokens + component classes).
- `image-slot.js`, `doc-page.js`, `support.js` — runtime helpers the prototypes use to render in-browser; not needed in your production app.

Strategy doc content (PRD/schema/API/roadmap) is also fully written out inside `StrategyDocs.dc.html` — read it directly for the DB schema and API route list.
