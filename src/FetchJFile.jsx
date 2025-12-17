import React, { useEffect, useState } from 'react';

const FetchJFile = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The path is relative to the public folder (e.g., '/data.json')
    fetch('dailybread.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
      
  }, []); // The empty array ensures this runs only once when the component mounts

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  props.loadData(data);
  
  return ;
};

export default FetchJFile;
