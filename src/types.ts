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
}

// Form inputs always hold strings, so price stays a string until it passes validation.
export interface ProductFormData {
  name: string
  price: string
}

export interface ProductFormErrors {
  name?: string
  price?: string
}
