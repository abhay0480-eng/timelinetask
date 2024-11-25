import React, { useState } from "react";
import data from "../data.json";
import Header from "./components/Header";
import ParticipantHeader from "./components/Participants/ParticipantHeader";
import Timeline from "./components/Timeline";
import ParticipantTimeline from "./components/Participants/ParticipantTimeline";

function App() {
  const { end, start, participantArray } = data;
  const [showTimeline, setshowTimeline] = useState(false);

  const extractTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();
    return {
      time: `${hours}:${minutes}`,
      formatDate: `${day} ${month} ${year}`,
    };
  };

  const generateTimeSlots = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const times = [];

    while (startDate <= endDate) {
      const hours = startDate.getUTCHours().toString().padStart(2, "0");
      const minutes = startDate.getUTCMinutes().toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);
      startDate.setMinutes(startDate.getMinutes() + 1);
    }

    return times;
  };


  const startTime = extractTime(start).time;
  const formatDate = extractTime(start).formatDate;
  const timeSlots = generateTimeSlots(start, end);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-green-200">
      <div className="w-[75%]">
        {/* Header */}
        <Header setshowTimeline={setshowTimeline} showTimeline={showTimeline} />

        <div className="bg-[#1F1F1F] border-[1px] border-[#393939] pt-0">
          {/* Timeline */}
          <Timeline timeSlots={timeSlots} />

          <div className="max-h-96 overflow-y-scroll  relative">
            {participantArray?.map((participant, index) => {
              const totalDuration =
                new Date(end).getTime() - new Date(start).getTime();

              // Participant's active duration and timeline calculations
              const totalActiveDuration = participant.timelog.reduce(
                (acc, timelog) => {
                  const timelogStart = new Date(timelog.start).getTime();
                  const timelogEnd = new Date(timelog.end).getTime();
                  return acc + (timelogEnd - timelogStart);
                },
                0
              );

              const durationMinutes = Math.floor(totalActiveDuration / 60000);

              const startPosition =
                ((new Date(participant.timelog[0].start).getTime() -
                  new Date(start).getTime()) /
                  totalDuration) *
                100;
              const totalWidth = (totalActiveDuration / totalDuration) * 100;

              return (
                <div
                  key={index}
                  className="relative py-7 border-b-[1px] border-b-[#393939] overflow-x-scroll"
                  >
                  {/* Participant Header */}
                  <ParticipantHeader
                    formatDate={formatDate}
                    startTime={startTime}
                    participant={participant}
                    durationMinutes={durationMinutes}
                  />
                  <div className="">
                    {/* Timeline Line */}
                  { showTimeline && <ParticipantTimeline extractTime={extractTime} startPosition={startPosition} totalDuration={totalDuration} totalWidth={totalWidth} participant={participant} start={start}/>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
