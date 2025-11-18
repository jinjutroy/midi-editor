import React from "react";

interface NoteFormButtonsProps {
  isEdit: boolean | null | undefined;
  onCancel: () => void;
}

const NoteFormButtons = React.memo<NoteFormButtonsProps>(
  ({ isEdit, onCancel }) => {
    return (
      <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-gray-200">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Update Note" : "Add Note"}
        </button>
      </div>
    );
  }
);

NoteFormButtons.displayName = "NoteFormButtons";

export default NoteFormButtons;
