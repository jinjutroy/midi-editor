import React from "react";
import useStore from "../../store/useStore";
import type { SongListProps } from "../../types";
import SongCard from "./SongCard";
import LoadingSpinner from "../common/LoadingSpinner";

const SongList = React.memo<SongListProps>(({ onSelectSong, onCreateNew }) => {
  const { songs, currentSongId, deleteSong, setCurrentSong, isLoading } =
    useStore();

  const handleSelectSong = (song: (typeof songs)[0]) => {
    setCurrentSong(song.id);
    onSelectSong(song);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1920px] mx-auto w-full overflow-y-auto">
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Your Songs
        </h2>
        <button
          onClick={onCreateNew}
          className="w-full btn btn-primary sm:w-auto"
        >
          + New Song
        </button>
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
            />
          ))}
        </div>
      )}
    </div>
  );
});

SongList.displayName = "SongList";

export default SongList;
