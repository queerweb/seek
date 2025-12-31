function initAutocomplete(inputSelector, formSelector, onSelect) {
  const input = document.querySelector(inputSelector);
  const form = document.querySelector(formSelector);
  if (!input || !form) return;

  let dropdown = document.createElement('div');
  dropdown.className = 'autocomplete-dropdown';
  input.parentNode.style.position = 'relative';
  input.parentNode.appendChild(dropdown);

  let debounceTimer;
  let selectedIndex = -1;

  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    const query = this.value.trim();
    
    if (!query) {
      dropdown.style.display = 'none';
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch('/suggest?q=' + encodeURIComponent(query));
        const data = await response.json();
        
        if (data.suggestions && data.suggestions.length > 0) {
          dropdown.innerHTML = data.suggestions.map((s, i) => 
            `<div class="autocomplete-item" data-index="${i}">${escapeHtml(s)}</div>`
          ).join('');
          dropdown.style.display = 'block';
          selectedIndex = -1;
        } else {
          dropdown.style.display = 'none';
        }
      } catch (err) {
        dropdown.style.display = 'none';
      }
    }, 150);
  });

  input.addEventListener('keydown', function(e) {
    const items = dropdown.querySelectorAll('.autocomplete-item');
    if (!items.length || dropdown.style.display === 'none') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection(items);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      input.value = items[selectedIndex].textContent;
      dropdown.style.display = 'none';
      if (onSelect) onSelect(input.value);
      else form.submit();
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
      selectedIndex = -1;
    }
  });

  dropdown.addEventListener('click', function(e) {
    const item = e.target.closest('.autocomplete-item');
    if (item) {
      input.value = item.textContent;
      dropdown.style.display = 'none';
      if (onSelect) onSelect(input.value);
      else form.submit();
    }
  });

  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  function updateSelection(items) {
    items.forEach((item, i) => {
      item.classList.toggle('selected', i === selectedIndex);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
