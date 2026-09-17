import type { ProductFormData, ProductFormErrors } from '@/types'

// Whole number or up to two decimals: "20", "19.99". Rejects "abc", "-5", "1e3".
const PRICE_PATTERN = /^\d+(\.\d{1,2})?$/

function amountError(amount: string, label: string): string | undefined {
  if (amount === '') return `Enter a ${label.toLowerCase()}.`
  if (!PRICE_PATTERN.test(amount)) return `${label} must be a number, like 19.99.`
  return undefined
}

// Pure function: reads the form and returns a new errors object.
// The caller puts the result into state; nothing here touches state or calls alert().
export function validateProduct(form: ProductFormData): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if (form.name.trim() === '') {
    errors.name = 'Enter a product name.'
  }

  const priceError = amountError(form.price.trim(), 'Price')
  if (priceError) errors.price = priceError

  const costError = amountError(form.costPrice.trim(), 'Cost')
  if (costError) errors.costPrice = costError

  return errors
}
