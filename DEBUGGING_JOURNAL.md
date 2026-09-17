# Debugging journal

Three bugs were planted in the product catalog on purpose, one commit each, then hunted down and fixed with browser tools. They're numbered in the order they surfaced, because each one hid the next: the crash blanked the whole page, and the network failure stopped any product cards from rendering, so the wrong sale price only showed up once both were fixed.

| # | Bug | Symptom | Tool that found it | Planted | Fixed | Did `tsc` flag it? |
|---|-----|---------|--------------------|---------|-------|--------------------|
| 1 | Crash: `.map()` on null state | Blank page | Sources panel breakpoint | `bef3cd3` | `f25fece` | No |
| 2 | Network failure: misspelled URL | "Couldn't load products" | Network tab | `eb9567d` | `4017e9a` | No |
| 3 | Silent wrong value: misspelled prop name | Sale items at full price | React DevTools (Components) | `4ab96c7` | `0314b13` | Yes, but `vite dev` doesn't run it |

## Bug 1: Crash from `.map()` on null state

**Symptom:** The whole page went blank. Nothing rendered inside `#root`, not even the header.

**Console said:** `Uncaught TypeError: Cannot read properties of null (reading 'map')`. That names the failing call but not why `products` was null. Did the fetch return null? Did something clear the list?

**Tool:** Chrome DevTools → **Sources** → line breakpoint on `src/components/ProductCatalog.tsx:55` (`const publicProducts = products!.map(toPublicProduct)`), then reload.

**What it showed:** The breakpoint paused on the very first render, and the Scope pane read:

```
products:    null
status:      "loading"
inStockOnly: false
saleCount:   0
```

The Network tab had no request for the products file. The component threw during its first render, before `useEffect` could start the fetch. So the fetch never returned null. `useState<Product[] | null>(null)` made the first render run with no data, and the `!` in `products!.map` told TypeScript not to worry about it.

**Fix (`f25fece`):** Start the list as `useState<Product[]>([])`. Loading is already tracked by `status`, so `null` wasn't needed to mean "not loaded yet". The fix removed every `!` assertion. After the fix, the same breakpoint shows `products: []` on the first render and the page renders.

**Did `tsc` flag it?** No. The non-null assertions (`products!`, `prev!`) told the compiler the value could never be null.

## Bug 2: Network failure from a misspelled URL

**Symptom:** With bug 1 fixed, the catalog showed "Couldn't load products. Refresh the page to try again." and no product cards.

**Console said:** `SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON`. It gave no URL and no status code, and it made the server look like it was sending broken JSON.

**Tool:** Chrome DevTools → **Network** tab, filtered to Fetch/XHR, then reload.

**What it showed:**

```
Name:          prodcuts.json          <- misspelled
Request URL:   /api/prodcuts.json
Status:        200
Content-Type:  text/html
Response:      <!doctype html> <html lang="en"> ...   (the app's index.html)
```

The Name column exposed the typo. The status and content type explained why the code didn't catch it. Vite's dev server answers any unknown path with `index.html` and a `200`, so `response.ok` was `true`, and `response.json()` choked on the HTML. There were two rows for the same URL because React StrictMode runs effects twice in development.

**Fix (`4017e9a`):** `PRODUCTS_URL = '/api/products.json'`. The Network tab now shows `200` with `Content-Type: application/json`, and all six products render.

**Did `tsc` flag it?** No. To TypeScript a URL is just a `string`, so any spelling type-checks.

## Bug 3: Silent wrong value from a misspelled prop name

**Symptom:** Products loaded, but Mechanical Keyboard showed **$89.99** and 1080p Webcam **$59.99**, with no sale price and no "−20%" badge, even though `products.json` gives them 20% and 15% off. They should have shown $71.99 and $50.99. Nothing crashed.

**Console said:** Nothing. No errors, no warnings.

**Tool:** **React DevTools** → Components tab: select a `ProductCard`, then its `PriceTag` child, and compare their props.

**What it showed:**

```
ProductCard  props  product: { id: 1, name: "Mechanical Keyboard", price: 89.99, inStock: true,
                               discount: { percentOff: 20 } }
PriceTag     props  price: 89.99
                    percentOf: 20          <- no percentOff
```

The discount data arrived at `ProductCard` intact and got lost on the way into `PriceTag`. `ProductCard` passed `percentOf`, but `PriceTag` reads `percentOff`. It got `undefined`, and `percentOff ?? 0` quietly turned that into "no discount". The `??` fallback is what kept the typo silent.

**Fix (`0314b13`):** `<PriceTag price={product.price} percentOff={product.discount?.percentOff} />`. React DevTools now shows `percentOff: 20` on `PriceTag`, and the sale prices render.

**Did `tsc` flag it?** Yes: `TS2322: Property 'percentOf' does not exist on type 'IntrinsicAttributes & PriceTagProps'. Did you mean 'percentOff'?` But `npm run dev` doesn't type-check, so the app kept running with the wrong value. This is the case for keeping `npm run typecheck` clean and heeding the red squiggle.

## Which tool caught which bug

A Sources-panel breakpoint caught the crash, the Network tab caught the misspelled URL, and React DevTools caught the prop typo. The console alone wasn't enough: it named the crash without showing why `products` was null, blamed "invalid JSON" instead of the misspelled URL, and said nothing at all about the wrong price.

## Reproducing a bug

Each planted commit adds one bug on top of the previous ones, and each fix removes one:

```bash
git checkout bef3cd3   # bug 1 only
git checkout 4ab96c7   # all three bugs
git checkout f25fece   # bugs 2 and 3 left
git checkout 4017e9a   # bug 3 left
npm run dev            # then open DevTools
git checkout main      # back to the fixed app
```
