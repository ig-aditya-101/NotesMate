
import React from 'react'

const Badge = ({variant='default'}) => {
   const variants={
    default:'bg-bg-primary text-text-secondary border-border-main',
    active:'bg-bg-inverse text-text-inverse border-border-strong',
    teacher:'bg-accent-green-bg text-accent-green border-accent-green',
        
    }
  return (
    <div className={`border-2  rounded-pill px-3 py-1.5 w-fit ${variants[variant]}`} >Badge</div>
  )
}

export default Badge