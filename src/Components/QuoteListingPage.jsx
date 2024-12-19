import React, { useEffect, useState } from 'react'
import { fetchQuotes } from '../Services/api'
import './QuoteListPage.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import loaderImg from '../gradient-5812_256.gif'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [showLoader,setShowLoader] = useState(false)
  const loadQuotes = async () => {
    try {
      setShowLoader(true)
      const data = await fetchQuotes({ limit: 20, offset: page * 20 });
      setQuotes((prev) => [...prev, ...data.data]);
      setShowLoader(false)
      if (data.data.length === 0) setLoadMore(false);
    } catch (error) {
      setShowLoader(false)
      alert('Failed to fetch quotes!');
    }
  };
  
  useEffect(() => {
    if (loadMore) loadQuotes();
  }, [page]);

  return (
    <div style={{position:'relative'}}>
    {showLoader && <img className='loader' src={loaderImg}/>}
    <div className="quote-list-container">
      <div className="header">
        <h2 className="quote-list-title">Quotes</h2>
        <Link to='/quote-create'><button className="create-quote-button">Create New Quote</button></Link>     
      </div>
       <div className="quote-grid">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <img
              src={quote.mediaUrl}
              alt="Quote"
              className="quote-image"
            />
            <div className="quote-overlay">
              <p className="quote-text">{quote.text}</p>
            </div>
            <div className="quote-details">
              <p className="quote-author">By: {quote.username}</p>
              <p className="quote-date">Created at: {quote?.createdAt?.slice(0,10).split('-').reverse().join('-')}</p>
            </div>
          </div>
        ))}
      </div>
      {loadMore && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="load-more-button"
        >
          Load More
        </button>
      )}
    </div>
    </div>
  );
};

export default QuoteListPage;
