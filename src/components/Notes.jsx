import React, { useState } from "react";
import { NoteCard } from "./NoteCard";

export const Notes = ({ notes, onNoteUpdate, onNoteDelete }) => {
  const bgColors = ["#dabbfa", "#d7f8f2", "#fff6e2", "#f8d7d7"];
  const notesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Get notes for the current page
  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = notes.slice(startIndex, startIndex + notesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!notes.length) {
    return <div>No notes available</div>;
  }

  return (
    <div>
      {/* Notes Grid */}
      <div className="grid grid-cols-3 gap-6 mt-[50px] mr-20 pb-20 ml-10 pl-10">
        {currentNotes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            bgColor={bgColors[index % bgColors.length]}
            onNoteUpdate={onNoteUpdate}
            onNoteDelete={onNoteDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 text-sm rounded-md ${
              currentPage === i + 1
                ? "bg-[#4c8bf5] text-white"
                : "bg-[#e5e5e5] text-[#4c4c4c] hover:bg-[#d7d7d7] hover:text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};