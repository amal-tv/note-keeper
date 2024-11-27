import React, { createContext, useContext, useState, useEffect } from "react";
import { getNotes, addNewNote, updateNote, deleteNote } from "../api/apiNotes";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError("Failed to fetch notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async (noteData) => {
    setLoading(true);
    setError(null);
    try {
      await addNewNote(noteData);
      const updatedNotes = await getNotes();
      setNotes(updatedNotes);
    } catch (err) {
      setError("Failed to add note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const editNote = async (noteId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      await updateNote(noteId, updatedData);
      const updatedNotes = await getNotes();
      setNotes(updatedNotes);
    } catch (err) {
      setError("Failed to edit note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (noteId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteNote(noteId);
      const updatedNotes = await getNotes();
      setNotes(updatedNotes);
    } catch (err) {
      setError("Failed to delete note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pinNote = async (noteId, isPinned) => {
    setLoading(true);
    setError(null);
    try {
      await updateNote(noteId, { isPinned });
      const updatedNotes = await getNotes();
      setNotes(updatedNotes);
    } catch (err) {
      setError("Failed to pin/unpin note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const getPaginatedNotes = () => {
    const pinnedNotes = notes.filter((note) => note.isPinned);
    const nonPinnedNotes = notes.filter((note) => !note.isPinned);

    const combinedNotes = [...pinnedNotes, ...nonPinnedNotes];
    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;

    return combinedNotes.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(notes.length / notesPerPage);

  return (
    <NotesContext.Provider
      value={{
        notes: getPaginatedNotes(),
        addNote,
        editNote,
        removeNote,
        pinNote,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
