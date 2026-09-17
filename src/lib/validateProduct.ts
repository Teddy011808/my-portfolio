import type { ProductDraft, ProductFormErrors } from '@/types'

// Whole number or up to two decimals: "20", "19.99". Rejects "abc", "-5", "1e3".
const PRICE_PATTERN = /^\d+(\.\d{1,2})?$/

function amountError(amount: string, label: string): string | undefined {
  if (amount === '') return `Enter a ${label.toLowerCase()}.`
  if (!PRICE_PATTERN.test(amount)) return `${label} must be a number, like 19.99.`
  return undefined
}

// Pure function: reads the draft and returns a new errors object.
// The caller puts the result into state; nothing here touches state or calls alert().
export function validateProduct(draft: ProductDraft): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if ((draft.name?.trim() ?? '') === '') {
    errors.name = 'Enter a product name.'
  }

  const priceError = amountError(draft.price?.trim() ?? '', 'Price')
  if (priceError) errors.price = priceError

  const costError = amountError(draft.costPrice?.trim() ?? '', 'Cost')
  if (costError) errors.costPrice = costError

  return errors
}
