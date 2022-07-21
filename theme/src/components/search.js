import React, { Fragment, useEffect, useRef, useState } from 'react';

import useSearch from '../hooks/use-search';

const Search = () => {
  const [query, setQuery] = useState('');
  const results = useSearch(query);

  const onSubmit = (event) => {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label>
          <input name="search" placeholder="Search" />
        </label>
        <button type="submit">Search</button>
      </form>
      <pre>{JSON.stringify(query, null, 2)}</pre>
      <p>Results</p>
      <p>{JSON.stringify(results, null, 2)}</p>
    </Fragment>
  );
};

export default Search;
