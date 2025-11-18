import React, { useRef, useState } from "react";
import useStore from "../../store/useStore";
import Modal from "./Modal";
import LoadingSpinner from "./LoadingSpinner";

const ExportImport = React.memo(() => {
  const { exportData, importData } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    setIsProcessing(true);
    try {
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
      const data = exportData();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `midi-editor-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        // Small delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 300));
        const success = importData(result);
        if (success) {
          setModalTitle("Success");
          setModalMessage("Data imported successfully!");
          setShowModal(true);
        } else {
          setModalTitle("Error");
          setModalMessage(
            "Failed to import data. Please check the file format."
          );
          setShowModal(true);
        }
      }
      setIsProcessing(false);
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        onClick={handleExport}
        disabled={isProcessing}
        className="text-sm btn btn-primary sm:text-base"
        title="Export all data"
      >
        {isProcessing ? <LoadingSpinner size="sm" /> : "💾"}{" "}
        <span className="hidden sm:inline">Export</span>
      </button>
      <label
        className={`btn btn-secondary cursor-pointer inline-flex items-center justify-center text-sm sm:text-base ${
          isProcessing ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={isProcessing ? undefined : triggerFileInput}
        title="Import data from file"
      >
        {isProcessing ? <LoadingSpinner size="sm" /> : "📁"}{" "}
        <span className="hidden sm:inline">Import</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
        disabled={isProcessing}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
      >
        <div className="p-8">
          <p className="mb-6 text-base text-gray-700">{modalMessage}</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-primary"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

ExportImport.displayName = "ExportImport";

export default ExportImport;
