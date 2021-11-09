import { BlockText } from '../../core/BlockText/BlockText';
import {
  StyledHighlightsWrapper,
  StyledHighlight,
  StyledHighlightIcon,
} from './styles';

type HighlightsProps = {
  highlights: string[];
};

export const Highlights = ({ highlights }: HighlightsProps) => (
  <StyledHighlightsWrapper>
    {highlights.map((highlight) => (
      <StyledHighlight key={highlight}>
        <StyledHighlightIcon className="material-icons">
          check_circle
        </StyledHighlightIcon>
        <BlockText text={highlight} />
      </StyledHighlight>
    ))}
  </StyledHighlightsWrapper>
);
