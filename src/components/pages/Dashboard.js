/*global chrome*/

import "./Dashboard.css";
import CloseSVG from "./CloseSVG";

const Dashboard = (props) => {
  if (props.notesSet && props.notes.length <= 0) {
    props.setPage("create");
  }

  const deleteHandler = (id) => {
    return () => {
      props.getNotes().then((res) => {
        const prev = res.notes || [];
        const newNotes = prev.filter((note) => note.id !== id);
        chrome.storage.local
          .set({
            notes: newNotes,
          })
          .then(() => {
            props.getNotes().then((res) => props.setNotes(res.notes));
          });
      });
    };
  };

  const createBtnHandler = () => {
    props.setPage("create");
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-header">Your web notes</h1>
      <button onClick={createBtnHandler} className="create-btn">
        Create
      </button>
      <div className="notes-container">
        {props.notes.map((note) => (
          <div className="note-container">
            <h2>{note.body}</h2>
            <h3>{note.website}</h3>
            <div className="btn-container">
              <CloseSVG onClick={deleteHandler(note.id)}>X</CloseSVG>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
