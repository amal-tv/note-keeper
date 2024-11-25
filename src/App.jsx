import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Notes } from './components/Notes';
import { getNotes, addNewNote } from './api/apiNotes';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (noteData) => {
    await addNewNote(noteData);
    const updatedNotes = await getNotes(); // Re-fetch updated notes
    setNotes(updatedNotes);
  };

  return (
    <div className="bg-gradient-to-r from-[#0f172a] via-[#141d30] to-[#1d283a] min-h-screen">
      <Header onAddNote={handleAddNote} />
      <Notes notes={notes} />
    </div>
  );
}

export default App;
