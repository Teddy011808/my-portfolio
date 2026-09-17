import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { PublicProduct } from '@/types'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

interface ProductCardProps {
  product: PublicProduct
  onBuy: () => void
}

function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <li className="flex flex-col gap-4 rounded-xl bg-white p-4 ring-1 ring-gray-200 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <Badge
          variant="secondary"
          className={product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'}
        >
          {product.inStock ? 'In stock' : 'Sold out'}
        </Badge>
      </div>
      <p className="text-lg font-semibold text-gray-900">{currency.format(product.price)}</p>
      <Button variant="outline" className="mt-auto" disabled={!product.inStock} onClick={onBuy}>
        {product.inStock ? 'Buy' : 'Unavailable'}
      </Button>
    </li>
  )
}

export default ProductCard
