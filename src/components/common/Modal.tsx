import React from "react";
import type { ModalProps } from "../../types";

const Modal = React.memo<ModalProps>(({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 text-3xl w-8 h-8 flex items-center justify-center rounded transition-all duration-200"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          {children}
        </div>
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;
