import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Notes } from './components/Notes';
import { getNotes, addNewNote } from './api/apiNotes';
import { useFetch } from './hooks/useFetch';

function App() {
  const [notes, setNotes] = useState([]);
  const { fn: saveNote, loading, error } = useFetch(addNewNote);


  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (noteData) => {
    await saveNote(noteData);
    const updatedNotes = await getNotes(); 
    setNotes(updatedNotes);
  };

  return (
    <div className=" bg-gradient-to-b from-[#0C1536] to-[#262f41] min-h-screen">
      <Header onAddNote={handleAddNote} loading={loading} error={error} />
      <Notes notes={notes} />
    </div>
  );
}

export default App;





