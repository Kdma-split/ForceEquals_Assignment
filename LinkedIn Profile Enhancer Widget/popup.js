document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('widget-toggle');

  // Load toggle state
  chrome.storage.sync.get('widgetVisible', function (data) {
    const isVisible = data.widgetVisible ?? true;
    toggle.checked = isVisible;
  });

  // Toggle state on change
  toggle.addEventListener('change', function () {
    const isVisible = toggle.checked;
    chrome.storage.sync.set({ widgetVisible: isVisible });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab && tab.url.includes("linkedin.com/in/")) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        }, () => {
          chrome.tabs.sendMessage(tab.id, {
            action: "toggleWidget",
            show: isVisible
          });
        });
      }
    });
  });
});
