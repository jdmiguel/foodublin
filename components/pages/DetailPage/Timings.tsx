import {
  StyledTimming,
  StyledTimmingDay,
  StyledTimmingSchedule,
} from './styles';
import { Timming } from '../types';

type TimingsProps = {
  timmings: Timming[];
};

export const Timmings = ({ timmings }: TimingsProps) => (
  <ul>
    {timmings.map((timming) => (
      <StyledTimming key={timming.id}>
        <StyledTimmingDay>{`${timming.day} : `}</StyledTimmingDay>
        <StyledTimmingSchedule>{timming.schedule}</StyledTimmingSchedule>
      </StyledTimming>
    ))}
  </ul>
);
