export type Suggestion = {
  id: number;
  imgSrc: string;
  firstText: string;
  secondText: string;
};

export type CardProps = {
  id: string;
  imgSrc: string;
  imgAlt: string;
  link: string;
  title: string;
  firstText: string;
  secondText: string;
};

export type Timming = {
  id: string;
  day: string;
  schedule: string;
};

export type ListItemType = {
  iconSrc?: string;
  id: number;
  name: string;
  path: string;
};

export type RestaurantType = {
  id: string;
  imgSrc: string;
  title: string;
  link: string;
  firstText: string;
};
