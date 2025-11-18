import React, { useState, useRef, useEffect } from "react";
import useStore from "../../store/useStore";
import PianoRollGrid from "./PianoRollGrid";
import PianoRollNotes from "./PianoRollNotes";
import type { PianoRollProps, Note, NoteFormData } from "../../types";
import NoteInfoPanel from "../note/NoteInfoPanel";
import NoteForm from "../note/NoteForm";

const PianoRoll = React.memo<PianoRollProps>(({ song }) => {
  const { addNote, updateNote, deleteNote } = useStore();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<
    Note | { track: number; time: number } | null
  >(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const rollRef = useRef<SVGSVGElement>(null);

  // Constants for visualization
  const TRACK_WIDTH = 120;
  const PIXELS_PER_SECOND = 40;
  const NUM_TRACKS = 8;
  const HEADER_HEIGHT = 60;
  const TIMELINE_WIDTH = 60;
  const MAJOR_GRID_INTERVAL = 10;
  const MINOR_GRID_INTERVAL = 1;
  const NOTE_RADIUS = 10;

  const totalHeight = song.duration * PIXELS_PER_SECOND + HEADER_HEIGHT;
  const totalWidth = NUM_TRACKS * TRACK_WIDTH + TIMELINE_WIDTH;

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!rollRef.current) return;

    const rect = rollRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a note
    const clickedNote = song.notes.find((note) => {
      const noteX =
        TIMELINE_WIDTH + (note.track - 1) * TRACK_WIDTH + TRACK_WIDTH / 2;
      const noteY = HEADER_HEIGHT + note.time * PIXELS_PER_SECOND;
      const distance = Math.sqrt(
        Math.pow(x - noteX, 2) + Math.pow(y - noteY, 2)
      );
      return distance <= NOTE_RADIUS + 5;
    });

    if (clickedNote) {
      setSelectedNote(clickedNote);
      return;
    }

    // If clicked outside header and timeline, add new note
    if (x > TIMELINE_WIDTH && y > HEADER_HEIGHT) {
      const track = Math.floor((x - TIMELINE_WIDTH) / TRACK_WIDTH) + 1;
      const time =
        Math.round(((y - HEADER_HEIGHT) / PIXELS_PER_SECOND) * 10) / 10;

      if (
        track >= 1 &&
        track <= NUM_TRACKS &&
        time >= 0 &&
        time <= song.duration
      ) {
        const existingNote = song.notes.find(
          (n) => n.track === track && n.time === time
        );
        if (existingNote) {
          setSelectedNote(existingNote);
        } else {
          setEditingNote({ track, time });
          setShowNoteForm(true);
        }
      }
    }
  };

  const handleAddNote = (noteData: NoteFormData) => {
    try {
      addNote(song.id, noteData);
      setShowNoteForm(false);
      setEditingNote(null);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleUpdateNote = (noteData: NoteFormData) => {
    if (!editingNote || !("id" in editingNote)) return;

    try {
      updateNote(song.id, editingNote.id, noteData);
      setShowNoteForm(false);
      setEditingNote(null);

      // Update selected note with new data to keep it selected
      const updatedNote = song.notes.find((n) => n.id === editingNote.id);
      if (updatedNote) {
        // Create updated note object with new data
        setSelectedNote({
          ...updatedNote,
          ...noteData,
        });
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote && confirm("Delete this note?")) {
      deleteNote(song.id, selectedNote.id);
      setSelectedNote(null);
    }
  };

  const handleEditNote = () => {
    setEditingNote(selectedNote);
    setShowNoteForm(true);
  };

  const handleCloseNoteForm = () => {
    setShowNoteForm(false);
    setEditingNote(null);
  };

  // Sync selected note with store updates
  useEffect(() => {
    if (selectedNote) {
      const updatedNote = song.notes.find((n) => n.id === selectedNote.id);
      if (
        updatedNote &&
        JSON.stringify(updatedNote) !== JSON.stringify(selectedNote)
      ) {
        setSelectedNote(updatedNote);
      }
    }
  }, [song.notes, selectedNote]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedNote) {
        if (confirm("Delete this note?")) {
          deleteNote(song.id, selectedNote.id);
          setSelectedNote(null);
        }
      }
      if (e.key === "Escape") {
        setSelectedNote(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedNote, deleteNote, song.id]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b-2 border-gray-200 sm:px-6 lg:px-8 sm:py-4 shrink-0">
        <div className="song-info max-w-[1920px] mx-auto">
          <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            {song.name}
          </h2>
          {song.description && (
            <p className="mb-2 text-xs text-gray-600 sm:text-sm sm:mb-3">
              {song.description}
            </p>
          )}
          <div className="flex gap-3 text-xs text-gray-600 sm:gap-6 sm:text-sm">
            <span>⏱ {song.duration}s</span>
            <span>🎵 {song.notes.length}</span>
          </div>
        </div>
      </div>

      {/* Piano Roll Wrapper */}
      <div className="flex-1 p-2 overflow-auto bg-gray-50 sm:p-4">
        <div className="max-w-[1920px] mx-auto">
          <svg
            ref={rollRef}
            className="block rounded-lg shadow-xl cursor-crosshair"
            width={totalWidth}
            height={totalHeight}
            onClick={handleCanvasClick}
            style={{ willChange: "contents" }}
          >
            <PianoRollGrid
              totalWidth={totalWidth}
              totalHeight={totalHeight}
              song={song}
              TRACK_WIDTH={TRACK_WIDTH}
              TIMELINE_WIDTH={TIMELINE_WIDTH}
              HEADER_HEIGHT={HEADER_HEIGHT}
              NUM_TRACKS={NUM_TRACKS}
              PIXELS_PER_SECOND={PIXELS_PER_SECOND}
              MINOR_GRID_INTERVAL={MINOR_GRID_INTERVAL}
              MAJOR_GRID_INTERVAL={MAJOR_GRID_INTERVAL}
            />

            <PianoRollNotes
              notes={song.notes}
              selectedNoteId={selectedNote?.id}
              TIMELINE_WIDTH={TIMELINE_WIDTH}
              HEADER_HEIGHT={HEADER_HEIGHT}
              TRACK_WIDTH={TRACK_WIDTH}
              PIXELS_PER_SECOND={PIXELS_PER_SECOND}
              NOTE_RADIUS={NOTE_RADIUS}
            />
          </svg>
        </div>
      </div>

      {/* Selected note info panel */}
      {selectedNote && (
        <NoteInfoPanel
          note={selectedNote}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {/* Floating instructions */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-8 sm:right-auto sm:bottom-8 bg-white/95 border border-gray-200 rounded-lg px-3 py-2 sm:px-5 sm:py-3 shadow-lg z-50 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)]">
        <p className="m-0 text-xs text-gray-600 sm:text-sm">
          💡{" "}
          <span className="hidden sm:inline">
            Click on the grid to add notes • Click notes to select • Press
            Delete to remove
          </span>
          <span className="sm:hidden">
            Tap grid to add • Tap notes to select
          </span>
        </p>
      </div>

      {/* Note Form Modal */}
      <NoteForm
        key={
          editingNote
            ? "id" in editingNote
              ? editingNote.id
              : `${editingNote.track}-${editingNote.time}`
            : "new"
        }
        note={editingNote}
        songDuration={song.duration}
        isOpen={showNoteForm}
        onClose={handleCloseNoteForm}
        onSuccess={
          editingNote && "id" in editingNote ? handleUpdateNote : handleAddNote
        }
      />
    </div>
  );
});

PianoRoll.displayName = "PianoRoll";

export default PianoRoll;
