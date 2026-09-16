import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validateProduct } from '@/lib/validateProduct'
import type { ProductFormData, ProductFormErrors } from '@/types'

const emptyForm: ProductFormData = { name: '', price: '' }

interface AddProductFormProps {
  onAdd: (name: string, price: number) => void
}

function AddProductForm({ onAdd }: AddProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(emptyForm)
  const [errors, setErrors] = useState<ProductFormErrors>({})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const nextErrors = validateProduct(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onAdd(form.name.trim(), Number(form.price))
    setForm(emptyForm)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="product-name" className="text-gray-900">
          Name
        </Label>
        <Input
          id="product-name"
          name="name"
          placeholder="e.g. Desk lamp"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby="product-name-error"
        />
        {errors.name && (
          <p id="product-name-error" className="text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="product-price" className="text-gray-900">
          Price (USD)
        </Label>
        <Input
          id="product-price"
          name="price"
          inputMode="decimal"
          placeholder="e.g. 24.99"
          value={form.price}
          onChange={handleChange}
          aria-invalid={Boolean(errors.price)}
          aria-describedby="product-price-error"
        />
        {errors.price && (
          <p id="product-price-error" className="text-sm text-red-600">
            {errors.price}
          </p>
        )}
      </div>

      <Button type="submit">Add product</Button>
    </form>
  )
}

export default AddProductForm
