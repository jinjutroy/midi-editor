import { useState } from "react";
import useStore from "./store/useStore";
import type { Song } from "./types";
import SongList from "./components/song/SongList";
import PianoRoll from "./components/piano-roll/PianoRoll";
import SongForm from "./components/song/SongForm";
import ExportImport from "./components/common/ExportImport";
import LoadingOverlay from "./components/common/LoadingOverlay";

function App() {
  const {
    getCurrentSong,
    currentSongId,
    setCurrentSong,
    isLoading,
    loadingMessage,
  } = useStore();
  const [showSongForm, setShowSongForm] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [view, setView] = useState<"list" | "editor">("list");

  const currentSong = getCurrentSong();

  const handleCreateNew = () => {
    setEditingSong(null);
    setShowSongForm(true);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setShowSongForm(true);
  };

  const handleSongFormSuccess = () => {
    setShowSongForm(false);
    setEditingSong(null);
    if (!currentSongId) {
      setView("editor");
    }
  };

  const handleSelectSong = () => {
    setView("editor");
  };

  const handleBackToList = () => {
    setView("list");
    setCurrentSong("");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden max-w-[2560px] mx-auto">
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay message={loadingMessage} />}

      {/* Header */}
      <header className="flex flex-col gap-3 px-4 py-4 text-white shadow-lg bg-linear-to-r from-purple-light to-purple-dark sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5 shrink-0">
        <div className="flex-1">
          <h1 className="flex items-center gap-2 m-0 text-xl font-bold sm:text-2xl lg:text-3xl">
            🎹 MIDI Editor
          </h1>
          <p className="m-0 mt-1 text-xs opacity-90 sm:text-sm">
            Piano Roll DAW-style Editor
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <ExportImport />
          {view === "editor" && currentSong && (
            <button
              onClick={handleBackToList}
              className="text-sm btn btn-secondary sm:text-base"
            >
              <span className="hidden sm:inline">←</span> Back
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-1 overflow-hidden bg-gray-50">
        {view === "list" || !currentSong ? (
          <SongList
            onSelectSong={handleSelectSong}
            onCreateNew={handleCreateNew}
          />
        ) : (
          <PianoRoll song={currentSong} onEditSong={handleEditSong} />
        )}
      </main>

      {/* Song Form Modal */}
      <SongForm
        song={editingSong}
        isOpen={showSongForm}
        onClose={() => setShowSongForm(false)}
        onSuccess={handleSongFormSuccess}
      />
    </div>
  );
}

export default App;
