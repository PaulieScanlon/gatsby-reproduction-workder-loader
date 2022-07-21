import { useEffect, useRef, useState, useCallback } from 'react';
import SearchWorker from 'worker-loader!./search.worker.js';

import { list } from '../test-data/list-data';

const useSearch = (query) => {
  const latestQuery = useRef(query);
  const workerRef = useRef();

  const [results, setResults] = useState(list);

  const handleSearchResults = useCallback(({ data }) => {
    console.log('data: ', data);
    if (data.query && data.results && data.query === latestQuery.current) {
      setResults(data.results);
    }
  }, []);

  useEffect(() => {
    const worker = new SearchWorker();
    worker.addEventListener('message', handleSearchResults);
    worker.postMessage({ list });
    workerRef.current = worker;

    return () => {
      workerRef.current.terminate();
    };
  }, [list, handleSearchResults]);

  useEffect(() => {
    latestQuery.current = query;
    if (query && workerRef.current) {
      workerRef.current.postMessage({ query: query });
    } else {
      setResults(list);
    }
  }, [query, list]);

  return results;
};

export default useSearch;
