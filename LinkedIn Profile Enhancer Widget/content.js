const sampleData = {
  "companyName": "TechCorp",
  "matchScore": 86,
  "accountStatus": "Target"
};

function createWidget(data) {
  if (document.getElementById("linkedin-enhancer-widget")) return;

  const widget = document.createElement("div");
  widget.id = "linkedin-enhancer-widget";
  widget.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    width: 280px;
    background: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 16px;
    font-family: Arial, sans-serif;
    z-index: 10000;
  `;

  widget.innerHTML = `
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    "> 
      <strong>${data.companyName}</strong>
      <button id="close-widget-btn" style="background: none; border: none; font-size: 16px;">×</button>
    </div>
    <div style="margin-top: 10px;">
      <label>Match Score:</label>
      <div style="background: #eee; border-radius: 4px; overflow: hidden; height: 10px;">
        <div style="width: ${data.matchScore}%; height: 100%; background: #4caf50;"></div>
      </div>
      <small>${data.matchScore}/100</small>
    </div>
    <div style="margin-top: 10px;">
      <span style="
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        color: white;
        background-color: ${data.accountStatus === "Target" ? "red" : "green"};
      ">
        ${data.accountStatus}
      </span>
    </div>
  `;

  document.body.appendChild(widget);

  document.getElementById("close-widget-btn").addEventListener("click", () => {
    widget.remove();
    chrome.storage.sync.set({ widgetVisible: false });
  });
}

chrome.storage.sync.get("widgetVisible", (data) => {
  if (data.widgetVisible ?? true) {
    createWidget(sampleData);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleWidget") {
    const widget = document.getElementById("linkedin-enhancer-widget");

    if (request.show) {
      if (!widget) {
        createWidget(sampleData);
      }
    } else {
      if (widget) {
        widget.remove();
      }
    }

    sendResponse({ success: true });
  }
});
  