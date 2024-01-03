/*global chrome*/

import { useState } from "react";
import "./Create.css";

const Create = (props) => {
  const [websiteIsSet, setWebsiteIsSet] = useState(false);
  const [website, setWebsite] = useState("");
  const [body, setBody] = useState("");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (!websiteIsSet) {
      setWebsite(tab.url);
      setWebsiteIsSet(true);
    }
  });

  const bodyChangeHandler = (e) => {
    setBody(e.target.value);
  };

  const websiteChangeHandler = (e) => {
    setWebsite(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!body || !website) {
      return;
    }
    props.getNotes().then((res) => {
      const prev = res.notes || [];
      chrome.storage.local
        .set({
          notes: [
            ...prev,
            {
              body: body,
              website: website,
              id: Math.floor(Math.random() * 100000),
            },
          ],
        })
        .then(() => {
          props.getNotes().then((res) => props.setNotes(res.notes));
          setBody("");
          setWebsite("");
          props.setPage("dashboard");
        });
    });
  };

  const cancelBtnHandler = () => {
    setBody("");
    setWebsite("");
    props.setPage("dashboard");
    if (props.notesSet && props.notes.length <= 0) {
      window.close();
    }
  };

  return (
    <div className="outer-create">
      <div className="create">
        <form onSubmit={formSubmitHandler}>
          <textarea
            autoFocus
            rows="3"
            placeholder="New web note"
            value={body}
            onChange={bodyChangeHandler}
          />
          <input
            placeholder="Website"
            value={website}
            onChange={websiteChangeHandler}
          />
          <div className="create-btn-container">
            <button type="submit">Create</button>
            <button onClick={cancelBtnHandler}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
