import { ReactNode } from 'react';

export type Location = {
  id: number;
  name: string;
  path: string;
};

export type Timming = {
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
  id: number;
  imgSrc: string;
  title: string;
  content: ReactNode | string;
  route: string;
  asRoute: string;
};

export type HighlightRestaurant = Restaurant & { featuredSrc: string };

export type RawRestaurantDetail = {
  R: {
    has_menu_status: {
      delivery: number;
      takeaway: number;
    };
    res_id: number;
    is_grocery_store: boolean;
  };
  apikey: string;
  id: number;
  name: string;
  url: string;
  location: {
    address: string;
    locality: string;
    city: string;
    city_id: number;
    latitude: number;
    longitude: number;
    zipcode: string;
    country_id: number;
    locality_verbose: string;
  };
  switch_to_order_menu: number;
  cuisines: string;
  timings: string;
  average_cost_for_two: number;
  price_range: number;
  currency: string;
  highlights: string[];
  offers: any[];
  opentable_support: number;
  is_zomato_book_res: number;
  mezzo_provider: string;
  is_book_form_web_view: number;
  book_form_web_view_url: string;
  book_again_url: string;
  thumb: string;
  user_rating: {
    aggregate_rating: number;
    rating_text: string;
    rating_color: string;
    rating_obj: {
      title: {
        text: number;
      };
      bg_color: {
        type: string;
        tint: number;
      };
    };
    votes: number;
  };
  all_reviews_count: number;
  photos_url: string;
  photo_count: number;
  menu_url: string;
  featured_image: string;
  has_online_delivery: number;
  is_delivering_now: number;
  store_type: string;
  include_bogo_offers: boolean;
  deeplink: string;
  is_table_reservation_supported: number;
  has_table_booking: number;
  events_url: string;
  phone_numbers: string;
  all_reviews: {
    reviews: [
      {
        review: any[];
      },
      {
        review: any[];
      },
      {
        review: any[];
      },
      {
        review: any[];
      },
      {
        review: any[];
      },
    ];
  };
  establishment: string[];
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
  thumbSrc: string;
  name: string;
  location: string;
  cuisines: string;
  timings: string;
  rating: number;
  votes: number;
  average: number;
  establishment: string;
  highlights: string[];
  phone: string;
  address: string;
};

export type Review = {
  id: number;
  userName: string;
  userImgSrc: string;
  rating: number;
  date: string;
  text: string;
};

export type RawReview = {
  review: {
    rating: number;
    review_text: string;
    id: number;
    rating_color: string;
    review_time_friendly: string;
    rating_text: string;
    timestamp: number;
    likes: number;
    user: {
      name: string;
      foodie_level: string;
      foodie_level_num: number;
      foodie_color: string;
      profile_url: string;
      profile_image: string;
      profile_deeplink: string;
    };
    comments_count: number;
  };
};
