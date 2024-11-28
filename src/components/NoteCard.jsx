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
import toast from "react-hot-toast";
import { motion } from "framer-motion";  

export const NoteCard = ({ note, bgColor }) => {
  const { editNote, removeNote, pinNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async () => {
    try {
      await editNote(note.id, editedNote);
      setIsEditing(false);
      toast.success("Edited successfully");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await removeNote(note.id);
      toast.success("Note deleted successfully");
    } catch (err) {
      toast.error(err);
    }
  };

  const handlePinNotes = async () => {
    const newPinState = !note.isPinned;
    await pinNote(note.id, newPinState);
  };

  
  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString("en-US", {
        month: "short", 
        day: "2-digit", 
        year: "numeric", 
      })
    : "N/A"; 

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        if (!isOpen) setIsEditing(false);
      }}
    >
      <DialogTrigger asChild>
        <Card className="group rounded-lg shadow-lg p-4 border border-[#BCC3C8] hover:bg-opacity-90 hover:scale-105  transition relative cursor-pointer" style={{ backgroundColor: bgColor }}>
          <CardHeader>
            <div className="flex justify-between">
             <div>
              <CardTitle className="text-3xl">{note.title || "Untitled"}</CardTitle>
               <div className="pt-2 text-gray-500">{note.tagline}</div>
             </div>
              {note.isPinned ? (
                <motion.div
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinNotes();
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  whileTap={{ scale: 0.9, rotate: 3 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <PinOff className="text-[#0C1536]" size={24} />
                </motion.div>
              ) : (
                <motion.div
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinNotes();
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  whileTap={{ scale: 0.9, rotate: 3 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Pin className="text-[#0C1536]" size={24} />
                </motion.div>
              )}
            </div>
          </CardHeader>
          <CardContent>{note.content
    ? `${note.content.slice(0, 100)}${note.content.length > 10 ? "..." : ""}`
    : "No content available"}</CardContent>
          <CardFooter>
            <div className="text-xs">
            {formattedDate}
              </div></CardFooter> 
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
            <p className="text-">{note.tagline || "No tagline available"}</p>
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
