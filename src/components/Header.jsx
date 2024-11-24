import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <div className='flex justify-between  items-center p-10 pl-20 pr-20'>
  
                   <div className='text-white font-sans text-4xl'>NoteSpace</div>
                   <Input type="text" placeholder="search here" className="bg-[#253f51] m-4 w-[700px]" />
                <Button className="bg-gradient-to-r from-[#39c1f0] via-[#55adf3] to-[#a861ac]">+</Button>


    </div>
  )
}
