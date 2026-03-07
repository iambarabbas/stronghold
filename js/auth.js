// Simple password protection for Stronghold presentation
(function() {
  const PASSWORD = 'stronghold2026';
  const STORAGE_KEY = 'stronghold_auth';
  
  // Check if already authenticated
  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    document.body.classList.add('authenticated');
    return;
  }
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'password-overlay';
  overlay.innerHTML = `
    <div class="password-box">
      <img src="assets/logo.webp" alt="Stronghold">
      <h2>Board Presentation</h2>
      <p>Enter the access code to continue</p>
      <input type="password" id="password-input" placeholder="Access Code" autocomplete="off">
      <p class="error" id="password-error">Incorrect code. Please try again.</p>
      <button class="btn btn-primary" id="password-submit" style="width: 100%;">Enter</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  const input = document.getElementById('password-input');
  const submit = document.getElementById('password-submit');
  const error = document.getElementById('password-error');
  
  function checkPassword() {
    if (input.value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
        document.body.classList.add('authenticated');
        // Trigger page content fade in
        const content = document.querySelector('.page-content');
        if (content) content.classList.add('visible');
      }, 300);
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }
  
  submit.addEventListener('click', checkPassword);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkPassword();
  });
  
  // Focus input
  setTimeout(() => input.focus(), 100);
})();
