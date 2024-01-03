/*global chrome*/

import "./App.css";
import { useState } from "react";
import Dashboard from "./components/pages/Dashboard";
import Create from "./components/pages/Create";

function App() {
  const getNotes = () => chrome.storage.local.get(["notes"]);

  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [notesSet, setNotesSet] = useState(false);

  getNotes().then((res) => {
    setNotes(res.notes || []);
    setNotesSet(true);
  });

  return (
    <div className="App">
      {page === "create" && (
        <Create
          notes={notes}
          setNotes={setNotes}
          setPage={setPage}
          getNotes={getNotes}
          notesSet={notesSet}
        />
      )}
      {page === "dashboard" && (
        <Dashboard
          notes={notes}
          setNotes={setNotes}
          setPage={setPage}
          getNotes={getNotes}
          notesSet={notesSet}
        />
      )}
    </div>
  );
}

export default App;
