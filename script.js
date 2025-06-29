// Starting quotes array
const quotes = [
    { text: "To be or not to be", category: "Philosophy" },
    { text: "The only limit is the one you set yourself.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  ];
  
  // Elements from DOM
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const addQuoteBtn = document.getElementById('addQuoteBtn');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  
  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
  
    if (text === "" || category === "") {
      alert("Please enter both quote and category!");
      return;
    }
  
    // Add to quotes array
    quotes.push({ text, category });
  
    // Clear inputs
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  
    // Show the new quote immediately
    showRandomQuote();
  }
  
  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);
  addQuoteBtn.addEventListener('click', addQuote);
  
  // Show an initial quote on load
  showRandomQuote();
  // === Quotes Array ===
let quotes = [];

// === Load Quotes from Local Storage ===
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Add some default quotes if none are saved yet
    quotes = [
      "The only limit to our realization of tomorrow is our doubts of today.",
      "Do what you can, with what you have, where you are.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts."
    ];
    saveQuotes();
  }
}

// === Save Quotes to Local Storage ===
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// === Display a Random Quote ===
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerText = quote;

  // Save last viewed quote to session storage
  sessionStorage.setItem('lastViewedQuote', quote);
}

// === Add a New Quote ===
function addQuote() {
  const newQuote = prompt('Enter a new quote:');
  if (newQuote) {
    quotes.push(newQuote);
    saveQuotes();
    displayRandomQuote();
  }
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
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
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

// === Initialize ===
loadQuotes();
loadLastViewedQuote();

  