import React, { useEffect, useRef } from 'react';
import SearchWorker from 'worker-loader!./search.worker.js';

const Search = () => {
  const workerRef = useRef();

  useEffect(() => {
    const worker = new SearchWorker();

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  return (
    <div>
      <label htmlFor="search"></label>
      <input id="search" placeholder="Search" />
    </div>
  );
};

export default Search;
