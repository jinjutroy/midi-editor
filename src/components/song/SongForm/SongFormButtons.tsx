import React from "react";

interface SongFormButtonsProps {
  isEdit: boolean;
  onCancel: () => void;
}

/**
 * Form action buttons component
 * Displays Cancel and Submit buttons with appropriate labels
 */
const SongFormButtons = React.memo<SongFormButtonsProps>(
  ({ isEdit, onCancel }) => {
    return (
      <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-gray-200">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Update Song" : "Create Song"}
        </button>
      </div>
    );
  }
);

SongFormButtons.displayName = "SongFormButtons";

export default SongFormButtons;
