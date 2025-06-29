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
  function displayRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "No quotes available.";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" — ${quote.category}`;
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
    displayRandomQuote();
  }
  
  // Event listeners
  newQuoteBtn.addEventListener('click', displayRandomQuote);
  addQuoteBtn.addEventListener('click', addQuote);
  
  // Show an initial quote on load
  displayRandomQuote();
  