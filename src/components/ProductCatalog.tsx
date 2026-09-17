import { useEffect, useState, type ReactNode } from 'react'
import AddProductForm from '@/components/AddProductForm'
import ProductCard from '@/components/ProductCard'
import { fetchProducts, toPublicProduct } from '@/lib/products'
import type { LoadStatus, NewProductFields, Product } from '@/types'

interface FilterButtonProps {
  isActive: boolean
  onClick: () => void
  children: ReactNode
}

function FilterButton({ isActive, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={
        isActive
          ? 'rounded-md bg-white px-3 py-1 text-sm font-medium text-gray-900 shadow-sm transition-colors'
          : 'rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900'
      }
    >
      {children}
    </button>
  )
}

function ProductCatalog() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [saleCount, setSaleCount] = useState(0)

  useEffect(() => {
    // Ignore a response that arrives after unmount (StrictMode mounts twice in dev).
    let ignore = false
    fetchProducts()
      .then((loaded) => {
        if (ignore) return
        setProducts(loaded)
        setStatus('success')
      })
      .catch((error: unknown) => {
        if (ignore) return
        console.error(error)
        setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [])

  const publicProducts = products!.map(toPublicProduct)
  const visibleProducts = inStockOnly ? publicProducts.filter((product) => product.inStock) : publicProducts

  function handleAdd(fields: NewProductFields) {
    setProducts((prev) => [
      ...prev!,
      { ...fields, id: Math.max(0, ...prev!.map((product) => product.id)) + 1, inStock: true },
    ])
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {status === 'success' && (
              <p className="text-sm font-medium text-gray-700">
                {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
              </p>
            )}
            {saleCount > 0 && (
              <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                {saleCount} {saleCount === 1 ? 'sale' : 'sales'}
              </span>
            )}
          </div>

          <div role="group" aria-label="Filter products" className="inline-flex gap-1 rounded-lg bg-gray-100 p-1">
            <FilterButton isActive={!inStockOnly} onClick={() => setInStockOnly(false)}>
              All
            </FilterButton>
            <FilterButton isActive={inStockOnly} onClick={() => setInStockOnly(true)}>
              In stock only
            </FilterButton>
          </div>
        </div>

        {status === 'loading' && <p className="mt-4 text-sm text-gray-500">Loading products…</p>}
        {status === 'error' && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            Couldn't load products. Refresh the page to try again.
          </p>
        )}
        {status === 'success' && (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onBuy={() => setSaleCount((count) => count + 1)} />
            ))}
          </ul>
        )}
      </div>

      <div className="self-start rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
        <h3 className="mb-4 font-medium text-gray-900">Add product</h3>
        <AddProductForm onAdd={handleAdd} />
      </div>
    </div>
  )
}

export default ProductCatalog
