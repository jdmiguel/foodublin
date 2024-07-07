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
  onClickFavorites: () => void;
};

export const Footer: React.FC<FooterProps> = ({ showVeil = false, onClickFavorites }) => (
  <StyledFooterWrapper>
    {showVeil && <StyledFooterVeil />}
    <StyledFooter>
      <StyledBlock>
        <StyledText addSeparation={true}>©2024</StyledText>
        <StyledText addSeparation={true}>BY</StyledText>
        <CustomLink route="https://jdmiguel.com">JDMIGUEL</CustomLink>
      </StyledBlock>
      <StyledBlock>
        <CustomLink onClick={onClickFavorites}>
          <i className="material-icons">bookmarks</i>FAVORITES
        </CustomLink>
      </StyledBlock>
      <StyledBlock>
        <StyledText addSeparation={false}></StyledText>
        <CustomLink route="https://foodublin-design-system.netlify.app">DESIGN SYSTEM</CustomLink>
      </StyledBlock>
    </StyledFooter>
  </StyledFooterWrapper>
);
