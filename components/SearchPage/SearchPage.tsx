import React from 'react';

import { DefaultLayout } from '../../layouts';

import Filter from '../Filter/Filter';

import { FILTER_DATA } from '../../helpers/staticData';

const SearchPage: React.FC = () => (
  <DefaultLayout isExtendedHeader={false}>
    <Filter
      onSelect={() => console.log('on filter select')}
      data={FILTER_DATA}
    />
  </DefaultLayout>
);

export default SearchPage;
