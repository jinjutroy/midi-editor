import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface SongFormInputs {
  name: string;
  description: string;
  duration: number;
  tags: string;
  track1: string;
  track2: string;
  track3: string;
  track4: string;
  track5: string;
  track6: string;
  track7: string;
  track8: string;
}

interface SongTrackLabelsProps {
  register: UseFormRegister<SongFormInputs>;
  errors: FieldErrors<SongFormInputs>;
}

/**
 * Track labels section component
 * Displays 8 track label input fields with validation
 */
const SongTrackLabels = React.memo<SongTrackLabelsProps>(
  ({ register, errors }) => {
    return (
      <div className="pt-6 mt-8 border-t border-gray-200">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Track Labels
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num}>
              <label
                htmlFor={`track${num}`}
                className="block mb-1.5 text-gray-600 font-medium text-xs"
              >
                Track {num}
              </label>
              <input
                id={`track${num}`}
                type="text"
                {...register(`track${num}` as keyof SongFormInputs, {
                  maxLength: {
                    value: 50,
                    message: "Track label must not exceed 50 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s\-_.,()]+$/,
                    message: "Track label contains invalid characters",
                  },
                })}
                placeholder={`Track ${num}`}
                className="w-full px-2.5 py-1.5 border-2 border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all"
              />
              {errors[`track${num}` as keyof SongFormInputs] && (
                <span className="block mt-1 text-xs text-red-600">
                  {errors[`track${num}` as keyof SongFormInputs]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

SongTrackLabels.displayName = "SongTrackLabels";

export default SongTrackLabels;
