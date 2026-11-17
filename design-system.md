# Kolar Creek Lawn Care & Landscaping: Design System

Owner: Tyler Kolar · Fenton, Michigan · 20+ jobs a month
Version 1.0 · 2026-11-17

---

## 1. Direction

**What it should feel like:** a crew that shows up on time with clean equipment and leaves the edges sharp. It should feel hard-working, local and trustworthy. It is not a franchise and not a stock-photo template.

**Two named references. Every decision is checked against these:**

| Reference | What we take from it |
|---|---|
| **Commercial landscaping equipment.** The decals and spec plates on a zero-turn mower, a trailer-mounted blower, a fleet truck door. | Bold condensed uppercase type. High contrast. Flat color blocks with no gradients. Safety orange used only where something needs to be noticed. Labels that read like spec plates ("SERVICE AREA: FENTON · LINDEN · HOLLY"). |
| **A well-kept Michigan lawn in early fall.** Fresh mowing stripes, deep green grass, a maple just turning, morning light on a split-rail fence. | Deep evergreen as the main color. A warm off-white base like overcast October light, not a sterile white. Straight, even rhythm in the layout (stripes, not swirls). Photography does the seasonal work so the UI doesn't need leaf graphics. |

**Rules that follow from this**

- No leaf icons, sprouting-plant logos, grass-blade dividers or swoosh shapes. If it would fit any lawn company template, cut it.
- No gradients, glassmorphism or soft drop shadows. Use flat fills and hard edges, like painted steel.
- Corners are mostly square (2px radius at most). Pill buttons look like a SaaS product.
- Show real crew photos, real Fenton-area yards and real equipment. One honest phone photo of Tyler's trailer beats any stock image.
- Copy is short and direct, the way a foreman talks: "We mow, edge and blow every visit." Not "Elevate your outdoor living experience."

---

## 2. Color

One deep green, one warm neutral base, one bright accent. Orange is a signal, not a decoration.

### 2.1 Tokens

```css
:root {
  /* Evergreen: brand, header, dark sections */
  --evergreen-900: #0F2A1F;  /* darkest: header, footer, dark bands */
  --evergreen-700: #1D4030;  /* primary brand green: headings on light, secondary buttons */
  --evergreen-500: #3A6B50;  /* supporting: icons, borders on dark, success */
  --evergreen-100: #DDE7DE;  /* tint: selected states, tag fills */

  /* Warm off-white base: "October overcast" */
  --base:          #F5F0E6;  /* page background */
  --surface:       #FBF8F2;  /* cards, form fields */
  --stone-200:     #E4DACA;  /* dividers, alternate bands, input borders */
  --stone-600:     #6E6555;  /* captions, meta text (AA on base) */

  /* Ink */
  --ink:           #1A1D1A;  /* body text */
  --ink-muted:     #4B5049;  /* secondary text */

  /* Accent: equipment safety orange (use sparingly) */
  --safety-orange:     #FF6B1A;  /* CTA fills, call button, key highlights */
  --safety-orange-700: #B4470A;  /* the ONLY orange allowed as text on light backgrounds */

  /* Semantic */
  --color-bg:        var(--base);
  --color-text:      var(--ink);
  --color-heading:   var(--evergreen-900);
  --color-cta-bg:    var(--safety-orange);
  --color-cta-text:  var(--evergreen-900);
  --color-focus:     var(--evergreen-900);   /* on light backgrounds */
  --color-focus-dark:var(--safety-orange);   /* on evergreen backgrounds */
}
```

### 2.2 Contrast check (WCAG 2.2, computed)

| Foreground | Background | Ratio | Use |
|---|---|---|---|
| ink `#1A1D1A` | base | **14.98** | Body text ✅ AAA |
| ink-muted `#4B5049` | base | **7.27** | Secondary text ✅ AAA |
| stone-600 `#6E6555` | base | **5.06** | Captions ✅ AA |
| evergreen-900 | base | **13.48** | Headings ✅ AAA |
| evergreen-700 | base | **10.11** | Headings, links ✅ AAA |
| evergreen-500 | base | **5.44** | Icons, small labels ✅ AA |
| base | evergreen-900 | **13.48** | Text on dark bands ✅ AAA |
| evergreen-100 | evergreen-900 | **12.08** | Muted text on dark ✅ AAA |
| **evergreen-900 on safety-orange** | | **5.37** | **CTA label ✅ AA** |
| ink on safety-orange | | 5.97 | Alt CTA label ✅ AA |
| safety-orange | evergreen-900 | 5.37 | Orange text/icons on dark ✅ AA |
| safety-orange | evergreen-700 | 4.03 | Large text (24px+) only ⚠️ |
| safety-orange-700 | base | 4.81 | Orange text on light ✅ AA |
| ❌ white on safety-orange | | **2.85** | **Never.** Fails AA. |
| ❌ safety-orange on base | | **2.51** | **Never as text or focus ring.** |

