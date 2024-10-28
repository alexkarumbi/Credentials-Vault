document.addEventListener('DOMContentLoaded', function() {
  // Automatically fill in the service input field with the domain name of the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
    document.getElementById('service').value = domain;
  });

  document.getElementById('fetch').addEventListener('click', function() {
    const service = document.getElementById('service').value;
    chrome.runtime.sendMessage({ action: 'fetchCredentials', service: service }, function(response) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = ''; // Clear previous results
      if (response.success) {
        response.data.credentials.forEach(credential => {
          const credentialDiv = document.createElement('div');
          credentialDiv.classList.add('credential');

          const usernameLabel = document.createElement('label');
          usernameLabel.textContent = 'Username:';
          credentialDiv.appendChild(usernameLabel);

          const usernameInput = document.createElement('input');
          usernameInput.type = 'text';
          usernameInput.value = credential.username;
          usernameInput.readOnly = true;
          credentialDiv.appendChild(usernameInput);

          const passwordLabel = document.createElement('label');
          passwordLabel.textContent = 'Password:';
          credentialDiv.appendChild(passwordLabel);

          const passwordInput = document.createElement('input');
          passwordInput.type = 'password';
          passwordInput.value = credential.password;
          passwordInput.readOnly = true;
          credentialDiv.appendChild(passwordInput);

          const copyButton = document.createElement('button');
          copyButton.textContent = 'Copy';
          copyButton.addEventListener('click', function() {
            passwordInput.type = 'text'; // Temporarily change the type to text to copy the value
            passwordInput.select();
            document.execCommand('copy');
            passwordInput.type = 'password'; // Change the type back to password
            alert('Password copied to clipboard');
          });
          credentialDiv.appendChild(copyButton);

          resultDiv.appendChild(credentialDiv);
        });
      } else {
        resultDiv.textContent = `Error: ${response.error}`;
      }
    });
  });
});