const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

interface PriceTagProps {
  price: number
  // Leave it out when the product isn't on sale.
  percentOff?: number
}

function PriceTag({ price, percentOff }: PriceTagProps) {
  const discount = percentOff ?? 0

  if (discount <= 0) {
    return <p className="text-lg font-semibold text-gray-900">{currency.format(price)}</p>
  }

  return (
    <p className="flex flex-wrap items-baseline gap-2">
      <span className="text-lg font-semibold text-red-700">{currency.format(price * (1 - discount / 100))}</span>
      <s className="text-sm text-gray-500">
        <span className="sr-only">Was </span>
        {currency.format(price)}
      </s>
      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">−{discount}%</span>
    </p>
  )
}

export default PriceTag