**Hard rules**

1. **CTA buttons are safety orange with evergreen-900 text.** Never white text on orange. That is the most common way this palette fails accessibility.
2. Orange never appears as text on the off-white base. If orange text is needed on light, use `--safety-orange-700`.
3. Focus rings: evergreen-900 on light sections and safety orange on dark sections. Orange on base is only 2.51:1, below the 3:1 minimum for non-text elements.
4. **Orange budget:** at most about 5% of any viewport. In practice that means the call button, the main CTA, and maybe one highlight number. If two orange things compete in one screen, demote one to evergreen.

### 2.3 Where each color goes

| Area | Background | Text |
|---|---|---|
| Header (sticky) | evergreen-900 | base; call button is an off-white chip, "Get a free quote" is the orange |
| Hero | full-bleed photo with an evergreen-900 overlay band behind the text (solid, not gradient) | base |
| Standard sections | base | ink / evergreen-900 headings |
| Alternate sections | stone-200 *or* surface | ink |
| Proof strip / final CTA band | evergreen-900 | base, orange for the key number |
| Footer | evergreen-900 | evergreen-100 |

---

## 3. Typography

### 3.1 Families

**Recommended: Archivo** (Omnibus-Type, Google Fonts, OFL). It is one variable font with both a **width** axis (62–125) and a **weight** axis (100–900):

- **Headings:** Archivo at **width 62–75 (condensed), weight 800**, uppercase. This matches equipment-decal lettering: compact, heavy, readable from across a yard.
- **Body:** Archivo at **width 100, weight 400/500**. It is a clean, open grotesque that reads well at 17–18px on a phone in sunlight.

Why one family: condensed headings and normal-width body share the same skeleton, so the pairing can't clash. It is also **one font request**, which helps load time on rural Michigan LTE.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" rel="stylesheet">
```

```css
:root {
  --font-sans: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --font-display-stretch: 68%;   /* condensed */
}
h1, h2, h3, .display, .eyebrow, .btn {
  font-family: var(--font-sans);
  font-stretch: var(--font-display-stretch);
}
```

**Fallback pairing** (if the width axis gives trouble in a builder such as Webflow or Wix): **Barlow Condensed 700/800** for headings with **Barlow 400/500** for body. Barlow was drawn from California highway signage, so it keeps the same industrial feel.

**Do not use:** Oswald (overused on contractor templates), Bebas Neue (all-caps only and too thin at small sizes), any script or handwritten face, or any rounded "friendly" sans.

### 3.2 Scale

Fluid, mobile first. Headings are uppercase with slight positive tracking. Body text is sentence case.

| Token | Size (mobile → desktop) | Weight / width | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `--text-display` | `clamp(2.75rem, 7vw + 1rem, 5.5rem)` | 800 / 62% | 0.95 | 0.005em | Hero H1 only |
| `--text-h2` | `clamp(2rem, 3.5vw + 1rem, 3.25rem)` | 800 / 68% | 1.0 | 0.01em | Section headers |
| `--text-h3` | `clamp(1.375rem, 1vw + 1rem, 1.75rem)` | 700 / 75% | 1.1 | 0.01em | Card titles, service names |
| `--text-eyebrow` | `0.875rem` | 700 / 75% | 1.2 | 0.12em | Spec-plate labels above H2 |
| `--text-lead` | `clamp(1.125rem, 0.5vw + 1rem, 1.3125rem)` | 400 / 100% | 1.5 | 0 | Intro paragraphs |
| `--text-body` | `1.0625rem` (17px) | 400 / 100% | 1.6 | 0 | Body |
| `--text-small` | `0.875rem` | 500 / 100% | 1.5 | 0.01em | Captions, form help |

- Body measure: max **68ch**.
- Headings: `text-wrap: balance`. Body: `text-wrap: pretty`.
- Numbers in the proof strip and prices use `font-variant-numeric: tabular-nums`.

### 3.3 The "spec plate" eyebrow

This is the signature type detail, taken from equipment ID plates. It is a small condensed uppercase label with a 3px safety-orange bar on the left, placed above each H2:

```
▌ SERVICES · FENTON, MI
WEEKLY MOWING THAT LEAVES A STRIPE
```

```css
.eyebrow {
  font-size: var(--text-eyebrow);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--evergreen-700);
  border-left: 3px solid var(--safety-orange);
  padding-left: 0.6em;
}
```
(The orange bar is decorative, so the 3:1 non-text rule does not apply. The label text itself is evergreen.)

---

## 4. Layout and spacing

- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section padding:** 64px mobile / 96px desktop, top and bottom.
- **Container:** max 1200px, 20px gutters on mobile, 32px on desktop.
- **Grid:** 4 columns on mobile, 12 on desktop. Service cards are 1-up on mobile, 2-up on tablet and 3-up on desktop.
- **Rhythm:** sections alternate base and stone-200/surface backgrounds like **mowing stripes**: full-bleed bands with hard edges and no curved dividers.
- **Radius:** `--radius: 2px` everywhere. Photos have 0 radius.
- **Borders over shadows:** cards use `1px solid var(--stone-200)`. Hover changes the border to evergreen-700. Nothing floats.

---

## 5. Components

### 5.1 Buttons

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| **Primary** | safety-orange | evergreen-900 | none | "Get a Free Quote", "Call Now". **One per viewport.** |
| **Secondary** | transparent | evergreen-900 | 2px evergreen-900 | "See Services", "View Our Work" |
| **On dark** | transparent | base | 2px base | Secondary actions inside evergreen bands |

- Text is condensed uppercase, weight 700, tracking 0.06em.
- Minimum height **48px** and minimum width 48px (gloved thumbs, sunlight glare).
- Hover: primary **lightens** to `#FF8540` (6.33:1 with evergreen-900 text). Don't darken it: `#E85C0F` drops the label to 4.35:1 and fails AA. Secondary fills evergreen-900 with base text.
- Active: `translateY(1px)`. No scale bounce.
- Focus: `outline: 3px solid var(--color-focus); outline-offset: 3px;` (orange on dark sections).

