export interface Project {
  title: string
  description: string
  status: 'In progress' | 'Completed'
  tech: string[]
  href: string
}

export interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
  // Internal: what the store pays its supplier. Never shown to shoppers.
  costPrice: number
}

// What the storefront may see: a Product without its internal cost.
export type PublicProduct = Omit<Product, 'costPrice'>

// The fields a person types in; the catalog fills in id and inStock.
export type NewProductFields = Pick<Product, 'name' | 'price' | 'costPrice'>

export type LoadStatus = 'loading' | 'success' | 'error'

// Form inputs always hold strings, so prices stay strings until they pass validation.
export interface ProductFormData {
  name: string
  price: string
  costPrice: string
}

export interface ProductFormErrors {
  name?: string
  price?: string
  costPrice?: string
}
