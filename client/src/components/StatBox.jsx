const StatBox = ({ number, label }) => {
  return (
    <div className="bg-bg-secondary flex flex-col items-center gap-1 px-3 py-1.5 rounded-md w-25 h-16">
      <div className="text-text-primary text-h2">{number}</div>
      <div className="text-text-muted text-micro">{label}</div>
    </div>
  )
}
export default StatBox