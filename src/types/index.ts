// Core data types
export interface Note {
  id: string;
  track: number;
  time: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  createdAt: string;
}

export interface Song {
  id: string;
  name: string;
  description: string;
  duration: number;
  trackLabels: string[];
  tags: string[];
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

// Form data types
export interface SongFormData {
  name: string;
  description?: string;
  duration?: number;
  trackLabels?: string[];
  tags?: string[];
}

export interface NoteFormData {
  track: number;
  time: number;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
}

// Store state and actions
export interface StoreState {
  songs: Song[];
  currentSongId: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

export interface StoreActions {
  setLoading: (isLoading: boolean, message?: string) => void;
  createSong: (songData: SongFormData) => Song;
  updateSong: (songId: string, updates: Partial<Omit<Song, 'id' | 'notes' | 'createdAt'>>) => void;
  deleteSong: (songId: string) => void;
  setCurrentSong: (songId: string) => void;
  getCurrentSong: () => Song | undefined;
  addNote: (songId: string, noteData: NoteFormData) => Note;
  updateNote: (songId: string, noteId: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  deleteNote: (songId: string, noteId: string) => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  clearAllData: () => void;
}

export type Store = StoreState & StoreActions;

// Component prop types
export interface SongListProps {
  onSelectSong: (song: Song) => void;
  onCreateNew: () => void;
}

export interface SongCardProps {
  song: Song;
  isActive: boolean;
  onSelect: (song: Song) => void;
  onDelete: (songId: string) => void;
}

export interface SongFormProps {
  song?: Song | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface PianoRollProps {
  song: Song;
  onEditSong?: (song: Song) => void;
}

export interface NoteFormProps {
  note?: Note | { track: number; time: number } | null;
  songDuration: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (noteData: NoteFormData) => void;
}

export interface NoteInfoPanelProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface PianoRollGridProps {
  totalWidth: number;
  totalHeight: number;
  song: Song;
  TRACK_WIDTH: number;
  TIMELINE_WIDTH: number;
  HEADER_HEIGHT: number;
  NUM_TRACKS: number;
  PIXELS_PER_SECOND: number;
  MINOR_GRID_INTERVAL: number;
  MAJOR_GRID_INTERVAL: number;
}

export interface PianoRollNotesProps {
  notes: Note[];
  selectedNoteId?: string;
  TIMELINE_WIDTH: number;
  HEADER_HEIGHT: number;
  TRACK_WIDTH: number;
  PIXELS_PER_SECOND: number;
  NOTE_RADIUS: number;
}
