import React from "react";
import { useNotes } from "../context/NotesContext";
import { NoteCard } from "./NoteCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

export const Notes = ({ searchQuery = "" }) => {
  const { notes, currentPage, totalPages, setCurrentPage } = useNotes();
  const bgColors = ["#dabbfa", "#d7f8f2", "#fff6e2", "#f8d7d7"];

  const filteredNotes = notes?.filter(
    (note) =>
      note.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
      note.tagline?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
      note.content?.toLowerCase()?.includes(searchQuery.toLowerCase()) 
  );

  if (!filteredNotes.length) {
    return <div className="text-center mx-auto p-20 text-white">No notes available</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-[50px] mr-20 pb-20 ml-10 pl-10">
          {filteredNotes.map((note, index) => (
            <NoteCard
              key={note.id}
              note={note}
              bgColor={bgColors[index % bgColors.length]}
            />
          ))}
        </div>
      </div>
     
      <div className="flex justify-center items-center sm:mt-3 sm:mb-10  mb-[200px]">
       
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 rounded-full bg-red-500 hover:bg-gray-500 text-white"
          >
            <ChevronLeft size={24} />
          </button>
        )}

       
        <span className="px-4 py-2 text-white">{`Page ${currentPage} of ${totalPages}`}</span>

       
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 rounded-full bg-red-500 hover:bg-gray-500 text-white"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
