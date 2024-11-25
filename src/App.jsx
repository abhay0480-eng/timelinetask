import React, { useState } from "react";
import data from "../data.json";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShareOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import Header from "./components/Header";
import ParticipantHeader from "./components/Participants/ParticipantHeader";
import Timeline from "./components/Timeline";
import MicOffIcon from "@mui/icons-material/MicOff";
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'

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

  const calculatePosition = (timestamp) => {
    const sessionStart = new Date(start).getTime();
    const sessionEnd = new Date(end).getTime();
    const eventTime = new Date(timestamp).getTime();
    return ((eventTime - sessionStart) / (sessionEnd - sessionStart)) * 100;
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

          <div className="max-h-96 overflow-y-scroll relative">
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
                <div key={index} className="relative py-5">
                  {/* Participant Header */}
                  <ParticipantHeader
                    formatDate={formatDate}
                    startTime={startTime}
                    participant={participant}
                    durationMinutes={durationMinutes}
                  />

                  {/* Timeline Line */}
                  <div className="relative">
                    <div
                      className="absolute bg-[#5568FE] h-1"
                      style={{
                        left: `${startPosition}%`,
                        width: `${totalWidth}%`,
                        zIndex: 1, // Background line
                      }}
                    ></div>

                  {Object.keys(participant.events).map((eventType) =>
                    participant.events[eventType].map((event, idx) => {
                      const eventStart = new Date(event.start).getTime();
                      const eventEnd = new Date(event.end).getTime();

                      // Calculate positions for start and end
                      const eventStartPosition = ((eventStart - new Date(start).getTime()) / totalDuration) * 100;
                      const eventEndPosition = ((eventEnd - new Date(start).getTime()) / totalDuration) * 100;

                      // Icon mappings for event types
                      const iconOnMap = {
                        mic: <MicIcon className="!text-white !text-xs" />,
                        webcam: <VideocamIcon className="!text-white !text-xs" />,
                        screenShare: <ScreenShareIcon className="!text-white !text-xs" />,
                        error: <ErrorIcon className="!text-white !text-xs" />, 
                      };

                      const iconOffMap = {
                        mic: <MicOffIcon className="!text-white !text-xs" />,
                        webcam: <VideocamOffIcon className="!text-white !text-xs" />,
                        screenShare: <StopScreenShareIcon className="!text-white !text-xs" />,
                        error: <ErrorIcon className="!text-white !text-xs" />
                      };

                      if (["mic", "webcam", "screenShare"].includes(eventType)) {
                        return (
                          <React.Fragment key={`${eventType}-${idx}`}>
                            {/* Start Icon (ON) */}
                            <div
                              className="absolute top-1/2 transform -translate-y-1/2"
                              style={{
                                left: `${eventStartPosition}%`,
                                zIndex: 20,
                              }}
                              title={`${eventType} On - ${new Date(event.start).toLocaleTimeString()}`}
                            >
                              <div className="h-4 w-4 rounded-full bg-[#5568FE] text-white flex items-center justify-center">
                                {iconOnMap[eventType]}
                              </div>
                            </div>

                            {/* End Icon (OFF) */}
                            <div
                              className="absolute top-1/2 transform -translate-y-1/2"
                              style={{
                                left: `${eventEndPosition}%`,
                                zIndex: 20,
                              }}
                              title={`${eventType} Off - ${new Date(event.end).toLocaleTimeString()}`}
                            >
                              <div className="h-4 w-4 rounded-full bg-[#FF0000] text-white flex items-center justify-center">
                                {iconOffMap[eventType]}
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      }

                      // Render for single-state events (e.g., error)
                      if (eventType === "errors") {
                        return (
                          <div
                            key={`${eventType}-${idx}`}
                            className="absolute top-1/2 transform -translate-y-1/2"
                            style={{
                              left: `${eventStartPosition}%`,
                              zIndex: 20,
                            }}
                            title={`Error - ${new Date(event.start).toLocaleTimeString()}`}
                          >
                            <div className="h-4 w-4 rounded-full bg-[#FF0000] text-white flex items-center justify-center">
                              {iconOnMap[eventType]}
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })
                  )}
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