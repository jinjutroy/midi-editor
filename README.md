# 🎹 MIDI Editor - Piano Roll DAW-style Editor

A modern, full-featured MIDI Editor with piano roll visualization inspired by professional DAWs like FL Studio and Ableton Live. Built with React and designed for intuitive music composition.

![MIDI Editor](https://img.shields.io/badge/Built%20with-React-61dafb?style=for-the-badge&logo=react)
![State Management](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)
![Forms](https://img.shields.io/badge/Forms-React%20Hook%20Form-EC5990?style=for-the-badge)

## ✨ Features

### 🎵 Complete Song Management (CRUD)
- **Create** new songs with customizable settings
- **Read/List** all saved songs in a beautiful grid layout
- **Update** song properties including name, description, duration, and track labels
- **Delete** songs with confirmation dialogs
- Each song includes:
  - Name (required)
  - Description (optional)
  - Total duration (10-600 seconds)
  - 8 customizable track labels
  - Tags for organization

### 🎼 Advanced Note Management
- **Full CRUD operations** for MIDI notes
- Each note contains:
  - Track position (1-8)
  - Time position (0 to song duration)
  - Title (required)
  - Description (optional)
  - Custom color picker
  - Emoji icon support
- **Validation**: Prevents duplicate notes at the same track + time position
- **Keyboard shortcuts**:
  - `Delete` key to remove selected notes
  - `Escape` to deselect

### 🎨 Professional Piano Roll Visualization
- **Vertical timeline** layout (0s at top → duration at bottom)
- **8 horizontal tracks** as columns
- **Precise grid system**:
  - Major grid lines every 10 seconds
  - Minor grid lines every 1 second
  - Clear track separators
- **Interactive notes**:
  - Circular note representation
  - Color-coded for easy identification
  - Hover effects and animations
  - Selection highlighting
  - Click to select, view details, edit, or delete
- **Track headers** with customizable labels
- **Timeline markers** with second indicators
- **Click-to-add**: Click anywhere on the grid to add a new note
- **Real-time updates**: All changes reflected immediately

### 💾 Data Persistence
- **localStorage integration** - data persists across browser sessions
- **Auto-save** on every change
- **Export/Import** functionality:
  - Export all songs to JSON format
  - Import from JSON backup files
  - Timestamped export filenames
  - Full data validation on import

### 🎯 Additional Features
- **Responsive design** - works on desktop and tablet
- **Clean, modern UI** with purple gradient theme
- **Intuitive navigation** between song list and editor views
- **Visual feedback** for all interactions
- **Error handling** with user-friendly messages
- **Form validation** with React Hook Form

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19+ or v22.12+ recommended)
- Yarn package manager

### Installation

1. **Install dependencies**:
```bash
yarn install --ignore-engines
```

2. **Start the development server**:
```bash
yarn dev
```

3. **Open your browser** and navigate to:
```
http://localhost:5173
```

## 📦 Technologies Used

- **React 19.2** - UI library with modern hooks
- **Vite 7.2** - Fast build tool and dev server
- **Zustand 5.0** - Lightweight state management
- **React Hook Form 7.66** - Performant form validation
- **UUID** - Unique identifier generation
- **SVG** - Vector graphics for piano roll rendering
- **localStorage** - Client-side data persistence

## 🎮 How to Use

### Creating Your First Song

1. Click **"+ New Song"** button
2. Fill in the song details:
   - Enter a name (required)
   - Add an optional description
   - Set duration (10-600 seconds)
   - Customize track labels
   - Add tags for organization
3. Click **"Create Song"**

### Adding Notes

1. Select a song from the list
2. In the piano roll view, **click on any grid position** to add a note
3. Fill in the note form:
   - Track (automatically set based on click)
   - Time (automatically set based on click)
   - Title (required)
   - Optional description
   - Choose a color
   - Add an emoji icon
4. Click **"Add Note"**

### Editing Notes

1. **Click on a note** to select it
2. View note details in the info panel
3. Click **"Edit"** to modify
4. Or press **Delete** key to remove

### Managing Songs

- **View all songs**: Displayed in a grid with metadata
- **Edit song**: Click on a song card to open it
- **Delete song**: Click the × button on a song card
- **Export data**: Click "📥 Export Data" to download JSON backup
- **Import data**: Click "📤 Import Data" to restore from JSON file

## 📁 Project Structure

```
midi-editor/
├── src/
│   ├── components/
│   │   ├── SongList.jsx          # Song listing component
│   │   ├── SongList.css
│   │   ├── SongForm.jsx          # Song create/edit form
│   │   ├── SongForm.css
│   │   ├── NoteForm.jsx          # Note create/edit form
│   │   ├── NoteForm.css
│   │   ├── PianoRoll.jsx         # Main piano roll visualization
│   │   ├── PianoRoll.css
│   │   ├── ExportImport.jsx      # Data export/import component
│   │   └── ExportImport.css
│   ├── store/
│   │   └── useStore.js           # Zustand state management
│   ├── App.jsx                   # Main application component
│   ├── App.css
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Piano Roll Layout

```
┌──────────┬────────┬────────┬────────┬────────┬────────┬────────┬────────┬────────┐
│ Timeline │ Track 1│ Track 2│ Track 3│ Track 4│ Track 5│ Track 6│ Track 7│ Track 8│
├──────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│   0s     │        │        │   ●    │        │        │        │        │        │
│   1s     │   ●    │        │        │        │        │        │        │        │
│   2s     │        │        │        │   ●    │        │        │        │        │
│   ...    │        │   ●    │        │        │        │        │   ●    │        │
│  10s     ├────────┴────────┴────────┴────────┴────────┴────────┴────────┴────────┤
│  11s     │                      Notes as colored circles                          │
│   ...    │                                                                         │
└──────────┴─────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Configuration

### Customizing Piano Roll Settings

Edit `src/components/PianoRoll.jsx` to adjust:

```javascript
const TRACK_WIDTH = 120;              // Width of each track column (px)
const PIXELS_PER_SECOND = 40;         // Vertical spacing per second
const NUM_TRACKS = 8;                 // Number of tracks
const MAJOR_GRID_INTERVAL = 10;       // Major grid line interval (seconds)
const MINOR_GRID_INTERVAL = 1;        // Minor grid line interval (seconds)
const NOTE_RADIUS = 10;               // Size of note circles (px)
```

## 🌟 Future Enhancements

- [ ] **Drag & Drop** - Move notes by dragging
- [ ] **Note Duration** - Add note length visualization
- [ ] **Playback** - Audio playback with Web Audio API
- [ ] **MIDI Export** - Export to standard MIDI files
- [ ] **Undo/Redo** - History management
- [ ] **Copy/Paste** - Duplicate notes easily
- [ ] **Zoom** - Adjust timeline scale
- [ ] **Backend Integration** - Save to server/database
- [ ] **Multi-user Collaboration** - Real-time editing
- [ ] **Velocity Control** - Note velocity/volume

## 📝 Data Format

### Exported JSON Structure

```json
{
  "songs": [
    {
      "id": "uuid-here",
      "name": "My Song",
      "description": "A cool track",
      "duration": 300,
      "trackLabels": ["Bass", "Drums", "Lead", "Synth", "FX", "Vocal", "Keys", "Perc"],
      "tags": ["electronic", "house"],
      "notes": [
        {
          "id": "uuid-here",
          "track": 1,
          "time": 5.5,
          "title": "Kick",
          "description": "Main kick drum",
          "color": "#3b82f6",
          "icon": "🥁",
          "createdAt": "2025-11-16T..."
        }
      ],
      "createdAt": "2025-11-16T...",
      "updatedAt": "2025-11-16T..."
    }
  ]
}
```

## 🐛 Troubleshooting

### Node Version Warning
If you see a Node.js version warning, the app will still work. To remove the warning:
- Upgrade Node.js to v20.19+ or v22.12+
- Or continue using with `--ignore-engines` flag

### Lost Data
If data is lost:
1. Check browser localStorage (Developer Tools → Application → Local Storage)
2. Restore from a JSON export file
3. Ensure localStorage is enabled in browser settings

### Notes Not Appearing
- Ensure note time is within song duration
- Check that track number is between 1-8
- Verify no duplicate note exists at same position

## 💡 Tips

- **Use tags** to organize songs by genre, mood, or project
- **Export regularly** to backup your work
- **Customize track labels** to match your instruments
- **Use colors** to differentiate note types (drums, melody, bass, etc.)
- **Add emoji icons** for quick visual identification

---

Built with ❤️ using React and modern web technologies.
