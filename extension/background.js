chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchCredentials") {
    fetch("http://localhost:5000/get_credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ service: request.service })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => sendResponse({ success: true, data: data }))
    .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep the message channel open for sendResponse
  } else if (request.action === "saveCredentials") {
    fetch("http://localhost:5000/save_credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service: request.service,
        username: request.username,
        password: request.password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => sendResponse({ success: true, data: data }))
    .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep the message channel open for sendResponse
  }
});