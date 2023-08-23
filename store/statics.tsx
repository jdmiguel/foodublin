import { BreadcrumbsType, FilterData } from '@/components/core/types';

export const BASE_API = 'https://api.yelp.com/v3/';

export const DUBLIN_ID = 91;

export const DEFAULT_TEXT_LOADING = 'Coming right up...';

export const SEARCH_TERM_QUERY_PARAM = 'restaurants';
export const SEARCH_RADIUS_QUERY_PARAM = 1000;

export const MAX_RESTAURANT_DISPLAYED = 20;

export const MAX_SMALL_DEVICE_WIDTH = 640;

export const SCROLL_FACTOR = 1.1;
export const SCROLL_DELAY = 100;

export const SHOWING_SCROLLUP_BUTTON_HEIGHT = 900;

export const MAX_SEARCH_BREADCRUMBS = 2;

export const MAX_MOBILE_WIDTH = 768;

export enum PlaceholderText {
  BLURRED = 'Search for locals...',
  FOCUSED = 'Start typing to search...',
}

export const HIGHLIGHT_GENERIC_SRC = '/images/highlight-generic.png';
export const THUMB_GENERIC_SRC = '/images/generic-thumb.png';
export const DETAIL_GENERIC_SRC = '/images/generic-detail.png';
export const USER_GENERIC_SRC = '/images/user-avatar.svg';
export const DEFAULT_RATING_STAR_LIST = [
  { id: 1, type: 'star_outline' },
  { id: 2, type: 'star_outline' },
  { id: 3, type: 'star_outline' },
  { id: 4, type: 'star_outline' },
  { id: 5, type: 'star_outline' },
];

export const FILTERS: FilterData[] = [
  {
    id: 1,
    isActive: false,
    type: 'high_cost',
    text: 'high cost',
    icon: 'monetization_on',
  },
  {
    id: 2,
    isActive: false,
    type: 'low_cost',
    text: 'low cost',
    icon: 'savings',
  },
  {
    id: 3,
    isActive: false,
    type: 'rating',
    text: 'popularity',
    icon: 'star',
  },
  {
    id: 4,
    isActive: false,
    type: 'distance',
    text: 'distance',
    icon: 'pin_drop',
  },
];

export const DEFAULT_BREADCRUMB = {
  text: 'Home',
  route: '/',
  asRoute: '/',
  type: BreadcrumbsType.HOME,
};

export const DUBLIN_COORDINATES = {
  latitude: 53.3434,
  longitude: -6.26761,
};

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MAX_PRICE_PERCENT = 80;
export const MAX_EURO_PRICE_AMOUNT = 4;
