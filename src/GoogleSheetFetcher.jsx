import React, { useState, useEffect } from 'react';

function GoogleSheetFetcher() {
  // 1. Set up state for the data, loading status, and errors
  const [sheetData, setSheetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Build the URL using your environment variables
    // Note: Change process.env to import.meta.env if you are using Vite
    const apiKey = import.meta.env.VITE_SHEETS_API_KEY;
    const sheetId = import.meta.env.VITE_SHEET_ID;

    // Define the exact sheet name and cell range you want to read
    const range = 'Main!B2:G6'; // Adjust this range as needed
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    // 3. Fetch the data from Google with the referrer fix
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      referrerPolicy: 'origin' // This forces the browser to send your URL as the referrer
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data from Google Sheets');
        }
        return response.json();
      })
      .then((data) => {
        // Google Sheets returns the rows inside a 'values' array
        // If the sheet is completely empty, 'values' might be undefined
        setSheetData(data.values || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []); // The empty array ensures this only runs once when the component loads

  // 4. Render the UI based on the current state
  if (isLoading) return <div>Loading spreadsheet data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Spreadsheet Values</h2>
      <ul>
        {sheetData.map((row, rowIndex) => (
          <li key={rowIndex}>
            {/* 'row' is an array representing the columns in that specific row */}
            {row.join(' | ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleSheetFetcher;