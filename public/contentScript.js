if (typeof init === "undefined") {
  const init = () => {
    chrome.storage.local.get(["notes"]).then((res) => {
      const notes = res.notes || [];
      const validNotes = notes.filter((note) => {
        return (
          note.website === window.document.URL.substring(0, note.website.length)
        );
      });
      for (note of validNotes) {
        alert(`${note.title}: ${note.body}`);
      }
    });
  };
  init();
}
