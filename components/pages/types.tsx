import { ReactNode } from 'react';

export type Area = {
  id: number;
  name: string;
  path: string;
};

export type Cuisine = {
  id: number;
  iconSrc: string;
  name: string;
  path: string;
};

export type Timing = {
  id: string;
  day: string;
  schedule: string;
};

export enum EntityType {
  CITY = 'city',
  SUBZONE = 'subzone',
}

export type RestaurantsRequestParam = number | null | string | undefined;

export type RestaurantsRequestParams = {
  entity_id: number | null;
  cuisines: number | null;
  entity_type: EntityType.CITY | EntityType.SUBZONE;
  start?: number;
  sort?: string;
  order?: string;
  q?: string;
  count?: number;
};

export type Restaurant = {
  id: string;
  imgSrc: string;
  title: string;
  content: ReactNode | string;
  route: string;
  asRoute: string;
};

export type HighlightRestaurant = Restaurant & { featuredSrc: string };

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type HourDetail = {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
};

export type Hour = {
  open: HourDetail[];
  hours_type: string;
  is_open_now: boolean;
};

export type Location = {
  address1: string;
  address2: null;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
  cross_streets: string;
};

export type Category = {
  alias: string;
  title: string;
};

export type UserReview = {
  id: string;
  profile_url: string;
  image_url: string;
  name: string;
};

export type Review = {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: UserReview;
};

export type RawRestaurantDetail = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: Category[];
  rating: number;
  location: Location;
  coordinates: Coordinates;
  photos: string[];
  price: string;
  hours: Hour[];
  transactions: any[];
  reviews: Review[];
};

export type RawRestaurant = {
  restaurant: RawRestaurantDetail;
};

export type RawRestaurantsSearch = {
  results_found: number;
  results_start: number;
  results_shown: number;
  restaurants: RawRestaurant[];
};

export type RestaurantDetail = {
  imgSrc: string;
  name: string;
  address: string;
  street: string;
  categories: string[];
  hours: HourDetail[] | null;
  rating: number;
  price: string | null;
  reviewCount: number;
  phone: string;
  reviews: Review[];
};

export type BasicRestaurant = {
  id: string;
  name: string;
};

export type RestaurantSuggestion = BasicRestaurant & { route: string; asRoute: string };
