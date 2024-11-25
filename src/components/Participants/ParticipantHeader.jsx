import React from 'react'

const ParticipantHeader = ({formatDate, startTime, durationMinutes, participant}) => {
  return (
    <div className="flex justify-between items-center pb-3 px-3 text-white my-2">
    <div>
      <p className="text-base font-semibold capitalize my-1">{participant?.name}</p>
      <p className="text-xs font-medium">
        {formatDate}, {startTime} | Duration {durationMinutes} mins
      </p>
    </div>
    <div>
      <p className="text-[#5568FE] text-sm">View details</p>
    </div>
  </div>
  )
}

export default ParticipantHeader
