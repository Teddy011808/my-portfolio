function Section({ title, children }) {
  return (
    <section className="rounded-xl bg-white p-6 ring-1 ring-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default Section
