import { CustomLink } from '../../core/CustomLink/CustomLink';
import {
  StyledFooterWrapper,
  StyledFooterVeil,
  StyledFooter,
  StyledBlock,
  StyledText,
} from './styles';

type FooterProps = {
  showVeil?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ showVeil = false }) => (
  <StyledFooterWrapper data-testid="footer">
    {showVeil && <StyledFooterVeil />}
    <StyledFooter>
      <StyledBlock>
        <StyledText addSeparation={false}>FOODUBLIN ©2022</StyledText>
      </StyledBlock>
      <StyledBlock>
        <StyledText addSeparation={true}>BY</StyledText>
        <CustomLink route="https://jdmiguel.netlify.app/">JDMIGUEL</CustomLink>
      </StyledBlock>
      <StyledBlock>
        <StyledText addSeparation={false}></StyledText>
        <CustomLink route="https://foodublin-design-system.netlify.app">DESIGN SYSTEM</CustomLink>
      </StyledBlock>
    </StyledFooter>
  </StyledFooterWrapper>
);
