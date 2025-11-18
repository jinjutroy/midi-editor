import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingOverlayProps {
  message?: string;
}

/**
 * Full-screen loading overlay
 * Blocks interaction while content is loading
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl p-8 flex flex-col items-center gap-4 min-w-[200px]">
        <LoadingSpinner size="lg" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