### 5.2 Tap-to-call button (always visible)

- An `<a href="tel:+1810XXXXXXX">`. ⚠️ Replace with Tyler's real number. 810 is the Fenton area code.
- **Mobile:** a phone icon plus the word **CALL** in the header, as an off-white (base) chip with evergreen-900 text, 48×48px minimum. Orange stays reserved for "Get a free quote" so the two don't compete. The full number is shown below 360px only if it fits; otherwise the label alone.
- **Desktop:** phone icon + **(810) XXX-XXXX**, with the number written out so people can dial from another phone.
- It stays in the header at **both** header heights (see §6.1) and never collapses into the menu.
- `aria-label="Call Kolar Creek Lawn Care at (810) XXX-XXXX"`.

### 5.3 Header

- Background evergreen-900, logo on the left, nav in the center on desktop, **call button on the far right in every state**.
- Mobile: logo · call button · menu toggle (in that order, so the call button sits in the thumb zone, not hidden behind the menu).
- See §6.1 for the shrink behavior.

### 5.4 Service card

```
┌─────────────────────────────┐
│ [photo, 4:3, real job]      │
├─────────────────────────────┤
│ WEEKLY MOWING               │  ← h3, condensed
│ Mow, string-trim, edge and  │
│ blow off every visit.       │  ← body, 2–3 lines max
│ FROM $XX / VISIT →          │  ← small caps label, evergreen-700
└─────────────────────────────┘
```
Surface background, 1px stone-200 border, 2px radius. The whole card is the link. On hover the border becomes evergreen-700 and the arrow moves 4px right.

### 5.5 Proof strip

A full-bleed evergreen-900 band with 3 or 4 spec-plate stats in condensed type:

```
20+          FENTON           FULLY            SAME-WEEK
JOBS / MONTH  · LINDEN · HOLLY  INSURED          QUOTES
```
Numbers or key words are in base color at h2 size, labels in evergreen-100 eyebrow style. At most **one** value may be orange. ⚠️ Only list claims Tyler can back up (insured, years in business, review count).

### 5.6 Quote form

- Fields: name, phone, address/town, service (select), notes. **Five fields at most.**
- Labels sit above the fields (never placeholder-only). Inputs are 48px tall, surface fill, 1px stone-200 border, and the focus state is a 2px evergreen-900 border plus the focus ring.
- Submit uses the primary orange button. Under it, in small text: "Rather talk? Call (810) XXX-XXXX."

### 5.7 Iconography

Use **Lucide** or **Phosphor (Bold)** at a 2px stroke, in square-ish line style, colored evergreen-700. Only functional icons: phone, map pin, check, arrow, calendar. **No leaves, sprouts or decorative grass.**

### 5.8 Photography

- Real crew, real yards, real equipment. Shoot wide stripe shots in morning or late-afternoon light.
- Before/after pairs at the same angle.
- A light grade only: slightly warm, never oversaturated "Astroturf" green.
- Hero idea: a fresh-striped lawn with a maple starting to turn in the background, and the trailer or mower partly in frame.

