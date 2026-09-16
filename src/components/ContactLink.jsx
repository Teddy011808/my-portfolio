import { ArrowUpRight } from 'lucide-react'

function ContactLink({ label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-emerald-50"
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        <span className="block truncate text-sm text-gray-500 transition-colors group-hover:text-emerald-700">
          {value}
        </span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-700" />
    </a>
  )
}

export default ContactLink
