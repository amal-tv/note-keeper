import React from "react";
import { useNotes } from "../context/NotesContext";
import { NoteCard } from "./NoteCard";

export const Notes = () => {
  const { notes, currentPage, totalPages, setCurrentPage } = useNotes();
  const bgColors = ["#dabbfa", "#d7f8f2", "#fff6e2", "#f8d7d7"];

  if (!notes.length) {
    return <div className="text-center text-white">No notes available</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-6 mt-[50px] mr-20 pb-20 ml-10 pl-10">
          {notes.map((note,index) => (
            <NoteCard key={note.id} note={note}  bgColor={bgColors[index % bgColors.length]} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-3 pb-[230px]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
