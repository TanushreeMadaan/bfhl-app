import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON (e.g., {"data": ["A","1","B","2"]})'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <select
  multiple
  value={selectedOptions}
  onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
>
  <option value="Alphabets">Alphabets</option>
  <option value="Numbers">Numbers</option>
  <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
</select>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;