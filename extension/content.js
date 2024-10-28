document.addEventListener('submit', function(event) {
    const form = event.target;
    const passwordField = form.querySelector('input[type="password"]');
    if (passwordField) {
      const usernameField = form.querySelector('input[type="text"], input[type="email"]');
      const username = usernameField ? usernameField.value : '';
      const password = passwordField.value;
      const service = window.location.hostname;
  
      chrome.runtime.sendMessage({
        action: 'saveCredentials',
        service: service,
        username: username,
        password: password
      });
    }
  }, true);