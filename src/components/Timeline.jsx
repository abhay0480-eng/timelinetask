import React from 'react'

const Timeline = ({timeSlots}) => {
  return (
    <div className='text-white  flex gap-x-5  justify-between  overflow-x-scroll items-center px-3 border-[1px] border-[#393939] py-4'>
      {timeSlots?.map((item,index)=>{
        return(
            <div>{item}</div>
        )
      })}
    </div>
  )
}

export default Timeline
