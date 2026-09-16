import type { ProductFormData, ProductFormErrors } from '@/types'

// Whole number or up to two decimals: "20", "19.99". Rejects "abc", "-5", "1e3".
const PRICE_PATTERN = /^\d+(\.\d{1,2})?$/

// Pure function: reads the form and returns a new errors object.
// The caller puts the result into state; nothing here touches state or calls alert().
export function validateProduct(form: ProductFormData): ProductFormErrors {
  const errors: ProductFormErrors = {}
  const name = form.name.trim()
  const price = form.price.trim()

  if (name === '') {
    errors.name = 'Enter a product name.'
  }

  if (price === '') {
    errors.price = 'Enter a price.'
  } else if (!PRICE_PATTERN.test(price)) {
    errors.price = 'Price must be a number, like 19.99.'
  }

  return errors
}
