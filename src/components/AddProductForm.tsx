import { useState, type ChangeEvent, type InputHTMLAttributes, type SubmitEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validateProduct } from '@/lib/validateProduct'
import type { NewProductFields, ProductFormData, ProductFormErrors } from '@/types'

const emptyForm: ProductFormData = { name: '', price: '', costPrice: '' }

interface FormFieldProps {
  name: keyof ProductFormData
  label: string
  placeholder: string
  value: string
  error?: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function FormField({ name, label, placeholder, value, error, inputMode, onChange }: FormFieldProps) {
  const id = `product-${name}`
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-gray-900">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

interface AddProductFormProps {
  onAdd: (fields: NewProductFields) => void
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

    onAdd({ name: form.name.trim(), price: Number(form.price), costPrice: Number(form.costPrice) })
    setForm(emptyForm)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        name="name"
        label="Name"
        placeholder="e.g. Desk lamp"
        value={form.name}
        error={errors.name}
        onChange={handleChange}
      />
      <FormField
        name="price"
        label="Price (USD)"
        placeholder="e.g. 24.99"
        inputMode="decimal"
        value={form.price}
        error={errors.price}
        onChange={handleChange}
      />
      <FormField
        name="costPrice"
        label="Cost (USD, internal)"
        placeholder="e.g. 12.50"
        inputMode="decimal"
        value={form.costPrice}
        error={errors.costPrice}
        onChange={handleChange}
      />

      <Button type="submit">Add product</Button>
    </form>
  )
}

export default AddProductForm
