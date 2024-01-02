try {
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.scripting.executeScript({
      files: ["contentScript.js"],
      target: { tabId: activeInfo.tabId },
    });
  });
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      chrome.scripting.executeScript({
        files: ["contentScript.js"],
        target: { tabId: tab.id },
      });
    }
  });
} catch (e) {
  console.log(e);
}
