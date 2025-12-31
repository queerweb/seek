(function() {
  const STORAGE_KEY = 'seek-theme';
  
  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }
  
  function setTheme(theme) {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem(STORAGE_KEY);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }
  
  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    if (!current || current === 'auto') {
      setTheme('light');
    } else if (current === 'light') {
      setTheme('dark');
    } else {
      setTheme('auto');
    }
  }
  
  const stored = getStoredTheme();
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', cycleTheme);
    }
  });
})();