---

## 6. Motion

The site's motion should feel like the business: efficient, no showing off. There are exactly **two** motion behaviors. Nothing else on the site animates on its own.

### 6.1 Sticky header that shrinks on scroll

| Property | At top | Scrolled (> 24px) |
|---|---|---|
| Height (mobile) | 64px | 56px |
| Height (desktop) | 88px | 64px |
| Logo height | 48px / 56px | 36px / 40px |
| Bottom border | none | 1px `rgba(245,240,230,0.12)` |
| Call button | visible, 48px | **visible, 48px (does not shrink below the tap target)** |

- **Trigger:** use an `IntersectionObserver` on a 1px sentinel at the top of the page, not a scroll listener. Toggle `.is-condensed` on the header.
- **Transition:** `height, padding` and logo `transform: scale()` at **200ms `cubic-bezier(0.2, 0, 0, 1)`**.
- **Layout:** the header is `position: sticky; top: 0`. Reserve the full header height so content doesn't jump when it shrinks.
- No hide-on-scroll-down. The header and call button **never leave the screen**.

```js
const header = document.querySelector('.site-header');
const sentinel = document.querySelector('.header-sentinel'); // 1px div at top of <body>
new IntersectionObserver(([e]) =>
  header.classList.toggle('is-condensed', !e.isIntersecting)
).observe(sentinel);
```

### 6.2 Scroll reveals on section headers only

- **Applies to:** the eyebrow + H2 block at the start of each section. **Nothing else.** Body copy, cards, photos, buttons, forms and the phone number never animate in.
- **Effect (a "mowing pass", not a fade-up):** the eyebrow's orange bar grows upward (`scaleY 0 → 1`, 260ms) as the label fades in. Then the H2 is wiped in left to right (`clip-path: inset(0 100% 0 0) → inset(0)`, **650ms `cubic-bezier(0.2, 0, 0, 1)`**, 140ms delay), like one stripe being cut.
- **Trigger:** `IntersectionObserver`, `threshold: 0.2`, `rootMargin: 0px 0px -10% 0px`. It **plays once** and does not reverse when scrolling back up.
- **Progressive enhancement:** headers are visible by default. JS adds `.reveal-ready` to `<html>` before hiding anything, so if JS fails, nothing stays invisible.
- The hero H1 does **not** reveal. It is visible on first paint (LCP).

```css
.reveal-ready .section-head { opacity: 0; transform: translateY(12px); }
.section-head.is-in {
  opacity: 1; transform: none;
  transition: opacity 400ms cubic-bezier(0.2,0,0,1), transform 400ms cubic-bezier(0.2,0,0,1);
}
```

### 6.3 Micro-interactions (allowed, not "motion")

Button and card hover color changes at 150ms ease-out. Card arrow nudges 4px. That's all.

### 6.4 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation: none !important; }
  .reveal-ready .section-head { opacity: 1; transform: none; }
}
```
The header still switches to its condensed state, but instantly, with no animation.

### 6.5 Not allowed

Parallax, autoplay carousels, counting-up numbers, staggered card cascades, cursor effects, Lottie leaves, page-load splash screens.

---

## 7. Accessibility and performance checklist

- [ ] All text pairs are on the approved list in §2.2. No white on orange, no orange on base.
- [ ] Tap targets are at least 48×48px. The call button stays at 48px in the condensed header.
- [ ] Focus is visible on every interactive element (evergreen ring on light, orange ring on dark).
- [ ] `tel:` link on every page, inside the header.
- [ ] One font family and one request, `display=swap`, with a preconnect.
- [ ] Hero image ≤ 200KB AVIF/WebP, with `fetchpriority="high"`. All other images use `loading="lazy"` with width/height set.
- [ ] Motion is limited to §6.1 and §6.2, and `prefers-reduced-motion` is respected.
- [ ] LocalBusiness / LandscapingBusiness schema includes the Fenton, MI address/service area and phone.

---

## 8. Validation notes

- **Palette:** every contrast ratio in §2.2 was calculated with the WCAG 2.x relative-luminance formula on the exact hex values above. If any hex changes, recheck. The CTA pairing (evergreen-900 on orange, 5.37:1) has the least margin.
- **Type pairing:** a condensed heavy display with a neutral grotesque body is a standard high-contrast pairing for trades and industrial brands. Using one superfamily (Archivo) avoids the mismatched-skeleton problem that two unrelated families can cause.
- **To confirm with Tyler:** phone number, service-area towns, insured/licensed status, starting prices, and whether he has crew or equipment photos (or needs a 1-hour shoot).
