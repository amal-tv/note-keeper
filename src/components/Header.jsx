import React, { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export const Header = () => {
  const { addNote } = useNotes();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNote(formData);
    setFormData({ title: "", tagline: "", content: "" });
    setOpen(false);
  };

  return (
    <div className="flex items-center pl-20 pr-20 pt-[50px]">
      <div>
        <div className="text-[#DCF2F1] font-sans text-6xl">NoteSpace</div>
        <div className="mt-4 flex justify-between gap-7">
          <Input
            type="text"
            placeholder="Search note"
            className="bg-[#534c82] text-white px-4 py-2 rounded-md shadow-sm w-[400px] focus-visible:ring-transparent"
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#71C0D4] to-[#5AA7BD] text-white hover:from-[#5AA7BD] hover:to-[#3C7896] rounded-lg px-6 py-2 font-semibold shadow-md">
                +
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#262f41] text-white">
              <DialogHeader>
                <DialogTitle>Create a New Note</DialogTitle>
                <DialogDescription>
                  Fill out the fields below to create a new note.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="bg-[#1d283a] text-white"
                  required
                />
                <Input
                  name="tagline"
                  type="text"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Tagline"
                  className="bg-[#1d283a] text-white"
                />
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your note content here..."
                  className="bg-[#1d283a] text-white"
                  required
                />
              </form>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-[#39c1f0]"
                >
                  Save Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
