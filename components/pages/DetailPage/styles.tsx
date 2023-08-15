import styled, { css } from 'styled-components';

// Address

export const StyledAddressWrapper = styled.div`
  padding: 20px;
  top: 140px;
  height: fit-content;
  grid-column: 1/5;
  @media only screen and (min-width: 992px) {
    grid-column: 3/5;
  }
  @media only screen and (min-width: 1200px) {
    grid-column: 3/6;
  }
`;

export const StyledAddressMapWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.LIGHT_MIN};
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  margin-bottom: 15px;
`;

export const StyledIframe = styled.iframe`
  width: 99.8%;
`;

export const StyledAddress = styled.div`
  display: flex;
`;

export const StyledAddressIcon = styled.i`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.DARK_MIN};
  margin: 1px 5px 0 0;
`;

// Categories

export const StyledCategory = styled.p`
  background-color: ${({ theme }) => theme.palette.DARK_MIN};
  color: ${({ theme }) => theme.palette.LIGHT_MAX};
  font-weight: 500;
  border-radius: 15px;
  padding: 5px 10px;
  display: inline-block;
  &:not(:last-of-type) {
    margin-right: 10px;
    margin-bottom: 5px;
  }
`;

// DetailPage

const HeaderTextCSS = css`
  color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  text-align: center;
  line-height: 1.5rem;
`;

export const StyledDetailPage = styled.div`
  margin: 50px auto 70px;
  max-width: 1200px;
  @media only screen and (min-width: 428px) {
    margin: 50px auto;
  }
`;

export const StyledHeader = styled.div<{ bgImg: string }>`
  background-size: cover;
  background-image: url(${({ bgImg }) => bgImg});
  background-color: ${({ theme }) => theme.palette.DARK_SOFT};
  background-position: center;
  display: flex;
  width: 100%;
  height: 250px;
  margin-bottom: 40px;
`;

export const StyledOverlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
`;

export const StyledName = styled.h2`
  ${HeaderTextCSS}
  font-size: 1.7rem;
  line-height: 1.5rem;
  font-weight: 600;
  @media only screen and (min-width: 640px) {
    line-height: 2.3rem;
    font-size: 2.6rem;
  }
`;

export const StyledStreet = styled.h3`
  ${HeaderTextCSS}
  font-size: 1.3rem;
  line-height: 1.3rem;
  @media only screen and (min-width: 640px) {
    line-height: 2rem;
    font-size: 2rem;
  }
`;

export const StyledButtonWrapper = styled.div`
  width: 140px;
  margin-top: 30px;
  @media only screen and (max-width: 639px) {
    width: 127px;
    height: 45px;
  }
`;

export const StyledInformation = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 50px;
  margin-bottom: 30px;
  @media only screen and (min-width: 992px) {
    grid-column-gap: 30px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const StyledMainInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const StyledExtraInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const StyledSectionBlock = styled.div`
  flex: 1;
  @media only screen and (min-width: 992px) {
    flex: unset;
  }
`;

export const StyledTitleWrapper = styled.div`
  margin-bottom: 15px;
`;

export const StyledPhone = styled.h5`
  color: ${({ theme }) => theme.palette.PRIMARY};
  font-size: 1.2rem;
  line-height: 0;
`;

// Highlights

export const StyledHighlightsWrapper = styled.ul`
  margin-top: 20px;
`;

export const StyledHighlight = styled.li`
  display: flex;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

export const StyledHighlightIcon = styled.i`
  color: ${({ theme }) => theme.palette.DARK_MIN};
  margin-right: 5px;
`;

// Timings

export const StyledTiming = styled.li`
  display: flex;
  align-items: flex-end;
`;

export const StyledTimingDay = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  margin-right: 5px;
`;

export const StyledTimingSchedule = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.DARK_MIN};
  margin-bottom: 1px;
`;

// Reviews

export const StyledReviews = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 30px;
`;
