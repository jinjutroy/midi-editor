import React from "react";
import type { PianoRollNotesProps } from "../../types";

const PianoRollNotes = React.memo<PianoRollNotesProps>(
  ({
    notes,
    selectedNoteId,
    TIMELINE_WIDTH,
    HEADER_HEIGHT,
    TRACK_WIDTH,
    PIXELS_PER_SECOND,
    NOTE_RADIUS,
  }) => {
    return (
      <>
        {notes.map((note) => {
          const x =
            TIMELINE_WIDTH + (note.track - 1) * TRACK_WIDTH + TRACK_WIDTH / 2;
          const y = HEADER_HEIGHT + note.time * PIXELS_PER_SECOND;
          const isSelected = selectedNoteId === note.id;

          return (
            <g key={note.id} className="note-group">
              {/* Selection ring */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r={NOTE_RADIUS + 5}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  className="animate-pulse"
                />
              )}

              {/* Note circle */}
              <circle
                cx={x}
                cy={y}
                r={NOTE_RADIUS}
                fill={note.color}
                stroke={isSelected ? "#1e40af" : "#ffffff"}
                strokeWidth={isSelected ? 3 : 2}
                className="cursor-pointer note-circle"
              />

              {/* Note icon */}
              {note.icon && (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  pointerEvents="none"
                >
                  {note.icon}
                </text>
              )}

              {/* Note title (on selection) */}
              {isSelected && (
                <text
                  x={x}
                  y={y - NOTE_RADIUS - 8}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="12"
                  fontWeight="600"
                  pointerEvents="none"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(255, 255, 255, 0.8))",
                  }}
                >
                  {note.title}
                </text>
              )}
            </g>
          );
        })}
      </>
    );
  }
);

PianoRollNotes.displayName = "PianoRollNotes";

export default PianoRollNotes;
