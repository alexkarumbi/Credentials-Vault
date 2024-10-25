chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchCredentials") {
      fetch("http://localhost:5000/get_credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ service: request.service })
      })
      .then(response => response.json())
      .then(data => sendResponse({ success: true, data: data }))
      .catch(error => sendResponse({ success: false, error: error }));
      return true; // Keep the message channel open for sendResponse
    }
  });