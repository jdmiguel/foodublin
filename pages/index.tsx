import React from 'react';

import Logo from '../components/Logo/Logo';

import { CDN_URL_STATIC_DIRECTORY } from '../helpers/utils';

const index = () => (
  <div>
    <Logo
      logoSrc={`${CDN_URL_STATIC_DIRECTORY}/images/primary_logo.svg`}
      logoAltTxt="FooDublin Logo"
    />
  </div>
);

export default index;
