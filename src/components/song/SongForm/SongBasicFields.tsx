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

interface SongBasicFieldsProps {
  register: UseFormRegister<SongFormInputs>;
  errors: FieldErrors<SongFormInputs>;
}

/**
 * Basic song information fields component
 * Handles name, description, duration, and tags inputs
 */
const SongBasicFields = React.memo<SongBasicFieldsProps>(
  ({ register, errors }) => {
    return (
      <>
        {/* Song Name Field - Required with length validation */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Song Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Song name is required",
              minLength: {
                value: 2,
                message: "Song name must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Song name must not exceed 100 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
                message: "Song name contains invalid characters",
              },
            })}
            placeholder="My Awesome Song"
            className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
          {errors.name && (
            <span className="block mt-1 text-sm text-red-600">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Description Field - Optional with max length validation */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Description must not exceed 500 characters",
              },
            })}
            placeholder="Optional description..."
            rows={3}
            className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md resize-y min-h-20 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
          {errors.description && (
            <span className="block mt-1 text-sm text-red-600">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Duration Field - Required, must be between 10-600 seconds */}
        <div>
          <label
            htmlFor="duration"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Duration (seconds) <span className="text-red-600">*</span>
          </label>
          <input
            id="duration"
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: {
                value: 10,
                message: "Minimum duration is 10 seconds",
              },
              max: {
                value: 600,
                message: "Maximum duration is 600 seconds (10 minutes)",
              },
              valueAsNumber: true,
              validate: {
                isInteger: (value) =>
                  Number.isInteger(value) || "Duration must be a whole number",
                isPositive: (value) => value > 0 || "Duration must be positive",
              },
            })}
            min="10"
            max="600"
            step="1"
            className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
          {errors.duration && (
            <span className="block mt-1 text-sm text-red-600">
              {errors.duration.message}
            </span>
          )}
        </div>

        {/* Tags Field - Optional, comma-separated with validation */}
        <div>
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            {...register("tags", {
              maxLength: {
                value: 200,
                message: "Tags must not exceed 200 characters",
              },
              validate: {
                validFormat: (value) => {
                  if (!value) return true;
                  // Check for valid tag format (alphanumeric, spaces, hyphens)
                  const tags = value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                  const invalidTag = tags.find(
                    (tag) => !/^[a-zA-Z0-9\s\-_]+$/.test(tag)
                  );
                  return (
                    !invalidTag ||
                    "Tags can only contain letters, numbers, spaces, and hyphens"
                  );
                },
                maxTags: (value) => {
                  if (!value) return true;
                  const tags = value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
                  return tags.length <= 10 || "Maximum 10 tags allowed";
                },
              },
            })}
            placeholder="electronic, house, experimental"
            className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
          {errors.tags && (
            <span className="block mt-1 text-sm text-red-600">
              {errors.tags.message}
            </span>
          )}
        </div>
      </>
    );
  }
);

SongBasicFields.displayName = "SongBasicFields";

export default SongBasicFields;
