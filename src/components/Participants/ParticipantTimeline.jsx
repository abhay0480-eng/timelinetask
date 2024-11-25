import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShareOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";

const ParticipantTimeline = ({startPosition,totalWidth,participant,start,totalDuration,extractTime}) => {
    const time = extractTime(start)
    console.log("start",time.time);

    
  return (
    <div className="relative">
      <div
        className="absolute bg-[#5568FE] h-1"
        style={{
          left: `${startPosition}%`,
          width: `${totalWidth}%`,
          zIndex: 1, // Background line
        }}
      ></div>

      {Object?.keys(participant?.events)?.map((eventType) =>
        participant?.events[eventType]?.map((event, idx) => {
          const eventStart = new Date(event?.start)?.getTime();
          const eventEnd = new Date(event?.end)?.getTime();

          // Calculate positions for start and end
          const eventStartPosition =
            ((eventStart - new Date(start).getTime()) / totalDuration) * 100;
          const eventEndPosition =
            ((eventEnd - new Date(start).getTime()) / totalDuration) * 100;

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
            screenShare: (
              <StopScreenShareIcon className="!text-white !text-xs" />
            ),
            error: <ErrorIcon className="!text-white !text-xs" />,
          };

          if (["mic", "webcam", "screenShare"].includes(eventType)) {
            return (
              <React.Fragment key={`${eventType}-${idx}`}>
                {/* Start Icon (ON) */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${eventStartPosition}%`,
                    zIndex: 20,
                  }}
                  title={`${eventType} On - ${extractTime(event.start).time}`} 
                >
                  <div className="h-4 w-4 rounded-full bg-[#5568FE] text-white flex items-center justify-center">
                    {iconOnMap[eventType]}
                  </div>
                </div>

                {/* End Icon (OFF) */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${eventEndPosition}%`,
                    zIndex: 20,
                  }}
                  title={`${eventType} Off - ${extractTime(event.end).time}`}
                >
                  <div className="h-4 w-4 rounded-full bg-[#FF0000] text-white flex items-center justify-center">
                    {iconOffMap[eventType]}
                  </div>
                </div>
              </React.Fragment>
            );
          }

      
          if (eventType === "errors") {
            return (
              <div
                key={`${eventType}-${idx}`}
                className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${eventStartPosition}%`,
                  zIndex: 20,
                }}
                title={`Error - ${event.message} - ${extractTime(event.start).time}`}
              >
                <div className="h-4 w-4 rounded-full bg-[#FF0000] !text-white flex items-center justify-center">
                  {iconOnMap[eventType]}
                </div>
              </div>
            );
          }

          return null;
        })
      )}
    </div>
  );
};

export default ParticipantTimeline;
