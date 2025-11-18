import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface NoteFormInputs {
  track: number;
  time: number;
  title: string;
  description: string;
  color: string;
  icon: string;
}

interface NoteFormFieldsProps {
  register: UseFormRegister<NoteFormInputs>;
  errors: FieldErrors<NoteFormInputs>;
  songDuration: number;
  colorValue: string;
  onColorChange: (color: string) => void;
}

const NoteFormFields = React.memo<NoteFormFieldsProps>(
  ({ register, errors, songDuration, colorValue, onColorChange }) => {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="track"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Track <span className="text-red-600">*</span>
            </label>
            <select
              id="track"
              {...register("track", { required: "Track is required" })}
              className="w-full px-3 py-2 text-base transition-all bg-white border-2 border-gray-200 rounded-md cursor-pointer focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  Track {num}
                </option>
              ))}
            </select>
            {errors.track && (
              <span className="block mt-1 text-sm text-red-600">
                {errors.track.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Time (seconds) <span className="text-red-600">*</span>
            </label>
            <input
              id="time"
              type="number"
              step="0.1"
              {...register("time", {
                required: "Time is required",
                min: { value: 0, message: "Time must be >= 0" },
                max: {
                  value: songDuration || 300,
                  message: `Time must be <= ${songDuration || 300}s`,
                },
              })}
              className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            {errors.time && (
              <span className="block mt-1 text-sm text-red-600">
                {errors.time.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Note title"
            className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
          {errors.title && (
            <span className="block mt-1 text-sm text-red-600">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Optional description..."
            rows={3}
            className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md resize-y min-h-20 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="color"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <div className="flex items-center gap-2">
              <input
                id="color"
                type="color"
                value={colorValue}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-[60px] h-[42px] p-1 border-2 border-gray-200 rounded-md cursor-pointer focus:outline-none focus:border-primary-500"
              />
              <input
                type="text"
                value={colorValue}
                onChange={(e) => onColorChange(e.target.value)}
                className="flex-1 px-3 py-2 font-mono text-sm transition-all border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="icon"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Icon (emoji)
            </label>
            <input
              id="icon"
              type="text"
              {...register("icon")}
              placeholder="🎵"
              maxLength={2}
              className="w-full px-3 py-2 text-base transition-all border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
      </>
    );
  }
);

NoteFormFields.displayName = "NoteFormFields";

export default NoteFormFields;
