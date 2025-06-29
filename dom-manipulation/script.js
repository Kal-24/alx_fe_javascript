// === Quotes Array ===
let quotes = [];

// === Load Quotes from Local Storage ===
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
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

  // ✅ Save last viewed quote to session storage
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

// ✅ === Attach Event Listeners Using addEventListener ===
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('categoryFilter')
    .addEventListener('change', filterQuotesByCategory);

  const buttons = document.querySelectorAll('button');
  buttons[0].addEventListener('click', displayRandomQuote);  // New Quote
  buttons[1].addEventListener('click', addQuote);            // Add Quote
  buttons[2].addEventListener('click', exportQuotesToJson);  // Export Quotes

  document.querySelector('input[type="file"]')
    .addEventListener('change', importFromJsonFile);

  loadQuotes();
  loadLastViewedQuote();
});// === Fetch Quotes From Server ===
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://example.com/quotes.json'); 
    // 🔗 Replace with your real API or JSON file URL

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const serverQuotes = await response.json();
    if (Array.isArray(serverQuotes)) {
      quotes.push(...serverQuotes);
      saveQuotes();
      alert('Quotes fetched and saved to local storage!');
    } else {
      alert('Invalid data format from server.');
    }
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    alert('Failed to fetch quotes from server.');
  }
}
// === Fetch Quotes From Server using mock API ===
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    // Map posts to quotes format (e.g., using title as quote text)
    const fetchedQuotes = posts.map(post => ({
      text: post.title,
      category: 'MockAPI'
    }));

    quotes.push(...fetchedQuotes);
    saveQuotes();
    alert('Quotes fetched from mock API and saved!');
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    alert('Failed to fetch quotes from server.');
  }
}
// === Post a new quote to mock API ===
async function postQuoteToServer(quote) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Quote posted successfully:', responseData);
    alert('Quote posted to server successfully!');
  } catch (error) {
    console.error('Failed to post quote:', error);
    alert('Failed to post quote to server.');
  }
}




