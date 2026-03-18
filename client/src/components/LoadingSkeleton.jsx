const LoadingSkeleton = () => {
  return (
    <div className="w-90 p-3 bg-bg-secondary rounded-xl">
      
      {/* Title block: Added w-3/4 for a natural text length */}
      <div className="w-3/4 h-6 rounded animate-pulse bg-bg-primary mb-3">
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-center">
        
        {/* Badge block: Added h-4 to give the pill shape some height */}
        <div className="w-20 h-4 rounded-full animate-pulse bg-bg-primary">
        </div>

        {/* Downloads block: Added w-12 to represent a small number/stat */}
        <div className="w-12 h-3 rounded animate-pulse bg-bg-primary">
        </div>

      </div>
    </div>
  )
}
export default LoadingSkeleton