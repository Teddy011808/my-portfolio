function StatusBadge({ isOpenToWork }) {
  const colors = isOpenToWork
    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
    : 'bg-gray-100 text-gray-700 ring-gray-200'

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ring-1 ${colors}`}>
      <span className={isOpenToWork ? 'size-2 rounded-full bg-emerald-600' : 'size-2 rounded-full bg-gray-500'} />
      {isOpenToWork ? 'Open to work' : 'Busy learning'}
    </span>
  )
}

export default StatusBadge
