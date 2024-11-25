import React from 'react'

const Header = ({setshowTimeline,showTimeline}) => {
  return (
    <div className="p-4 bg-[#1F1F1F] flex-wrap gap-5 justify-center text-sm flex text-white md:justify-between items-center border-[1px] border-[#393939]">
        <div>
        <p>Participants-wise Session Timeline</p>
        </div>
        <div className='flex justify-start items-center gap-x-3'>
        <p>Show participant timeline</p>
        <div className='bg-[#2F3562] border-[1px] w-9 h-5 border-[#424FB0] rounded-2xl relative cursor-pointer' onClick={()=>setshowTimeline(pre=>!pre)}> 
          <p className={`bg-[#5568FE] w-4 h-4 rounded-full absolute ${showTimeline?"-right-[7px]":"left-[10px]"} duration-300 top-1/2  transform -translate-x-1/2 -translate-y-1/2`}></p>
        </div>
        </div>
    </div>
  )
}

export default Header
