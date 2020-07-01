import React from 'react';

import { DefaultLayout } from '../../layouts';

import Hightlights from './Highlights/HighLights';

const HomePage: React.FC = () => (
  <DefaultLayout isExtendedHeader={true}>
    <Hightlights title="Featured venues" />
  </DefaultLayout>
);

export default HomePage;
