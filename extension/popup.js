document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fetch').addEventListener('click', function() {
    const service = document.getElementById('service').value;
    chrome.runtime.sendMessage({ action: 'fetchCredentials', service: service }, function(response) {
      if (response.success) {
        document.getElementById('password').value = response.data.password;
      } else {
        document.getElementById('password').value = `Error: ${response.error}`;
      }
    });
  });

  document.getElementById('copy').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
  });
});