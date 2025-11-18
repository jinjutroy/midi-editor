import { memo, MouseEvent, useState } from "react";
import type { SongCardProps } from "../../types";

const SongCard = memo<SongCardProps>(
  ({
    song,
    isActive,
    onSelect,
    onDelete,
    isSelected = false,
    onToggleSelect,
    selectionMode = false,
  }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      setShowConfirm(true);
    };

    const confirmDelete = (e: MouseEvent) => {
      e.stopPropagation();
      onDelete(song.id);
      setShowConfirm(false);
    };

    const cancelDelete = (e: MouseEvent) => {
      e.stopPropagation();
      setShowConfirm(false);
    };

    const handleClick = () => {
      if (selectionMode && onToggleSelect) {
        onToggleSelect(song.id);
      } else {
        onSelect(song);
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`
        bg-white border-2 rounded-lg p-4 sm:p-6 cursor-pointer transition-all duration-200 relative
        hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/15 hover:-translate-y-0.5
        ${
          isActive && !selectionMode
            ? "border-primary-500 bg-blue-50 shadow-lg shadow-primary-500/10"
            : isSelected
            ? "border-green-500 bg-green-50 shadow-lg shadow-green-500/10"
            : "border-gray-200"
        }
      `}
      >
        <div className="flex items-start justify-between mb-3">
          {selectionMode && (
            <div
              className="flex items-center justify-center mr-2 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect?.(song.id)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded cursor-pointer focus:ring-green-500"
              />
            </div>
          )}
          <h3 className="flex-1 pr-2 text-lg font-semibold text-gray-900 wrap-break-word sm:text-xl">
            {song.name}
          </h3>
          {!selectionMode && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center text-3xl text-gray-400 transition-all duration-200 rounded hover:bg-red-50 hover:text-red-600 w-7 h-7 shrink-0"
              title="Delete song"
            >
              ×
            </button>
          )}
        </div>

        {showConfirm && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 rounded-lg bg-white/98"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2 font-semibold text-center text-gray-900">
              Delete this song?
            </p>
            <p className="flex items-center gap-1 mb-8 text-sm text-center text-red-600">
              <span>⚠️</span> This will be permanently deleted
            </p>
            <div className="flex gap-2 mt-2">
              <button onClick={confirmDelete} className="btn btn-danger btn-sm">
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="btn btn-secondary btn-sm"
              >
                No
              </button>
            </div>
          </div>
        )}

        {song.description && (
          <p className="mb-2 text-sm leading-relaxed text-gray-600">
            {song.description}
          </p>
        )}

        <div className="flex gap-6 pt-4 mt-4 text-sm text-gray-600 border-t border-gray-200">
          <span className="flex items-center gap-2">⏱ {song.duration}s</span>
          <span className="flex items-center gap-2">
            🎵 {song.notes?.length || 0} notes
          </span>
        </div>

        {song.tags && song.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {song.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SongCard.displayName = "SongCard";

export default SongCard;
