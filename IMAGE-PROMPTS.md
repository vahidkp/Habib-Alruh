# Habib Alruh — Image Generation Prompts

A complete set of prompts for every image the website needs. Generate each in ChatGPT
(GPT-4o / DALL·E image generation), download, and drop into `public/images/` using the
**filename** noted for each image.

---

## How to use this doc

1. **Always prepend the _Global Style Preamble_** (below) to each individual prompt. It keeps
   the whole site visually consistent — same palette, lighting, and editorial mood.
2. Generate at the **aspect ratio** listed per image (tell ChatGPT e.g. _"aspect ratio 4:5,
   portrait"_). DALL·E supports `1024×1024` (1:1), `1024×1792` (portrait), `1792×1024`
   (landscape) — pick the closest and crop if needed.
3. **No text, no logos, no watermarks** in any generated image — the site overlays its own
   typography. This is stated in the preamble; keep it.
4. Save each file with the exact name given, then see _Wiring images into the code_ at the end.

---

## 🎨 Global Style Preamble (prepend to EVERY prompt)

> Editorial luxury perfume brand photography for "Habib Alruh", a premium artisanal fragrance
> house. Cinematic, high-end, magazine-quality. Warm, moody lighting with deep shadows and
> golden highlights. Restrained, sophisticated colour palette: rich near-black (#0A0A0A), warm
> ivory (#F5F0E8), antique gold (#C9A84C), burnt amber (#E8853A), muted taupe (#8C7B6B). Fine
> film grain, soft natural light, shallow depth of field, tactile premium materials (glass,
> brass, silk, stone, sand). Timeless and elegant, never cheap or saturated. **No text, no
> typography, no logos, no watermarks, no brand names anywhere in the image.** Photorealistic
> unless stated otherwise.

---

# 1. Homepage — Hero Carousel (3 slides)

Full-screen background images. **Aspect ratio: 16:9 landscape** (generate 1792×1024).
Compose with empty/darker space on the **left** so headline text stays readable.

### `hero-saffron.jpg`
> A moody, dramatic studio still life: a faceted amber-glass perfume bottle with a brushed-gold
> cap on a dark stone surface, wisps of saffron-red smoke curling around it, scattered saffron
> threads and a single dark rose. Deep black background, a single warm gold rim-light catching
> the glass. Luxurious, mysterious, cinematic. Negative space on the left third.

### `hero-silence.jpg`
> Vast golden desert sand dunes at dusk, low warm sun raking across the ridges casting long
> shadows, a faint haze of gold dust in the air. Minimal, serene, epic and quiet. A frosted
> sandstone-coloured perfume bottle resting partly buried in the sand in the lower-right. Empty
> sky on the left for text.

### `hero-bloom.jpg`
> Night-blooming white jasmine and tuberose flowers against a near-black background, dewdrops on
> the petals, a sculptural clear-glass perfume bottle nestled among them lit by a single soft
> beam of moonlight-gold. Intimate, sensual, dark-floral mood. Negative space upper-left.

---

# 2. Homepage — Signature Series (3 category cards)

**Aspect ratio: 3:4 portrait** (generate 1024×1792). These represent fragrance families.

### `sig-fresh.jpg`
> Fresh fragrance family mood: crisp citrus fruits, dewy green leaves, water droplets and a
> cool morning light, pale ivory and soft green tones with a touch of gold. Clean, airy,
> uplifting editorial still life.

### `sig-floral.jpg`
> Floral fragrance family mood: a soft romantic arrangement of damask roses, peonies and jasmine
> in warm blush and ivory tones, gentle backlight, dreamy and elegant. Petals and a hint of gold.

### `sig-woody.jpg`
> Woody fragrance family mood: cedar wood blocks, dried vetiver roots, smoky resin and sandalwood
> shavings on a dark surface with a curl of incense smoke, warm amber-gold light. Rich, masculine,
> grounding.

---

# 3. Homepage — Gift CTA (full-bleed banner)

**Aspect ratio: 16:9 landscape** (1792×1024). Darker on the left for white headline text.

### `gift-box.jpg`
> A luxurious wrapped gift set: an elegant perfume bottle beside a hand-tied gift box in deep
> charcoal paper with a gold satin ribbon, set on dark moody fabric with soft warm candlelight
> and bokeh in the background. Intimate, celebratory, premium. Shadowy negative space on the left.

---

# 4. Homepage — Shop by Gender (2 portraits)

**Aspect ratio: 3:4 portrait** (1024×1792). Shot in **black & white** (the site warms them on
hover). Editorial fashion-fragrance feel — model is implied, not the product focus.

### `gender-him-bw.jpg`
> Black-and-white editorial portrait of a refined man in soft profile, elegant tailoring,
> dramatic chiaroscuro lighting, holding or beside a perfume bottle. Timeless, confident, moody.
> High-contrast monochrome, fine grain. No colour.

### `gender-her-bw.jpg`
> Black-and-white editorial portrait of an elegant woman, graceful pose, soft directional light
> sculpting the face and shoulder, a perfume bottle nearby. Sensual, timeless, sophisticated.
> High-contrast monochrome, fine grain. No colour.

---

# 5. Homepage — Make Your Own Perfume (studio bento)

### `myop-studio.jpg` — **Aspect ratio: 16:10 landscape** (1792×1024)
> Interior of a luxury perfume atelier / blending studio: rows of amber apothecary bottles on
> brass shelves, a marble workbench with droppers and blotter strips, warm pendant lighting,
> dark walls. Artisanal, intimate, high-end laboratory ambience.

### `myop-bottle.jpg` — **Aspect ratio: 4:3** (1024×768), product isolated
> A single elegant clear-glass perfume bottle with a gold collar and minimalist stopper,
> isolated on a clean soft-ivory studio background with gentle gradient shadow. Crisp product
> photography, soft reflection beneath. Bright, premium, catalogue-style.

---

# 6. Homepage — Brand Story (atelier portrait)

### `brand-atelier.jpg` — **Aspect ratio: 4:5 portrait** (1024×1280)
> A perfumer's hands gently holding a glass blotter to the light in a warm, dim atelier; in soft
> focus behind, shelves of amber ingredient bottles and dried botanicals. Artisanal craft,
> storytelling warmth, golden ambient light, shallow depth of field.

---

# 7. Homepage — Journal / Blog (2 article images)

**Aspect ratio: 16:10 landscape** (1792×1024).

### `journal-saffron.jpg`
> Overhead editorial flat-lay of vivid red saffron threads spilling from a small brass dish onto
> dark slate, scattered around a perfume bottle, warm side light. Rich, painterly, ingredient-focused.

### `journal-layering.jpg`
> Two perfume bottles of different sizes side by side on a marble ledge with soft morning light
> and long shadows, a folded linen cloth nearby. Calm, instructional, lifestyle editorial mood.

---

# 8. Product Listing Page — Collection Hero

### `plp-hero.jpg` — **Aspect ratio: 21:9 ultra-wide banner** (1792×1024, will be cropped)
> A wide cinematic row of assorted luxury perfume bottles in amber, gold and clear glass arranged
> on a dark reflective surface, dramatic warm spotlighting fading into shadow at the edges.
> Opulent, gallery-like. Darkened overall so white text reads on top.

---

# 9. Product Images (12 products × gallery)

Each product needs **4 gallery images** + **1 scent-story background**. Use the filename stems
below. **Gallery aspect ratio: 4:5 portrait** (1024×1280). **Story background: 16:9 landscape**,
dark and atmospheric.

For each product, the 4 gallery angles follow the same pattern — vary only the scene:
- `-1` Hero studio shot of the bottle (main)
- `-2` Close-up macro / detail of cap and glass
- `-3` Lifestyle / in-context with its key ingredients
- `-4` Flat-lay with the raw fragrance notes

> **Tip:** You can generate all 4 in one ChatGPT request by asking for "4 variations" of the
> product, or run the per-angle prompt 4 times. Keep the bottle design _consistent_ within a
> product by reusing the first image as a reference ("same bottle as before, different angle").

---

### 1. Saffron Noir — `saffron-noir-100ml` (Oriental · smoke, saffron, oud, amber)
- **Bottle design cue:** dark amber-tinted faceted glass, matte-black & brushed-gold cap.
- `saffron-noir-100ml-1.jpg` — Hero shot on black stone, single gold rim light, faint red smoke.
- `saffron-noir-100ml-2.jpg` — Macro of the brushed-gold cap and faceted glass shoulder, dewy.
- `saffron-noir-100ml-3.jpg` — Bottle among saffron threads, a dark rose and a piece of oud wood.
- `saffron-noir-100ml-4.jpg` — Overhead flat-lay: saffron, leather swatch, amber resin, oud chips.
- `saffron-noir-100ml-story.jpg` — Dark atmospheric scene of saffron smoke and gold light. *(16:9)*

### 2. Born from Silence — `born-from-silence-50ml` (Woody · cedar, vetiver, sandalwood)
- **Cue:** sandstone-frosted glass, warm matte-gold cap.
- `born-from-silence-50ml-1.jpg` — Bottle half-buried in golden desert sand at dusk, long shadow.
- `born-from-silence-50ml-2.jpg` — Macro of frosted glass texture with sand grains and gold light.
- `born-from-silence-50ml-3.jpg` — Bottle on a dune ridge with cedar wood and dried vetiver roots.
- `born-from-silence-50ml-4.jpg` — Flat-lay: sand, cedar blocks, vetiver, sandalwood shavings.
- `born-from-silence-50ml-story.jpg` — Vast moody desert dunes at golden hour, hazy. *(16:9)*

### 3. Desert Rose — `desert-rose-50ml` (Floral · damask rose, peony, amber)
- **Cue:** blush-pink tinted glass, soft gold collar.
- `desert-rose-50ml-1.jpg` — Bottle on warm sand surrounded by fresh damask rose petals.
- `desert-rose-50ml-2.jpg` — Macro of pink glass and gold collar with a single rose petal.
- `desert-rose-50ml-3.jpg` — Bottle with blooming roses and peonies in warm blush light.
- `desert-rose-50ml-4.jpg` — Flat-lay: rose petals, lychee, pink peppercorns, amber resin.
- `desert-rose-50ml-story.jpg` — Soft romantic field of roses at dusk, dreamy haze. *(16:9)*

### 4. Citrus Veil — `citrus-veil-30ml` (Citrus · lemon, grapefruit, neroli)
- **Cue:** clear crystal glass, pale-gold cap, bright and fresh.
- `citrus-veil-30ml-1.jpg` — Bottle on a sunlit ivory surface with sliced lemon and grapefruit.
- `citrus-veil-30ml-2.jpg` — Macro of clear glass with citrus reflections and water droplets.
- `citrus-veil-30ml-3.jpg` — Bottle among neroli blossoms and fresh citrus leaves, airy light.
- `citrus-veil-30ml-4.jpg` — Flat-lay: lemon, grapefruit, neroli flowers, cedar sprig.
- `citrus-veil-30ml-story.jpg` — Bright sunlit citrus orchard mood, warm and luminous. *(16:9)*

### 5. Velvet Oud — `velvet-oud-100ml` (Woody · oud, rose, leather, amber · limited)
- **Cue:** deep oxblood-tinted glass, antique-gold ornate cap.
- `velvet-oud-100ml-1.jpg` — Bottle on dark velvet with a single dramatic gold light.
- `velvet-oud-100ml-2.jpg` — Macro of the ornate antique-gold cap and rich red glass.
- `velvet-oud-100ml-3.jpg` — Bottle with oud wood chips, a dark rose and a leather swatch.
- `velvet-oud-100ml-4.jpg` — Flat-lay: oud chips, saffron, plum, amber resin on dark velvet.
- `velvet-oud-100ml-story.jpg` — Opulent dark scene, smoky oud and deep red velvet. *(16:9)*

### 6. Morning Bloom — `morning-bloom-50ml` (Floral · jasmine, lily, musk)
- **Cue:** frosted white glass, soft silver-gold cap.
- `morning-bloom-50ml-1.jpg` — Bottle among fresh white jasmine and lilies in soft dawn light.
- `morning-bloom-50ml-2.jpg` — Macro of frosted glass with dewdrops and a white petal.
- `morning-bloom-50ml-3.jpg` — Bottle on a dewy garden table with green leaves and blossoms.
- `morning-bloom-50ml-4.jpg` — Flat-lay: jasmine, lily, mandarin, green leaves on ivory.
- `morning-bloom-50ml-story.jpg` — Misty white-flower garden at sunrise, fresh and luminous. *(16:9)*

### 7. Cedar Haze — `cedar-haze-100ml` (Woody · cedar, cypress, vetiver)
- **Cue:** smoky grey-green tinted glass, dark bronze cap.
- `cedar-haze-100ml-1.jpg` — Bottle on weathered wood with a soft curl of incense smoke.
- `cedar-haze-100ml-2.jpg` — Macro of smoky glass and bronze cap with haze and warm light.
- `cedar-haze-100ml-3.jpg` — Bottle among cedar and cypress branches, juniper berries.
- `cedar-haze-100ml-4.jpg` — Flat-lay: cedar blocks, cypress sprigs, vetiver, amber.
- `cedar-haze-100ml-story.jpg` — Foggy cedar forest at dawn, calm and smoky. *(16:9)*

### 8. Amber Reverie — `amber-reverie-50ml` (Oriental · amber, vanilla, tonka)
- **Cue:** glowing honey-amber glass, warm gold cap.
- `amber-reverie-50ml-1.jpg` — Bottle glowing on dark surface with warm amber backlight.
- `amber-reverie-50ml-2.jpg` — Macro of amber glass catching golden light, soft caramel tones.
- `amber-reverie-50ml-3.jpg` — Bottle with amber resin chunks, vanilla pods and tonka beans.
- `amber-reverie-50ml-4.jpg` — Flat-lay: amber resin, vanilla, tonka, pink peppercorns.
- `amber-reverie-50ml-story.jpg` — Warm golden glowing abstract amber light scene. *(16:9)*

### 9. Sea Salt Aria — `sea-salt-aria-30ml` (Fresh · sea salt, sage, driftwood)
- **Cue:** pale aqua-clear glass, matte-silver cap.
- `sea-salt-aria-30ml-1.jpg` — Bottle on smooth wet pebbles with a fine sea mist, cool light.
- `sea-salt-aria-30ml-2.jpg` — Macro of clear glass with water droplets and salt crystals.
- `sea-salt-aria-30ml-3.jpg` — Bottle with driftwood, sage leaves and coarse sea salt.
- `sea-salt-aria-30ml-4.jpg` — Flat-lay: sea salt, sage, lavender, driftwood on pale stone.
- `sea-salt-aria-30ml-story.jpg` — Cool misty coastline at dawn, fresh and airy. *(16:9)*

### 10. Midnight Jasmine — `midnight-jasmine-100ml` (Floral · jasmine sambac, tuberose · bestseller, limited)
- **Cue:** deep midnight-blue/black glass, polished gold cap.
- `midnight-jasmine-100ml-1.jpg` — Bottle against near-black with white jasmine and a gold beam.
- `midnight-jasmine-100ml-2.jpg` — Macro of dark glass and gold cap, dewy jasmine petal.
- `midnight-jasmine-100ml-3.jpg` — Bottle among night-blooming jasmine and tuberose, moonlight.
- `midnight-jasmine-100ml-4.jpg` — Flat-lay: jasmine, tuberose, black currant, pear on dark.
- `midnight-jasmine-100ml-story.jpg` — Night garden of glowing white flowers in darkness. *(16:9)*

### 11. Green Fig — `green-fig-30ml` (Fresh · fig leaf, fig, coconut milk)
- **Cue:** soft green-tinted glass, cream-gold cap.
- `green-fig-30ml-1.jpg` — Bottle on a sunlit table with fresh figs and green fig leaves.
- `green-fig-30ml-2.jpg` — Macro of green glass with a sliced fig and dewy leaf.
- `green-fig-30ml-3.jpg` — Bottle in dappled orchard light among fig branches.
- `green-fig-30ml-4.jpg` — Flat-lay: figs, fig leaves, lemon, cedar on ivory linen.
- `green-fig-30ml-story.jpg` — Sunlit Mediterranean fig orchard, fresh green light. *(16:9)*

### 12. Royal Tobacco — `royal-tobacco-100ml` (Oriental · tobacco leaf, honey, tonka · limited)
- **Cue:** rich cognac-brown glass, ornate dark-gold cap.
- `royal-tobacco-100ml-1.jpg` — Bottle on dark leather with a warm amber spotlight, regal mood.
- `royal-tobacco-100ml-2.jpg` — Macro of the ornate gold cap and deep cognac glass.
- `royal-tobacco-100ml-3.jpg` — Bottle with dried tobacco leaves, a honey dipper and spices.
- `royal-tobacco-100ml-4.jpg` — Flat-lay: tobacco leaf, cinnamon, honeycomb, tonka beans.
- `royal-tobacco-100ml-story.jpg` — Dim opulent study, leather, smoke and amber light. *(16:9)*

---

# 10. (Optional) Press logos

Section 11 "As Seen In" currently uses styled text, not images. If you want real press logos,
source the actual publication logos (Vogue, GQ, ELLE, etc.) rather than generating them —
AI-generated brand logos won't be legitimate.

---

# Wiring images into the code

The site currently renders deterministic gradient placeholders via the `EditorialImage`
component, keyed by a `seed`. To use your generated photos instead:

1. Put all files in **`public/images/`** (create the folder).
2. The filenames above match the `seed` / product `slug` values already used in the code, so
   the simplest swap is to update **`components/ui/EditorialImage.tsx`** to render a real
   `next/image` when a matching file exists, e.g. map `seed` → `/images/${seed}.jpg`.
3. For product galleries, the PDP already builds gallery seeds as
   `slug`, `slug-2`, `slug-3`, `slug-4` — rename your files to
   `slug-1/-2/-3/-4` (or adjust the gallery array in `components/pdp/ProductHero.tsx`).
4. Product cards/grids use the bare `slug` as the main image — point those at `slug-1.jpg`.

> Ask me and I'll refactor `EditorialImage` into a real `next/image` wrapper (with the gradient
> as the loading fallback) and rewire the gallery naming so every file above is picked up
> automatically.

---

## Quick checklist (counts)

| Group | Images |
|---|---|
| Hero carousel | 3 |
| Signature Series | 3 |
| Gift CTA | 1 |
| Shop by Gender | 2 |
| Make Your Own Perfume | 2 |
| Brand Story | 1 |
| Journal | 2 |
| PLP hero | 1 |
| Products (12 × 5) | 60 |
| **Total** | **75** |
