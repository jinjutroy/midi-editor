import React from "react";
import useStore from "../../store/useStore";
import type { SongListProps } from "../../types";
import SongCard from "./SongCard";
import LoadingSpinner from "../common/LoadingSpinner";

const SongList = React.memo<SongListProps>(({ onSelectSong, onCreateNew }) => {
  const { songs, currentSongId, deleteSong, setCurrentSong, isLoading } =
    useStore();
  const [selectionMode, setSelectionMode] = React.useState(false);
  const [selectedSongs, setSelectedSongs] = React.useState<Set<string>>(
    new Set()
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const handleSelectSong = (song: (typeof songs)[0]) => {
    if (selectionMode) return;
    setCurrentSong(song.id);
    onSelectSong(song);
  };

  const handleToggleSelect = (songId: string) => {
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedSongs.size === songs.length) {
      setSelectedSongs(new Set());
    } else {
      setSelectedSongs(new Set(songs.map((s) => s.id)));
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteSelected = () => {
    selectedSongs.forEach((songId) => {
      deleteSong(songId);
    });
    setSelectedSongs(new Set());
    setShowDeleteConfirm(false);
    setSelectionMode(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedSongs(new Set());
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1920px] mx-auto w-full overflow-y-auto">
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Your Songs
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          {songs.length > 0 && (
            <button
              onClick={toggleSelectionMode}
              className={`w-full btn sm:w-auto ${
                selectionMode ? "btn-secondary" : "btn-outline"
              }`}
            >
              {selectionMode ? "Cancel" : "Select"}
            </button>
          )}
          {selectionMode && selectedSongs.size > 0 && (
            <>
              <button
                onClick={handleSelectAll}
                className="w-full btn btn-outline sm:w-auto"
              >
                {selectedSongs.size === songs.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
              <button
                onClick={handleDeleteSelected}
                className="w-full btn btn-danger sm:w-auto"
              >
                Delete ({selectedSongs.size})
              </button>
            </>
          )}
          {!selectionMode && (
            <button
              onClick={onCreateNew}
              className="w-full btn btn-primary sm:w-auto"
            >
              + New Song
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : songs.length === 0 ? (
        <div className="py-12 text-center text-gray-400 sm:py-16">
          <p className="text-base sm:text-lg">
            No songs yet. Create your first song!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isActive={currentSongId === song.id}
              onSelect={handleSelectSong}
              onDelete={deleteSong}
              isSelected={selectedSongs.has(song.id)}
              onToggleSelect={handleToggleSelect}
              selectionMode={selectionMode}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Delete {selectedSongs.size} song
              {selectedSongs.size > 1 ? "s" : ""}?
            </h3>
            <p className="mb-6 text-gray-600">
              All notes in{" "}
              {selectedSongs.size > 1 ? "these songs" : "this song"} will be
              permanently deleted.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={cancelDelete} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={confirmDeleteSelected}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

SongList.displayName = "SongList";

export default SongList;
