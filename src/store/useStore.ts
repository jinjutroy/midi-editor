import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Store,  Song, SongFormData, Note, NoteFormData } from '../types';

const STORAGE_KEY = 'midi-editor-data';

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      songs: [],
      currentSongId: null,
      isLoading: false,
      loadingMessage: '',

      // Loading State Management
  setLoading: (isLoading: boolean, message?: string): void => {
    set({ isLoading, loadingMessage: message || '' });
  },

  // Song Management
  createSong: (songData: SongFormData): Song => {
    set({ isLoading: true, loadingMessage: 'Creating song...' });

    const newSong: Song = {
      id: uuidv4(),
      name: songData.name,
      description: songData.description || '',
      duration: songData.duration || 300,
      trackLabels: songData.trackLabels || [
        'Track 1',
        'Track 2',
        'Track 3',
        'Track 4',
        'Track 5',
        'Track 6',
        'Track 7',
        'Track 8',
      ],
      tags: songData.tags || [],
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set({
      songs: [...get().songs, newSong],
      currentSongId: newSong.id,
      isLoading: false,
      loadingMessage: '',
    });

    return newSong;
  },

  updateSong: (songId: string, updates: Partial<Omit<Song, 'id' | 'notes' | 'createdAt'>>): void => {
    set({ isLoading: true, loadingMessage: 'Updating song...' });

    set((state) => ({
      songs: state.songs.map((song) =>
        song.id === songId
          ? { ...song, ...updates, updatedAt: new Date().toISOString() }
          : song
      ),
      isLoading: false,
      loadingMessage: '',
    }));
  },

  deleteSong: (songId: string): void => {
    set({ isLoading: true, loadingMessage: 'Deleting song...' });

    set((state) => ({
      songs: state.songs.filter((song) => song.id !== songId),
      currentSongId: state.currentSongId === songId ? null : state.currentSongId,
      isLoading: false,
      loadingMessage: '',
    }));
  },

  setCurrentSong: (songId: string): void => {
    set({ currentSongId: songId });
  },

  getCurrentSong: (): Song | undefined => {
    const state = get();
    return state.songs.find((song) => song.id === state.currentSongId);
  },

  // Note Management
  addNote: (songId: string, noteData: NoteFormData): Note => {
    set({ isLoading: true, loadingMessage: 'Adding note...' });

    const state = get();
    const song = state.songs.find((s) => s.id === songId);

    if (!song) {
      set({ isLoading: false, loadingMessage: '' });
      throw new Error('Song not found');
    }

    // Validate: no two notes at the same track and time
    const existingNote = song.notes.find(
      (note) => note.track === noteData.track && note.time === noteData.time
    );

    if (existingNote) {
      set({ isLoading: false, loadingMessage: '' });
      throw new Error('A note already exists at this track and time position');
    }

    const newNote: Note = {
      id: uuidv4(),
      track: noteData.track,
      time: noteData.time,
      title: noteData.title,
      description: noteData.description || '',
      color: noteData.color || '#3b82f6',
      icon: noteData.icon || '',
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      songs: state.songs.map((song) =>
        song.id === songId
          ? {
              ...song,
              notes: [...song.notes, newNote],
              updatedAt: new Date().toISOString(),
            }
          : song
      ),
      isLoading: false,
      loadingMessage: '',
    }));

    return newNote;
  },

  updateNote: (songId: string, noteId: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): void => {
    set({ isLoading: true, loadingMessage: 'Updating note...' });

    const state = get();
    const song = state.songs.find((s) => s.id === songId);

    if (!song) {
      set({ isLoading: false, loadingMessage: '' });
      throw new Error('Song not found');
    }

    // If track or time is being updated, validate uniqueness
    if (updates.track !== undefined || updates.time !== undefined) {
      const note = song.notes.find((n) => n.id === noteId);
      if (!note) {
        set({ isLoading: false, loadingMessage: '' });
        throw new Error('Note not found');
      }

      const newTrack = updates.track !== undefined ? updates.track : note.track;
      const newTime = updates.time !== undefined ? updates.time : note.time;

      const conflictingNote = song.notes.find(
        (n) => n.id !== noteId && n.track === newTrack && n.time === newTime
      );

      if (conflictingNote) {
        set({ isLoading: false, loadingMessage: '' });
        throw new Error('A note already exists at this track and time position');
      }
    }

    set((state) => ({
      songs: state.songs.map((song) =>
        song.id === songId
          ? {
              ...song,
              notes: song.notes.map((note) =>
                note.id === noteId ? { ...note, ...updates } : note
              ),
              updatedAt: new Date().toISOString(),
            }
          : song
      ),
      isLoading: false,
      loadingMessage: '',
    }));
  },

  deleteNote: (songId: string, noteId: string): void => {
    set({ isLoading: true, loadingMessage: 'Deleting note...' });

    set((state) => ({
      songs: state.songs.map((song) =>
        song.id === songId
          ? {
              ...song,
              notes: song.notes.filter((note) => note.id !== noteId),
              updatedAt: new Date().toISOString(),
            }
          : song
      ),
      isLoading: false,
      loadingMessage: '',
    }));
  },

  // Export/Import
  exportData: (): string => {
    set({ isLoading: true, loadingMessage: 'Exporting data...' });
    const state = get();
    const exported = JSON.stringify({ songs: state.songs }, null, 2);
    set({ isLoading: false, loadingMessage: '' });
    return exported;
  },

  importData: (jsonString: string): boolean => {
    set({ isLoading: true, loadingMessage: 'Importing data...' });

    try {
      const data = JSON.parse(jsonString);
      if (!data.songs || !Array.isArray(data.songs)) {
        throw new Error('Invalid data format');
      }

      set({
        songs: data.songs,
        currentSongId: data.songs.length > 0 ? data.songs[0]!.id : null,
        isLoading: false,
        loadingMessage: '',
      });

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      set({ isLoading: false, loadingMessage: '' });
      return false;
    }
  },

  clearAllData: (): void => {
    set({ isLoading: true, loadingMessage: 'Clearing data...' });
    set({
      songs: [],
      currentSongId: null,
      isLoading: false,
      loadingMessage: '',
    });
  },
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useStore;
