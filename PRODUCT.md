# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two audiences, both confirmed: brand owners and founders of small and mid-size brands (D2C, spice and food, jewellery and fashion, real estate, education, hospitality and travel, Gulf retail, exporters, startups), and marketing managers at larger companies comparing studios. Both are deciding whether Parasya Pedia can make their brand films, ads and short-form content, and the main conversion is sending a brief through the contact page.

## Product Purpose
Marketing website for Parasya Pedia, an AI production studio in Thrissur, Kerala, India that makes AI-generated brand films, AI ads and AI short-form content. The site should make a visitor trust the studio enough to send a brief.

## Positioning
Human-directed and Kerala-rooted. AI generates every shot and ad, but a person directs the look, checks packs, colours and logos against the real product, and the client approves the brief, the frames and the final cut. Work is made in Kerala and delivered in Malayalam, Hindi, Tamil, Arabic or English.

## Operating Context
Visitors arrive with a product or an idea, not a finished brief. The studio turns a short brief plus product photos or a logo into a prompt and storyboard. Enquiries go out by email or WhatsApp.

## Capabilities and Constraints
- Three services: AI brand films, AI ads (five or more variations per concept), AI short-form content (hook variations in 9:16).
- Contact is email or WhatsApp only. The brief form has no backend of its own: it prepares the brief and hands off through FormSubmit email or WhatsApp, or the visitor copies it.
- Stack is existing React 18 + TypeScript + Vite with react-router; deployed with a SPA rewrite (vercel.json).
- Site details live in `src/config/site.ts` and content in `src/data/`.

## Brand Commitments
- Name: Parasya Pedia. Tagline: "Beyond the frame."
- Colour palette set by the user: background #F2F5FA, navy #1E3A6E, coral #F06449, soft blue #9FC2E8, text #16233F (see `src/styles/tokens.css`).
- Logo and favicon are in `public/brand/` and `public/favicon`.

## Evidence on Hand
- Per the README, the testimonial quotes, names and brands in `src/data/testimonials.ts` are invented placeholders and must be replaced with real, permissioned ones before launch. Do not present them as genuine.
- Product cards are illustrated concepts drawn with flat brand shapes, not delivered client work. No real client work or logos are on hand unless the user adds them.

## Product Principles
- Human direction over raw generation: the person is visible, not the model.
- True to the real product: show the check against the real pack, colour and logo.
- The client approves every stage.
- Rooted in Kerala, open to every language.
