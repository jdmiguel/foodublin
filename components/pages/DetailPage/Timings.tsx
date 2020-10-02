import React from 'react';

import {
  StyledTimming,
  StyledTimmingDay,
  StyledTimmingSchedule,
} from './styles';

import { Timming } from '../../../helpers/types';

type TimingsProps = {
  timmings: Timming[];
};

export const Timmings = ({ timmings }: TimingsProps) => (
  <>
    {timmings.map((timming) => (
      <StyledTimming key={timming.id}>
        <StyledTimmingDay>{`${timming.day} : `}</StyledTimmingDay>
        <StyledTimmingSchedule>{timming.schedule}</StyledTimmingSchedule>
      </StyledTimming>
    ))}
  </>
);
