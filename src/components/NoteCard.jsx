import React, { useState } from "react";
import { useNotes } from "../context/NotesContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Pin } from "lucide-react";
import { PinOff } from 'lucide-react';

export const NoteCard = ({ note,bgColor }) => {
  const { editNote, removeNote, pinNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async () => {
    await editNote(note.id, editedNote);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await removeNote(note.id);
  };

  const handlePinNotes = async () => {
    const newPinState = !note.isPinned;
    await pinNote(note.id, newPinState);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        if (!isOpen) setIsEditing(false);
      }}
    >
      <DialogTrigger asChild>
        <Card className="group rounded-lg shadow-lg p-4 border border-[#BCC3C8] hover:bg-opacity-90 transition relative cursor-pointer"  style={{ backgroundColor: bgColor }}>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{note.title || "Untitled"}</CardTitle>
              {note.isPinned ?  (
                 <PinOff onClick={(e) => {
                  e.stopPropagation();
                  handlePinNotes();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer" /> 
                )
              : (<Pin
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinNotes();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              />)}
            </div>
          </CardHeader>
          <CardContent>{note.content || "No content available"}</CardContent>
          <CardFooter>{note.createdAt || "N/A"}</CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent style={{ backgroundColor: bgColor }}>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Note" : ""}</DialogTitle>
        </DialogHeader>
        {isEditing ? (
          <>
            <Input
              value={editedNote.title}
              onChange={(e) =>
                setEditedNote({ ...editedNote, title: e.target.value })
              }
            />
            <Input
              placeholder="Tagline" 
              value={editedNote.tagline || ""}
              onChange={(e) =>
                setEditedNote({ ...editedNote, tagline: e.target.value })
              }
            />
            <Textarea
              value={editedNote.content}
              onChange={(e) =>
                setEditedNote({ ...editedNote, content: e.target.value })
              }
           />
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">{note.title || "Untitled"}</h2>
            <p className="text-">
              {note.tagline || "No tagline available"}
            </p>
            <p className="pt-3">{note.content || "No content available"}</p>
          </div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit</Button>}
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
