import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { getNotes, updateNote } from "@/api/apiNotes";

export const NoteCard = ({ note, bgColor, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title || "",
    tagline: note.tagline || "",
    content: note.content || "",
  });


  const {fn : fnupdateNote,loading : loadingUpdate, error : errorUpdate}  = useFetch(updateNote)

  const handleSave = async() => {
   await fnupdateNote(note.id, editedNote);
   setIsEditing(false);

  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={`rounded-lg shadow-lg p-4 border border-[#BCC3C8] hover:bg-opacity-90 transition relative cursor-pointer`}
          style={{ backgroundColor: bgColor }}
        >
          <CardHeader>
            <CardTitle className="text-[#2E3E4E] hover:text-[#1C2834] text-3xl font-semibold">
              {note.title || "Untitled"}
            </CardTitle>
            <p className="text-[#2E3E4E] hover:text-[#1C2834] text-sm">
              {note.tagline || "No tagline provided"}
            </p>
          </CardHeader>
          <CardContent className="mt-2">
            <p className="text-[#d1d5db]">{note.content || "No content available"}</p>
          </CardContent>
          <CardFooter className="mt-4 text-sm text-[#6c757d]">
            {note.createdAt || "N/A"}
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Note" : "View Note"}
          </DialogTitle>
        </DialogHeader>
        
        {isEditing ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="title"
                value={editedNote.title}
                onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="tagline"
                value={editedNote.tagline}
                onChange={(e) => setEditedNote({...editedNote, tagline: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Textarea
                id="content"
                value={editedNote.content}
                onChange={(e) => setEditedNote({...editedNote, content: e.target.value})}
                className="col-span-3 min-h-[200px]"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <h2 className="text-2xl font-bold">{note.title}</h2>
            <p className="text-sm text-gray-500">{note.tagline}</p>
            <p className="mt-4">{note.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              Created at: {note.createdAt}
            </p>
          </div>
        )}
        
        <div className="flex justify-between">
          {isEditing ? (
            <Button onClick={handleSave}>Save Changes</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
          <Button variant="destructive" onClick={handleDelete}>
            Delete Note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};