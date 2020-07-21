import React from 'react';
import { useRouter } from 'next/router';

import SearchPage from '../../../components/SearchPage/SearchPage';

const search = () => {
  const router = useRouter();
  console.log(router.query);
  return <SearchPage />;
};

export default search;
