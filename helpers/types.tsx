export type Suggestion = {
  id: number;
  imgSrc: string;
  firstText: string;
  secondText: string;
};

export type CardType = {
  imgSrc: string;
  title: string;
  route: string;
  asRoute: string;
  firstText: string;
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

export type RestaurantDataType = {
  imgSrc: string;
  name: string;
  location: string;
  cuisines: string;
  timings: string;
  rating: number;
  votes: number;
  average: string;
  establishment: string;
  highlights: string[];
  phone: string;
  address: string;
};
