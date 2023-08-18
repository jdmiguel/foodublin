import { ReactNode } from 'react';

export type Area = { id: number; name: string; path: string; latitude: number; longitude: number };
export type Cuisine = { id: number; iconSrc: string; name: string; path: string };

export type Timing = {
  id: string;
  day: string;
  schedule: string;
};

export type RestaurantsRequestParam = number | null | string | undefined;

export type RestaurantsRequestParams = {
  latitude: number;
  longitude: number;
  cuisine?: string;
  offset?: number;
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

export type FetchedRestaurantDetails = {
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
  location: Location & { cross_streets: string };
  coordinates: Coordinates;
  photos: string[];
  price: string;
  hours: Hour[];
  transactions: any[];
  reviews: Review[];
};

export type RestaurantDetails = {
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

export type Suggestion = Pick<FetchedRestaurantDetails, 'id' | 'name'> & {
  route: string;
  asRoute: string;
};

export type FetchedRestaurant = Omit<FetchedRestaurantDetails, 'is_claimed'> & {
  distance: number;
};
