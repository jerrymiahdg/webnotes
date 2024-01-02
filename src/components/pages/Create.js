/*global chrome*/

import { useState } from "react";
import "./Create.css";

const Create = (props) => {
  const [websiteIsSet, setWebsiteIsSet] = useState(false);
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [body, setBody] = useState("");

  chrome.storage.local.get(["website"]).then((res) => {
    if (!websiteIsSet) {
      setWebsite(res.website);
      setWebsiteIsSet(true);
    }
  });

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const bodyChangeHandler = (e) => {
    setBody(e.target.value);
  };

  const websiteChangeHandler = (e) => {
    setWebsite(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.getNotes().then((res) => {
      const prev = res.notes || [];
      chrome.storage.local
        .set({
          notes: [
            ...prev,
            {
              title: title,
              body: body,
              website: website,
              id: Math.floor(Math.random() * 100000),
            },
          ],
        })
        .then(() => {
          props.getNotes().then((res) => props.setNotes(res.notes));
          setBody("");
          setTitle("");
          setWebsite("");
          props.setPage("dashboard");
        });
    });
  };

  const cancelBtnHandler = () => {
    setBody("");
    setTitle("");
    setWebsite("");
    props.setPage("dashboard");
  };

  return (
    <div className="outer-create">
      <div className="create">
        <form onSubmit={formSubmitHandler}>
          <input
            placeholder="Title"
            value={title}
            onChange={titleChangeHandler}
          />
          <input placeholder="Body" value={body} onChange={bodyChangeHandler} />
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
