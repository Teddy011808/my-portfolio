import type { Product, PublicProduct } from '@/types'

export const PRODUCTS_URL = '/api/products.json'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

// response.json() is typed as any, so the result starts as unknown and has to earn the Product type here.
function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.price === 'number' &&
    typeof value.inStock === 'boolean' &&
    typeof value.costPrice === 'number'
  )
}

function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct)
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data: unknown = await response.json()
  if (!isProductList(data)) {
    throw new Error('Response is not a list of products')
  }
  return data
}

// Strip internal fields at runtime too, so costPrice never reaches a component's props.
export function toPublicProduct({ costPrice: _costPrice, ...publicFields }: Product): PublicProduct {
  return publicFields
}
