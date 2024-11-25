import React from 'react';
import { NoteCard } from './NoteCard';

export const Notes = ({ notes }) => {
  if (!notes.length) {
    return <div>No notes available</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6 mt-20 mr-20 pb-20 ml-10">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};
