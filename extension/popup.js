document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fetch').addEventListener('click', function() {
    const service = document.getElementById('service').value;
    chrome.runtime.sendMessage({ action: 'fetchCredentials', service: service }, function(response) {
      if (response.success) {
        document.getElementById('result').innerText = `Username: ${response.data.username}, Password: ${response.data.password}`;
      } else {
        document.getElementById('result').innerText = `Error: ${response.error}`;
      }
    });
  });
});