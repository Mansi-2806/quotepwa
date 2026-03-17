import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import ARScene from './ARScene'

function App() {
  const [quote, setQuote] = useState({ text: 'Loading...', author: '' })
  const [isARMode, setIsARMode] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      // Using dummyjson quotes api
      const response = await axios.get('https://dummyjson.com/quotes/random')
      setQuote({
        text: response.data.quote,
        author: response.data.author
      })
    } catch (error) {
      console.error("Error fetching quote:", error)
      setQuote({ text: 'Failed to fetch quote. Please try again.', author: 'System' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  if (isARMode) {
    return (
      <div className="ar-container">
        <button className="back-btn" onClick={() => setIsARMode(false)}>Exit AR</button>
        <ARScene quoteText={`"${quote.text}" - ${quote.author}`} />
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>✨ AR Quote Generator</h1>
        <p className="subtitle">Inspiring words in your world</p>
      </header>

      <main className="main-content">
        <div className="quote-card">
          {loading ? (
             <div className="loader"></div>
          ) : (
            <>
              <blockquote className="quote-text">"{quote.text}"</blockquote>
              <cite className="quote-author">- {quote.author}</cite>
            </>
          )}
        </div>

        <div className="action-buttons">
          <button 
            className="btn btn-primary" 
            onClick={fetchQuote}
            disabled={loading}
          >
            Get New Quote
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsARMode(true)}
            disabled={loading}
          >
            View in AR (WebXR)
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>Built with React, Vite PWA, and A-Frame</p>
      </footer>
    </div>
  )
}

export default App
