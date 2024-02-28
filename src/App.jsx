import { useState, useEffect } from 'react'
import './App.css'
import quotes from './assets/quotes'

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function App() {
  const [quote, setQuote] = useState(getRandomQuote());
  const [textColor, setTextColor] = useState(getRandomColor());

  useEffect(() => {
    document.body.style.backgroundColor = textColor;
  }, [textColor]);

  const newQuote = () => {
    const randomColor = getRandomColor()
    setQuote(getRandomQuote());
    setTextColor(randomColor);
    document.body.style.backgroundColor = randomColor;
  };

  return (
    <div className="container">
      <div id="quote-box" style={{ color: textColor }}>
        <p id="text">«{quote.text}»</p>
        <p id="author">— {quote.author}</p>
        <button className="btn" id="new-quote" style={{ backgroundColor: textColor }} onClick={newQuote}>New Quote</button>
        {/* <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`} id="tweet-quote">Tweet</a> */}
      </div>
    </div>
  );
};

export default App
