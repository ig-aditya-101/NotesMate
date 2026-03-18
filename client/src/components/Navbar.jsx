import { Circle, Grid, Home, Upload } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    const navbarItems=[
        {
            label:'Home',
            icon:<Home/>
        },
        {
            label:'Browse',
            icon:<Grid/>
        },
        {
            label:'Upload',
            icon:<Upload/>
        },
        {
            label:'Profile',
            icon:<Circle/>
        }

    ]
  return (
    <div className='flex w-95 justify-between fixed bottom-0 left-0 right-0 bg-white border-border-main'>
       { navbarItems.map((item)=> (<div className='text-text-muted text-micro flex flex-col items-center'>{item.icon}{item.label}</div>))      }
    </div>
  )
}

export default Navbar