import { StyledBlockTitle } from './styles';

type BlockTitleProps = {
  className?: string;
  text: string;
};

export const BlockTitle: React.FC<BlockTitleProps> = ({ className, text }) => (
  <StyledBlockTitle className={className}>{text}</StyledBlockTitle>
);
