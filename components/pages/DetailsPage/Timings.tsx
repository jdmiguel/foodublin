import { StyledTiming, StyledTimingDay, StyledTimingSchedule } from './styles';
import { Timing } from '../types';

type TimingsProps = {
  timings: Timing[];
};

export const Timings = ({ timings }: TimingsProps) => (
  <ul>
    {timings.map((timing) => (
      <StyledTiming key={timing.id}>
        <StyledTimingDay>{`${timing.day} : `}</StyledTimingDay>
        <StyledTimingSchedule>{timing.schedule}</StyledTimingSchedule>
      </StyledTiming>
    ))}
  </ul>
);
