import React from 'react';
import styled from 'styled-components';

import { DefaultLayout } from '../../layouts';

import Filter from '../Filter/Filter';
import Title from '../core/Title/Title';
import { FILTER_DATA } from '../../helpers/staticData';

const StyledSearchPage = styled.div`
  margin-top: 50px;
  margin-bottom: 35px;
  @media only screen and (min-width: 1024px) {
    margin-top: 75px;
    padding: 0 30px;
  }
`;

const SearchPage: React.FC = () => (
  <DefaultLayout isExtendedHeader={false}>
    <StyledSearchPage className="grid-container">
      <Title text="32 restaurants in Rathmines" />
      <Filter
        onSelect={() => console.log('on filter select')}
        data={FILTER_DATA}
      />
    </StyledSearchPage>
  </DefaultLayout>
);

export default SearchPage;
