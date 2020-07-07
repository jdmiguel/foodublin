import React from 'react';

import { DefaultLayout } from '../../layouts';

import Filter from '../Filter/Filter';
import Title from '../core/Title/Title';
import { FILTER_DATA } from '../../helpers/staticData';

const SearchPage: React.FC = () => (
  <DefaultLayout isExtendedHeader={false}>
    <Title text="32 restaurants in Rathmines" />
    <Filter
      onSelect={() => console.log('on filter select')}
      data={FILTER_DATA}
    />
  </DefaultLayout>
);

export default SearchPage;
