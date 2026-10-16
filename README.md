# Parasya Pedia website

Marketing website for **Parasya Pedia**, an AI studio that makes AI-generated brand films, ads and social content. Built with **React 18 + TypeScript + Vite**, with one `.tsx` and one `.css` file per page and component.

> Beyond the frame.

---

## 1. Quick start in VS Code

1. Install **Node.js 18 or newer** (https://nodejs.org). Check with `node -v`.
2. In VS Code choose **File > Open Folder** and open the `parasya-pedia` folder.
3. When VS Code asks to install the recommended extensions (Prettier, ES7 React snippets), click **Install**.
4. Open the terminal (**Ctrl + `**) and run:

```bash
npm install     # one time: downloads the dependencies
npm run dev     # starts the site at http://localhost:5173
```

The page reloads as you save files. Stop the server with **Ctrl + C**.

You can also press **Ctrl + Shift + B** to run the "Start dev server" task, or **F5** (with the dev server running) to debug in Chrome.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run typecheck` | Checks all TypeScript without building |
| `npm run build` | Type-checks, then creates the production site in `dist/` |
| `npm run preview` | Serves the `dist/` build locally to test it |

---

## 2. Before you launch: replace the placeholders

| What | Where | Notes |
|---|---|---|
| Email, WhatsApp, Instagram, location | `src/config/site.ts` | Read by the header menu, footer, contact page and contact form. WhatsApp is hidden while empty. |
| Testimonials | `src/data/testimonials.ts` | **The six quotes, names and brands are invented placeholders.** Replace them with real Kerala clients' quotes, names and brands (with permission) before launch. |
| Product concepts | `src/data/offerings.ts` | The service cards, drawn with flat brand shapes. Edit as your offering changes. |
| Services, FAQ, principles | `src/data/services.ts`, `faq.ts`, `principles.ts` | Check every claim (languages, formats) is true for your studio. |
| Page titles | `src/data/routes.ts` | Browser tab titles and the page names in the menu. |
| Logo and favicon | `public/brand/`, `public/favicon.png` | Cut from `brand-assets/logo1.png`. The P and the wordmark are masks, so they take the page colours. |

The contact form has **no backend**. It prepares the brief and lets the visitor send it by email or WhatsApp, or copy it. If you want submissions stored, connect a form service (Formspree, Netlify Forms, your own API) in `src/components/contact/BriefForm/BriefForm.tsx`.

---

## 3. Folder structure

```text
parasya-pedia/
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── brand-assets/
│   ├── logo1.png
│   └── logo2.png
├── public/
│   ├── brand/
│   │   ├── logo-mark.png
│   │   └── logo-wordmark.png
│   ├── fonts/
│   │   ├── GeistPixel-OFL.txt
│   │   └── GeistPixel-Square.woff2
│   ├── G · Prompt to frame-html/
│   │   ├── assets/
│   │   │   └── 98a45539e2093f6e551105e703aa8347.png
│   │   ├── vendor/
│   │   │   ├── react-dom.js
│   │   │   └── react.js
│   │   ├── G-Prompt-to-frame.dc.html
│   │   ├── README.md
│   │   └── support.js
│   ├── Geist_Pixel/
│   │   ├── GeistPixel-Regular-VariableFont_ELSH.ttf
│   │   ├── OFL.txt
│   │   └── README.txt
│   ├── I · Director viewfinder-html/
│   │   ├── assets/
│   │   │   └── 98a45539e2093f6e551105e703aa8347.png
│   │   ├── vendor/
│   │   │   ├── react-dom.js
│   │   │   └── react.js
│   │   ├── I-Director-viewfinder.dc.html
│   │   ├── README.md
│   │   └── support.js
│   ├── mascots/
│   │   ├── crt-directions.webp
│   │   └── crt-reactions.webp
│   ├── _redirects
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── about/
│   │   │   ├── FlipCard/
│   │   │   │   ├── FlipCard.css
│   │   │   │   └── FlipCard.tsx
│   │   │   └── StackedBeliefs/
│   │   │       ├── StackedBeliefs.css
│   │   │       └── StackedBeliefs.tsx
│   │   ├── contact/
│   │   │   └── BriefForm/
│   │   │       ├── BriefForm.css
│   │   │       └── BriefForm.tsx
│   │   ├── layout/
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.css
│   │   │   │   └── Footer.tsx
│   │   │   ├── Header/
│   │   │   │   ├── Header.css
│   │   │   │   └── Header.tsx
│   │   │   ├── Layout/
│   │   │   │   ├── Layout.css
│   │   │   │   └── Layout.tsx
│   │   │   ├── Loader/
│   │   │   │   ├── Loader.css
│   │   │   │   └── Loader.tsx
│   │   │   ├── MobileMenu/
│   │   │   │   ├── MobileMenu.css
│   │   │   │   └── MobileMenu.tsx
│   │   │   ├── PageTransition/
│   │   │   │   ├── PageTransition.css
│   │   │   │   └── PageTransition.tsx
│   │   │   ├── ScrollProgress/
│   │   │   │   ├── ScrollProgress.css
│   │   │   │   └── ScrollProgress.tsx
│   │   │   └── Toast/
│   │   │       ├── Toast.css
│   │   │       └── Toast.tsx
│   │   ├── services/
│   │   │   ├── CardSwap/
│   │   │   │   ├── CardSwap.css
│   │   │   │   └── CardSwap.tsx
│   │   │   ├── FlexCarousel/
│   │   │   │   ├── FlexCarousel.css
│   │   │   │   └── FlexCarousel.tsx
│   │   │   ├── ProjectModal/
│   │   │   │   ├── ProjectModal.css
│   │   │   │   └── ProjectModal.tsx
│   │   │   ├── ServiceCardSwap/
│   │   │   │   ├── ServiceCardSwap.css
│   │   │   │   └── ServiceCardSwap.tsx
│   │   │   └── ServiceStack/
│   │   │       ├── ServiceStack.css
│   │   │       └── ServiceStack.tsx
│   │   ├── testimonials/
│   │   │   ├── TestimonialBook/
│   │   │   │   ├── TestimonialBook.css
│   │   │   │   └── TestimonialBook.tsx
│   │   │   └── TestimonialSlider/
│   │   │       ├── TestimonialSlider.css
│   │   │       └── TestimonialSlider.tsx
│   │   └── ui/
│   │       ├── Accordion/
│   │       │   ├── Accordion.css
│   │       │   └── Accordion.tsx
│   │       ├── Button/
│   │       │   ├── Button.css
│   │       │   ├── Button.tsx
│   │       │   └── RoundButton.tsx
│   │       ├── CtaBand/
│   │       │   ├── CtaBand.css
│   │       │   └── CtaBand.tsx
│   │       ├── FilterChips/
│   │       │   ├── FilterChips.css
│   │       │   └── FilterChips.tsx
│   │       ├── Icons/
│   │       │   ├── Icons.css
│   │       │   └── Icons.tsx
│   │       ├── Logo/
│   │       │   ├── Logo.css
│   │       │   └── Logo.tsx
│   │       ├── Marquee/
│   │       │   ├── Marquee.css
│   │       │   └── Marquee.tsx
│   │       ├── Mascot/
│   │       │   ├── Mascot.css
│   │       │   ├── Mascot.tsx
│   │       │   └── mascotStore.ts
│   │       ├── PageHeader/
│   │       │   ├── PageHeader.css
│   │       │   └── PageHeader.tsx
│   │       ├── ScrubText/
│   │       │   ├── ScrubText.css
│   │       │   └── ScrubText.tsx
│   │       ├── Shapes/
│   │       │   ├── Shapes.css
│   │       │   └── Shapes.tsx
│   │       ├── TitleReveal/
│   │       │   ├── TitleReveal.css
│   │       │   └── TitleReveal.tsx
│   │       └── TransitionLink/
│   │           └── TransitionLink.tsx
│   ├── config/
│   │   └── site.ts
│   ├── context/
│   │   ├── ProjectModalContext.tsx
│   │   ├── ToastContext.tsx
│   │   └── TransitionContext.tsx
│   ├── data/
│   │   ├── clients.ts
│   │   ├── decos.ts
│   │   ├── faq.ts
│   │   ├── filters.ts
│   │   ├── offerings.ts
│   │   ├── principles.ts
│   │   ├── routes.ts
│   │   ├── services.ts
│   │   └── testimonials.ts
│   ├── hooks/
│   │   ├── pointerStore.ts
│   │   ├── useBodyLock.ts
│   │   ├── useFadeFilter.ts
│   │   ├── useFinePointer.ts
│   │   ├── useFitText.ts
│   │   ├── useInView.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useNavVisibility.ts
│   │   ├── usePointerMotion.ts
│   │   ├── useReducedMotion.ts
│   │   ├── useSmoothScroll.ts
│   │   └── useTouchHover.ts
│   ├── pages/
│   │   ├── About/
│   │   │   ├── About.css
│   │   │   └── About.tsx
│   │   ├── Contact/
│   │   │   ├── Contact.css
│   │   │   └── Contact.tsx
│   │   ├── Home/
│   │   │   ├── sections/
│   │   │   │   ├── ClientsStrip/
│   │   │   │   │   ├── ClientsStrip.css
│   │   │   │   │   └── ClientsStrip.tsx
│   │   │   │   ├── FeaturedServices/
│   │   │   │   │   ├── FeaturedServices.css
│   │   │   │   │   └── FeaturedServices.tsx
│   │   │   │   ├── Hero/
│   │   │   │   │   ├── PromptToFrame/
│   │   │   │   │   │   ├── PromptToFrame.css
│   │   │   │   │   │   ├── PromptToFrame.tsx
│   │   │   │   │   │   └── tiles.ts
│   │   │   │   │   ├── Hero.css
│   │   │   │   │   └── Hero.tsx
│   │   │   │   ├── Intro/
│   │   │   │   │   ├── DirectorViewfinder/
│   │   │   │   │   │   ├── DirectorViewfinder.css
│   │   │   │   │   │   ├── DirectorViewfinder.tsx
│   │   │   │   │   │   └── wave.ts
│   │   │   │   │   ├── Intro.css
│   │   │   │   │   └── Intro.tsx
│   │   │   │   ├── TestimonialPreview/
│   │   │   │   │   └── TestimonialPreview.tsx
│   │   │   │   └── Ticker/
│   │   │   │       ├── Ticker.css
│   │   │   │       └── Ticker.tsx
│   │   │   └── Home.tsx
│   │   ├── NotFound/
│   │   │   ├── NotFound.css
│   │   │   └── NotFound.tsx
│   │   ├── Services/
│   │   │   ├── Services.css
│   │   │   └── Services.tsx
│   │   └── Testimonials/
│   │       ├── Testimonials.css
│   │       └── Testimonials.tsx
│   ├── styles/
│   │   ├── animations.css
│   │   ├── base.css
│   │   ├── fonts.css
│   │   ├── layout.css
│   │   └── tokens.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── cardArt.ts
│   │   ├── clipboard.ts
│   │   ├── cx.ts
│   │   ├── links.ts
│   │   ├── math.ts
│   │   └── shapes.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── .prettierrc
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

### How the code is organised

Every component and page lives in its own folder, with its `.tsx` and `.css` side by side and named the same (for example `components/ui/Button/Button.tsx` and `Button.css`).

- **`pages/`** – one folder per route (`Home`, `About`, `Services`, `Testimonials`, `Contact`, `NotFound`). A page file only composes components and reads data. The Home page is split into `sections/` (`Hero`, `Ticker`, `Intro`, `FeaturedServices`, `ClientsStrip`, `TestimonialPreview`), each with its own folder and CSS.
- **`components/layout/`** – things that wrap every page: `Layout` (the shell), `Header`, `MobileMenu`, `Footer`, `Loader`, `PageTransition`, `ScrollProgress`, `Toast`.
- **`components/ui/`** – small reusable building blocks: `Button`, `Accordion`, `Marquee`, `FilterChips`, `TitleReveal`, `PageHeader`, `CtaBand`, `Shapes`, `ScrubText`, `Icons`, `Logo` and the `Mascot`.
- **`components/services|testimonials|contact|about/`** – feature components used by one or two pages.
- **`data/`** – all copy and artwork as typed data. Edit content here, not inside components.
- **`context/`** – shared state: page transition, project modal, toast.
- **`hooks/`** – reusable behaviour: in-view detection, pointer parallax, smooth scroll, scroll header, body lock, fit-to-width text and more.
- **`styles/`** – global CSS only: tokens, base, layout helpers, keyframes. Everything else is styled next to its component.
- **`types/`** and **`utils/`** – shared TypeScript types and small helpers.
- **`public/`** – files served as they are: the logo pieces in `brand/`, the mascot sheets in `mascots/`, the favicon.
- **`brand-assets/`** – the original logo sheets (`logo1.png`, `logo2.png`). Not used by the site; kept as the source.
- **`@/`** is a shortcut for `src/`, so imports look like `import { Button } from '@/components/ui/Button/Button'`.

---

## 4. Pages and routes

| Route | Page | File |
|---|---|---|
| `/` | Home | `src/pages/Home/Home.tsx` |
| `/about` | About us | `src/pages/About/About.tsx` |
| `/services` | Services (supports `?type=AI%20ad`; `/products` redirects here) | `src/pages/Services/Services.tsx` |
| `/testimonials` | Testimonials | `src/pages/Testimonials/Testimonials.tsx` |
| `/contact` | Contact | `src/pages/Contact/Contact.tsx` |
| `*` | Not found | `src/pages/NotFound/NotFound.tsx` |

Navigation uses `TransitionLink` (and `Button to="..."`), which plays the orange "scene cut" between pages. Use these instead of a plain `<a>` for internal links.

### Add a new page

1. Create `src/pages/Pricing/Pricing.tsx` and `Pricing.css`.
2. Start it with `<PageHeader title={['Pricing.']} lede="..." deco="about" />` (pick a `deco` from `src/data/decos.ts`, or add one).
3. Add `<Route path="pricing" element={<Pricing />} />` in `src/App.tsx`.
4. Add `{ path: '/pricing', label: 'Pricing', title: 'Pricing | Parasya Pedia' }` to `ROUTES` in `src/data/routes.ts`. The header, mobile menu, footer and page titles update automatically.

---

## 5. Design system (Brand Identity 2026)

Colours are CSS variables in `src/styles/tokens.css`.

| Token | Hex | Role |
|---|---|---|
| `--parchment` | `#F6F2EA` | Page |
| `--stone-soft` | `#E9E5DA` | Panels on the page |
| `--midnight`, `--ink` | `#0F0F0E` | Text and dark background |
| `--ember` | `#FF5826` | Brand (dark text on it passes at 6.1:1; on the page it is for shapes only) |
| `--saffron` | `#FFB224` | Sun (shapes only, no text on the page background) |
| `--sand` | `#D9D2C5` | Stone |

Fonts (loaded from Google Fonts in `index.html`): **Outfit** (the closest match to the logo wordmark) for headlines and body, **Geist Pixel** (self-hosted from `public/fonts`) for the accent lines, **Anek Malayalam** for Malayalam text.

Brand rules followed in the code: flat colour and bold shapes (no gradients or glows), one headline per section, one four-point star as the recurring "spark", and sections that rotate Midnight, Parchment, Saffron, Ember and Sand. Section background classes are `s-dark`, `s-light`, `s-saffron`, `s-ember`, `s-sand` (`src/styles/layout.css`).

### Flat artwork (`Shapes`)

Service art, page-header art and the About icons are not images. They are lists of shapes in `src/data/*.ts`, built with two helpers from `src/utils/shapes.ts`:

```ts
box(x, y, w, h, 'saffron', '50%', 'pu')   // rectangle or circle
star(x, y, size, 'ember', 'sp')           // the brand star
```

Units are `cqw` (1% of the container's width), so the artwork scales with its card. The last argument adds a motion class: `fl` floats, `sp` spins, `pu` pulses.

---

## 6. Motion and accessibility

- The opening title card, hero headline, page transitions, marquee speed-up on scroll, scroll-lit text, flip cards, sliders and filters are all built in (no animation library).
- **Reduced motion** is respected: with "reduce motion" on, the loader, page transition, header art drift, marquee, autoplay and scroll effects switch off.
- The header art drift only runs for mouse users (`hover: hover` and `pointer: fine`). The hero prompt-to-frame panel stays still; only the sequence inside it plays.
- Keyboard: skip link, visible focus rings, focus moves to the page heading after navigation, the modal traps focus and closes with Escape, accordions and sliders are buttons with ARIA state.
- Safe-area insets are handled for phones with notches (`viewport-fit=cover`).

---

## 7. Deploying

`npm run build` creates a static site in `dist/`. Upload that folder to any static host.

The site uses clean URLs (`/about`), so the host must send every path to `index.html`. This is already set up for:

- **Netlify** – `public/_redirects`
- **Vercel** – `vercel.json`
- **Cloudflare Pages** – works out of the box for single-page apps

For a host with no rewrite option (some shared hosting, GitHub Pages), switch to hash URLs (`/#/about`): in `src/App.tsx` replace `BrowserRouter` with `HashRouter`.

### Adding real videos

The earlier showreel section was removed. To add video later, put files in `public/videos/` and reference them as `/videos/your-file.mp4` in a `<video controls playsInline poster="...">`. Keep files small (compress to H.264 MP4) or host them on a video service and embed the player.

---

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| `npm: command not found` | Install Node.js, then reopen VS Code. |
| Port 5173 is busy | Vite picks the next free port and prints it. |
| Fonts look different offline | The fonts load from Google Fonts. Download them and use `@font-face` for fully offline use. |
| Type errors after editing data | Run `npm run typecheck`. Types live in `src/types/index.ts`. |
| A page 404s after deploying | The host needs the single-page-app rewrite (see Deploying). |
