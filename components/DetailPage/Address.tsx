import React from 'react';
import styled from 'styled-components';

import BlockText from '../core/BlockText/BlockText';

type AddressProps = {
  mapSrc: string;
  address: string;
};

const StyledAddressMapWrapper = styled.div`
  background-color: ${(props) => props.theme.palette.LIGHT_MIN};
  border: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
  margin-bottom: 15px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
`;

const StyledAddress = styled.div`
  display: flex;
`;

const StyledAddressIcon = styled.i`
  font-size: 1rem;
  color: ${(props) => props.theme.palette.DARK_MIN};
  margin: 1px 5px 0 0;
`;

const Address = ({ mapSrc, address }: AddressProps) => (
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

export default Address;
