import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useStore from "../../store/useStore";
import type { SongFormProps } from "../../types";
import Modal from "../common/Modal";
import SongBasicFields from "./SongForm/SongBasicFields";
import SongTrackLabels from "./SongForm/SongTrackLabels";
import SongFormButtons from "./SongForm/SongFormButtons";
import LoadingSpinner from "../common/LoadingSpinner";

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

const SongForm = React.memo<SongFormProps>(
  ({ song, isOpen, onClose, onSuccess }) => {
    const { createSong, updateSong } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEdit = !!song;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SongFormInputs>({
      defaultValues: song
        ? {
            name: song.name,
            description: song.description,
            duration: song.duration,
            tags: song.tags?.join(", ") || "",
            track1: song.trackLabels?.[0] || "Track 1",
            track2: song.trackLabels?.[1] || "Track 2",
            track3: song.trackLabels?.[2] || "Track 3",
            track4: song.trackLabels?.[3] || "Track 4",
            track5: song.trackLabels?.[4] || "Track 5",
            track6: song.trackLabels?.[5] || "Track 6",
            track7: song.trackLabels?.[6] || "Track 7",
            track8: song.trackLabels?.[7] || "Track 8",
          }
        : {
            name: "",
            description: "",
            duration: 300,
            tags: "",
            track1: "Track 1",
            track2: "Track 2",
            track3: "Track 3",
            track4: "Track 4",
            track5: "Track 5",
            track6: "Track 6",
            track7: "Track 7",
            track8: "Track 8",
          },
    });

    const onSubmit: SubmitHandler<SongFormInputs> = async (data) => {
      setIsSubmitting(true);
      try {
        // Transform form data into song data format
        const songData = {
          name: data.name.trim(),
          description: data.description?.trim() || "",
          duration: Number(data.duration),
          // Parse comma-separated tags, trim whitespace, remove empty tags
          tags: data.tags
            ? data.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
          // Collect all 8 track labels with fallback defaults
          trackLabels: [
            data.track1?.trim() || "Track 1",
            data.track2?.trim() || "Track 2",
            data.track3?.trim() || "Track 3",
            data.track4?.trim() || "Track 4",
            data.track5?.trim() || "Track 5",
            data.track6?.trim() || "Track 6",
            data.track7?.trim() || "Track 7",
            data.track8?.trim() || "Track 8",
          ],
        };

        // Update existing song or create new one
        if (isEdit && song) {
          updateSong(song.id, songData);
        } else {
          createSong(songData);
        }

        // Notify parent component of successful submission
        onSuccess?.();
      } catch (error) {
        // Display error message to user
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        alert("Error saving song: " + errorMessage);
        console.error("Song form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Edit Song" : "Create New Song"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {isSubmitting ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <LoadingSpinner size="lg" />
              <p className="text-gray-600">
                {isEdit ? "Updating song..." : "Creating song..."}
              </p>
            </div>
          ) : (
            <>
              <SongBasicFields register={register} errors={errors} />
              <SongTrackLabels register={register} errors={errors} />
              <SongFormButtons isEdit={isEdit} onCancel={onClose} />
            </>
          )}
        </form>
      </Modal>
    );
  }
);

SongForm.displayName = "SongForm";

export default SongForm;
