# Fonts — Round 8 (Atípo Foundry)

The site's **display typeface** (all headings, product names, the HABIB ALRUH wordmark)
is set to **Round 8**. It self-hosts from this folder.

## To activate it

1. Download Round 8 from the official source (choose a paid tier for the commercial
   licence if this store goes live): https://www.atipofoundry.com/fonts/round-8
2. Pick **one weight** (a mid weight like "Round 8 Five" or "Six" reads well for headings).
3. Put the file here as **`round-8.woff2`** (preferred) — or `round-8.otf` also works.
   - `public/fonts/round-8.woff2`
4. Refresh. Every display heading switches to Round 8 automatically.

Until a file is present, headings fall back to Playfair Display, so the site keeps working.

## Notes

- Round 8 is **all-caps**, so headlines render in capitals once active. That's expected.
- Want multiple weights (e.g. a lighter hero + bolder labels)? Add `round-8-bold.woff2`
  and tell me — I'll extend the `@font-face` rules in `app/globals.css`.
- If lowercase letters show as missing boxes, tell me and I'll force `text-transform:
  uppercase` on headings (some all-caps fonts don't map lowercase codepoints).
