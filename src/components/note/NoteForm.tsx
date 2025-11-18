import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NoteFormProps, NoteFormData } from "../../types";
import Modal from "../common/Modal";
import NoteFormButtons from "./noteform/NoteFormButtons";
import NoteFormFields from "./noteform/NoteFormFields";
import LoadingSpinner from "../common/LoadingSpinner";

interface NoteFormInputs {
  track: number;
  time: number;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const NoteForm = React.memo<NoteFormProps>(
  ({ note, songDuration, isOpen, onClose, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEdit = note && "id" in note;

    const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm<NoteFormInputs>({
      defaultValues: note
        ? {
            track: note.track,
            time: note.time,
            title: "title" in note ? note.title : "",
            description: "description" in note ? note.description : "",
            color: "color" in note ? note.color : "#3b82f6",
            icon: "icon" in note ? note.icon : "",
          }
        : {
            track: 1,
            time: 0,
            title: "",
            description: "",
            color: "#3b82f6",
            icon: "",
          },
    });

    const colorValue = watch("color");

    const onSubmit: SubmitHandler<NoteFormInputs> = async (data) => {
      setIsSubmitting(true);
      try {
        // Transform form data into note data format
        const noteData: NoteFormData = {
          track: Number(data.track),
          time: Number(data.time),
          title: data.title.trim(),
          description: data.description?.trim() || "",
          color: data.color,
          icon: data.icon?.trim() || "",
        };

        // Submit note data to parent component
        // Parent will handle actual save to store and error handling
        onSuccess(noteData);
      } catch (error) {
        // Log any unexpected errors during form processing
        console.error("Note form submission error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        alert("Error saving note: " + errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleColorChange = (color: string) => {
      setValue("color", color);
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Edit Note" : "Add New Note"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {isSubmitting ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <LoadingSpinner size="lg" />
              <p className="text-gray-600">
                {isEdit ? "Updating note..." : "Adding note..."}
              </p>
            </div>
          ) : (
            <>
              <NoteFormFields
                register={register}
                errors={errors}
                songDuration={songDuration}
                colorValue={colorValue}
                onColorChange={handleColorChange}
              />
              <NoteFormButtons isEdit={isEdit} onCancel={onClose} />
            </>
          )}
        </form>
      </Modal>
    );
  }
);

NoteForm.displayName = "NoteForm";

export default NoteForm;
