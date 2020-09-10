import React, { useState } from 'react';

import HomePage from '../components/HomePage/HomePage';

const index = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HomePage
      isLoading={isLoading}
      onClickHighlightCard={() => setIsLoading(true)}
    />
  );
};

export default index;
