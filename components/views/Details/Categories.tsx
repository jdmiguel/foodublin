import { StyledCategory } from './styles';

type CategoriesProps = {
  list: string[];
};

export const Categories = ({ list }: CategoriesProps) => (
  <>
    {list.map((category) => (
      <StyledCategory key={category}>{category}</StyledCategory>
    ))}
  </>
);
