document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fetch').addEventListener('click', function() {
    const service = document.getElementById('service').value;
    chrome.runtime.sendMessage({ action: 'fetchCredentials', service: service }, function(response) {
      if (response.success) {
        document.getElementById('username').value = response.data.username;
        document.getElementById('password').value = response.data.password;
      } else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = `Error: ${response.error}`;
      }
    });
  });

  document.getElementById('copy').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = 'text'; // Temporarily change the type to text to copy the value
    passwordField.select();
    document.execCommand('copy');
    passwordField.type = 'password'; // Change the type back to password
    alert('Password copied to clipboard');
  });
});