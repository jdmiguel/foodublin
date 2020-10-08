import React from 'react';

import {
  StyledAddressMapWrapper,
  StyledIframe,
  StyledAddress,
  StyledAddressIcon,
} from './styles';

import { BlockText } from '../../core/BlockText/BlockText';

type AddressProps = {
  mapSrc: string;
  address: string;
};

export const Address = ({ mapSrc, address }: AddressProps) => (
  <>
    <StyledAddressMapWrapper>
      <StyledIframe
        width="345"
        height="200"
        title="map"
        frameBorder="0"
        src={mapSrc}
      ></StyledIframe>
    </StyledAddressMapWrapper>
    <StyledAddress>
      <StyledAddressIcon className="material-icons">place</StyledAddressIcon>
      <BlockText text={address} />
    </StyledAddress>
  </>
);
