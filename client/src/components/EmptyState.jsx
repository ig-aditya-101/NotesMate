const EmptyState = ({ icon, heading, subtext, action }) => {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-10">
      
      {icon}
      
      <h3 className="text-h3">{heading}</h3>
      
      <p className="text-text-muted text-body">{subtext}</p>
      
      {action && action}
      
    </div>
  )
}

export default EmptyState