import { StyledTitle } from './styles';

type TitleProps = {
  className?: string;
  text: string;
};

export const Title: React.FC<TitleProps> = ({ className, text }) => (
  <StyledTitle className={className}>{text}</StyledTitle>
);
