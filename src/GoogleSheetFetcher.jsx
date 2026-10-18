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
    const range = 'Main!A2:G7'; // Adjust this range as needed
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    // 3. Fetch the data from Google
    fetch(url)
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
    <h1>本周({sheetData[0]?.[1]})晨兴与读经进度</h1>
    <hr></hr>
    <h2>{sheetData[1]?.[0]}</h2>
    <h3>书目: {sheetData[1]?.[1]} {sheetData[1]?.[2]}</h3>
    <h3>进度: <a href={sheetData[1]?.[4]}>{sheetData[1]?.[3]}</a></h3>
    <h2>{sheetData[2]?.[0]}</h2>
    <h3>{sheetData[2]?.[1]}: <a href={sheetData[2]?.[4]}>{sheetData[2]?.[2]}</a></h3>
    <h3>{sheetData[3]?.[1]}: <a href={sheetData[3]?.[4]}>{sheetData[3]?.[2]}</a></h3>
    <h2>{sheetData[4]?.[0]}</h2>
    <h3>{sheetData[4]?.[1]}: <a href={sheetData[4]?.[4]}>{sheetData[4]?.[2]}</a></h3>
    <h3>{sheetData[5]?.[0]}: {sheetData[5]?.[1]}</h3>
    </div>
  );
}

export default GoogleSheetFetcher;