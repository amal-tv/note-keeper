import React, { useState } from "react";
import { NotesProvider } from "./context/NotesContext";
import { Header } from "./components/Header";
import { Notes } from "./components/Notes";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-gradient-to-b from-[#0C1536] to-[#262f41] min-h-screen w-screen">
      <NotesProvider>
        <div>
          <Header setSearchQuery={setSearchQuery} />
          <Notes searchQuery={searchQuery} />
        </div>
      </NotesProvider>
      <Toaster />
    </div>
  );
};

export default App;