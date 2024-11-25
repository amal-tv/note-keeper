import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pin, Edit, Trash } from "lucide-react";

export const NoteCard = ({ note, onPin, onEdit, onDelete }) => {
  return (
    <Card className="bg-[#262f41] rounded-lg shadow-lg p-4 border border-transparent hover:border-[#3a4a63] transition relative">
      {/* Actions (Pin, Edit, Delete) */}
      <div className="absolute top-4 right-4 flex space-x-3">
        <button
          onClick={() => onPin(note)}
          className="text-[#96a2b3] hover:text-white transition"
          title="Pin Note"
        >
          <Pin className={`h-5 w-5 ${note.isPinned ? "text-yellow-400" : ""}`} />
        </button>
        <button
          onClick={() => onEdit(note)}
          className="text-[#96a2b3] hover:text-white transition"
          title="Edit Note"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(note)}
          className="text-[#96a2b3] hover:text-red-500 transition"
          title="Delete Note"
        >
          <Trash className="h-5 w-5" />
        </button>
      </div>

      {/* Card Content */}
      <CardHeader>
        <CardTitle className="text-white text-lg font-semibold">
          {note.title || "Untitled"}
        </CardTitle>
        <p className="text-[#96a2b3] text-sm">
          {note.tagline || "No tagline provided"}
        </p>
      </CardHeader>
      <CardContent className="mt-2">
        <p className="text-[#d1d5db]">{note.content || "No content available"}</p>
      </CardContent>
      <CardFooter className="mt-4 text-sm text-[#6c757d]">
        Created at: {note.createdAt || "N/A"}
      </CardFooter>
    </Card>
  );
};
