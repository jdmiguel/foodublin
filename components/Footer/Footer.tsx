import React from 'react';
import styled from 'styled-components';

type FooterProps = {
  className?: string;
};

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.palette.SECONDARY};
  padding: 25px 0;
  display: flex;
  justify-content: center;
`;

const StyledText = styled.p`
  color: ${(props) => props.theme.palette.LIGHT_SOFT};
  font-weight: 300;
  font-size: 0.9em;
  &:not(:first-of-type) {
    margin-left: 5px;
    @media only screen and (min-width: 375px) {
      margin-left: 7px;
    }
  }
  &:not(:last-of-type) {
    &:after {
      content: ' | ';
      margin-left: 3px;
      @media only screen and (min-width: 375px) {
        margin-left: 5px;
      }
    }
  }
  &:last-of-type {
    margin-right: 1px;
    @media only screen and (min-width: 375px) {
      margin-right: 3px;
    }
  }
  @media only screen and (min-width: 375px) {
    font-size: 1em;
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.palette.LIGHT_SOFT};
  font-weight: 600;
  font-size: 0.9em;
  text-decoration: none;
  transition: color 0.2s ease-out;
  &:hover {
    color: ${(props) => props.theme.palette.LIGHT_MAX};
  }
  @media only screen and (min-width: 375px) {
    font-size: 1em;
  }
`;

const Footer: React.FC<FooterProps> = ({ className }) => (
  <StyledFooter className={className}>
    <StyledText>FOODUBLIN</StyledText>
    <StyledText>COPYRIGHT ©2020</StyledText>
    <StyledText>BY</StyledText>
    <StyledLink href="https://jdmiguel.netlify.app/" target="_blank">
      JDMIGUEL
    </StyledLink>
  </StyledFooter>
);

export default Footer;
