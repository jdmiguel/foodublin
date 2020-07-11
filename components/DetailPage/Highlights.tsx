import React from 'react';
import styled from 'styled-components';

type HighLightsProps = {
  highlights: string[];
};

const StyledHighlightsWrapper = styled.div`
  margin-top: 20px;
`;

const StyledHighlight = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const StyledHighlightIcon = styled.i`
  color: ${(props) => props.theme.palette.DARK_MIN};
  margin-right: 5px;
`;

const HighLights = ({ highlights }: HighLightsProps) => (
  <StyledHighlightsWrapper>
    {highlights.map((highlight) => (
      <StyledHighlight key={highlight}>
        <StyledHighlightIcon className="material-icons">
          check_circle
        </StyledHighlightIcon>
        <p>{highlight}</p>
      </StyledHighlight>
    ))}
  </StyledHighlightsWrapper>
);

export default HighLights;
