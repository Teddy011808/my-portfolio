function StatusBadge({ isOpenToWork }) {
  return (
    <span className={isOpenToWork ? 'badge badge-green' : 'badge badge-gray'}>
      {isOpenToWork ? 'Open to work' : 'Busy learning'}
    </span>
  )
}

export default StatusBadge
