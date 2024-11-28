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
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "motion/react";

export const Header = ({ setSearchQuery }) => {
  const { addNote } = useNotes();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    content: "",
  });
  const [searchQuery, setLocalSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNote(formData);
      setFormData({ title: "", tagline: "", content: "" });
      setOpen(false);
      toast.success("Note created successfully!");
    } catch (err) {
      toast.error("Failed to create note. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setSearchQuery(query);
  };

  return (
    <div className="flex items-center pl-20 sm:pr-20 pt-[50px] mr-[150px]">
      <div>
        <motion.div initial={{y : -30, opacity : 0}}
        animate ={{ y: 0, opacity : 1}}
        transition={{duration : 1,ease : "easeInOut" }}
         className="text-[#DCF2F1] font-sans text-6xl">NoteSpace</motion.div>
        <div className="mt-4 flex justify-between gap-7">
          <div className="flex items-center bg-[#534c82] text-white px-4 rounded-md w-[200px] sm:w-[400px]">
            <Search className="text-white mr-2" size={18} />
            <Input
              type="text"
              placeholder="Search note"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-[#534c82] border-none focus:outline-none placeholder-opacity-100  rounded-md"
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
          <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{scale : 0.9}}
                className="bg-red-500 rounded-full text-white px-6 py-2 font-semibold shadow-md text-2xl"
              >
                +
              </motion.button>
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
                <motion.Button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-red-500 text-white p-2 rounded-sm"
                 
                >
                  Save Note
                </motion.Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
