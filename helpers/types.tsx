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

export enum EntityType {
  CITY = 'city',
  SUBZONE = 'subzone',
}

export type RestaurantsRequestParamsType = {
  entity_id: number | undefined;
  cuisines: number | undefined;
  entity_type: EntityType.CITY | EntityType.SUBZONE;
  start?: number;
  sort?: string;
  order?: string;
  q?: string;
  count?: number;
};

export type RestaurantType = {
  id: string;
  imgSrc: string;
  title: string;
  link: string;
  firstText: string;
};
