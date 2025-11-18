import React from "react";
import type { NoteInfoPanelProps } from "../../types";

const NoteInfoPanel = React.memo<NoteInfoPanelProps>(
  ({ note, onEdit, onDelete, onClose }) => {
    return (
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-8 sm:right-8 bg-white rounded-lg shadow-2xl w-full sm:w-[320px] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] border-2 border-primary-500 z-100">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 sm:px-5 sm:py-4">
          <h3 className="text-base font-semibold text-gray-900 wrap-break-word flex-1 pr-2 sm:text-lg">
            {note.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 text-2xl w-6 h-6 flex items-center justify-center rounded transition-all duration-200 shrink-0"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-3 space-y-2 sm:px-5 sm:py-4">
          <p className="text-xs text-gray-700 sm:text-sm">
            <strong className="text-gray-900 font-semibold">Track:</strong>{" "}
            {note.track}
          </p>
          <p className="text-xs text-gray-700 sm:text-sm">
            <strong className="text-gray-900 font-semibold">Time:</strong>{" "}
            {note.time}s
          </p>
          {note.description && (
            <p className="text-xs text-gray-700 leading-relaxed sm:text-sm">
              <strong className="text-gray-900 font-semibold">
                Description:
              </strong>{" "}
              {note.description}
            </p>
          )}
        </div>

        <div className="flex gap-2 px-4 py-3 border-t border-gray-200 sm:px-5 sm:py-4">
          <button onClick={onEdit} className="btn btn-primary btn-sm flex-1">
            Edit
          </button>
          <button onClick={onDelete} className="btn btn-danger btn-sm flex-1">
            Delete
          </button>
        </div>
      </div>
    );
  }
);

NoteInfoPanel.displayName = "NoteInfoPanel";

export default NoteInfoPanel;
