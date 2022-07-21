import React, { Fragment } from 'react';
import { MDXProvider } from '@mdx-js/react';

import Search from '../components/search';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Search />
      <MDXProvider>{children}</MDXProvider>
    </Fragment>
  );
};

export default Layout;
