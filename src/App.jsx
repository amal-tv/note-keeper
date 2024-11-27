import React from "react";
import { NotesProvider } from "./context/NotesContext";
import { Header } from "./components/Header";
import { Notes } from "./components/Notes";

const App = () => {
  return (
    <NotesProvider>
      <div className="bg-gradient-to-b from-[#0C1536] to-[#262f41] min-h-screen">
        <Header />
        <Notes />
      </div>
    </NotesProvider>
  );
};

export default App;
