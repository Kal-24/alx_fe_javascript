// === Quotes Array ===
let quotes = [];

// === Load Quotes from Local Storage ===
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes with categories
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Do what you can, with what you have, where you are.", category: "Productivity" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
    ];
    saveQuotes();
  }
  populateCategories();
}

// === Save Quotes to Local Storage ===
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
  populateCategories();
}

// === Populate Categories Dropdown ===
function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  const categorySelect = document.getElementById('categoryFilter');

  // Clear old options
  categorySelect.innerHTML = '<option value="all">All Categories</option>';

  // Add unique categories
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// === Display Random Quote (with category filter) ===
function displayRandomQuote() {
  const categorySelect = document.getElementById('categoryFilter');
  const selectedCategory = categorySelect.value;

  let filteredQuotes = quotes;
  if (selectedCategory !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    document.getElementById('quoteDisplay').innerText = 'No quotes in this category.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById('quoteDisplay').innerText = quote.text;

  // Save last viewed quote to session storage
  sessionStorage.setItem('lastViewedQuote', quote.text);
}

// === Filter Quotes By Category ===
function filterQuotesByCategory() {
  displayRandomQuote();
}

// === Add a New Quote ===
function addQuote() {
  const text = prompt('Enter the quote text:');
  if (!text) return;

  const category = prompt('Enter the category for this quote:') || 'General';

  quotes.push({ text, category });
  saveQuotes();
  displayRandomQuote();
}

// === Export Quotes to JSON ===
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

// === Import Quotes from JSON File ===
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON format!');
      }
    } catch (error) {
      alert('Error parsing JSON file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// === Load Last Viewed Quote ===
function loadLastViewedQuote() {
  const lastQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastQuote) {
    document.getElementById('quoteDisplay').innerText = lastQuote;
  } else {
    displayRandomQuote();
  }
}

// === Initialize ===
loadQuotes();
loadLastViewedQuote();

