import React from 'react';
import styled from 'styled-components';

import { Timming } from '../../helpers/types';

type TimingsProps = {
  timmings: Timming[];
};

const StyledTimming = styled.div`
  display: flex;
  align-items: flex-end;
`;

const StyledTimmingDay = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.DARK_MEDIUM};
  margin-right: 5px;
`;

const StyledTimmingSchedule = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.palette.DARK_MIN};
  margin-bottom: 1px;
`;

const Timmings = ({ timmings }: TimingsProps) => (
  <>
    {timmings.map((timming) => (
      <StyledTimming key={timming.id}>
        <StyledTimmingDay>{`${timming.day} : `}</StyledTimmingDay>
        <StyledTimmingSchedule>{timming.schedule}</StyledTimmingSchedule>
      </StyledTimming>
    ))}
  </>
);

export default Timmings;
