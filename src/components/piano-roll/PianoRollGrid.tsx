import React from "react";
import type { PianoRollGridProps } from "../../types";

const PianoRollGrid = React.memo<PianoRollGridProps>(
  ({
    totalWidth,
    totalHeight,
    song,
    TRACK_WIDTH,
    TIMELINE_WIDTH,
    HEADER_HEIGHT,
    NUM_TRACKS,
    PIXELS_PER_SECOND,
    MINOR_GRID_INTERVAL,
    MAJOR_GRID_INTERVAL,
  }) => {
    return (
      <>
        {/* Background */}
        <rect
          x={0}
          y={0}
          width={totalWidth}
          height={totalHeight}
          fill="#ffffff"
        />

        {/* Timeline background */}
        <rect
          x={0}
          y={0}
          width={TIMELINE_WIDTH}
          height={totalHeight}
          fill="#f9fafb"
        />

        {/* Header background */}
        <rect
          x={0}
          y={0}
          width={totalWidth}
          height={HEADER_HEIGHT}
          fill="#f3f4f6"
          stroke="#e5e7eb"
          strokeWidth={2}
        />

        {/* Track columns and headers */}
        {Array.from({ length: NUM_TRACKS }).map((_, i) => {
          const x = TIMELINE_WIDTH + i * TRACK_WIDTH;
          return (
            <g key={`track-${i}`}>
              <line
                x1={x}
                y1={0}
                x2={x}
                y2={totalHeight}
                stroke="#e5e7eb"
                strokeWidth={2}
              />
              <text
                x={x + TRACK_WIDTH / 2}
                y={HEADER_HEIGHT / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#374151"
                fontWeight="600"
                fontSize="14"
              >
                {song.trackLabels?.[i] || `Track ${i + 1}`}
              </text>
            </g>
          );
        })}

        {/* Last vertical line */}
        <line
          x1={totalWidth}
          y1={0}
          x2={totalWidth}
          y2={totalHeight}
          stroke="#e5e7eb"
          strokeWidth={2}
        />

        {/* Horizontal time grid lines */}
        {Array.from({
          length: Math.ceil(song.duration / MINOR_GRID_INTERVAL) + 1,
        }).map((_, i) => {
          const time = i * MINOR_GRID_INTERVAL;
          const y = HEADER_HEIGHT + time * PIXELS_PER_SECOND;
          const isMajor = time % MAJOR_GRID_INTERVAL === 0;

          return (
            <g key={`time-${i}`}>
              <line
                x1={TIMELINE_WIDTH}
                y1={y}
                x2={totalWidth}
                y2={y}
                stroke={isMajor ? "#d1d5db" : "#f3f4f6"}
                strokeWidth={isMajor ? 1.5 : 1}
              />
              {isMajor && (
                <text
                  x={TIMELINE_WIDTH - 10}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="#6b7280"
                  fontSize="12"
                  fontWeight={isMajor ? "600" : "400"}
                >
                  {time}s
                </text>
              )}
            </g>
          );
        })}
      </>
    );
  }
);

PianoRollGrid.displayName = "PianoRollGrid";

export default PianoRollGrid;
