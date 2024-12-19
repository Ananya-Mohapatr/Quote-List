import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import loaderImg from '../gradient-5812_256.gif';
import './QuoteCreationPage.css';

const QuoteCreationPage = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await axios.post(
        'https://crafto.app/crafto/v1.0/media/assignment/upload',
        formData
      );

      console.log('uploadedResponse', uploadResponse);
      const mediaUrl = uploadResponse.data[0].url;
      const token = localStorage.getItem('authToken');
      await axios.post(
        'https://assignment.stage.crafto.app/postQuote',
        { text, mediaUrl },
        { headers: { Authorization: token } }
      );

      setShowLoader(false);
      alert('Quote created successfully!');
      history.push('/quote-list');
    } catch (error) {
      setShowLoader(false);
      console.error(error);
      alert('Failed to create quote!');
    }
  };

  return (
    <>
      {showLoader && <img className="loader" src={loaderImg} alt="Loading..." />}
      <div className="create-quote-container">
        <div className="create-quote-card">
          <h2 className="create-quote-title">Create a New Quote</h2>
          <input
            type="text"
            placeholder="Enter your quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="create-quote-input"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="create-quote-file-input"
          />
          <button
            onClick={handleSubmit}
            className="create-quote-submit-button"
            disabled={showLoader} // Disable button when loader is active
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default QuoteCreationPage;
