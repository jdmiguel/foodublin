import { CDN_URL_STATIC_DIRECTORY } from './utils';

export const DUBLIN_ID = 91;
export const BASE_URL = 'https://developers.zomato.com/api/v2.1/';

export const DEFAULT_TEXT_LOADING = 'Coming right up...';

export const MAX_RESTAURANT_DISPLAYED = 20;
export const MAX_RESTAURANT_RETRIEVED = 100;

export const MAX_SMALL_DEVICE_WIDTH = 640;

export const SCROLL_FACTOR = 4;
export const SCROLL_INITIAL_MOBILE_FACTOR = 10;
export const SCROLL_OFFSET_MOBILE_FACTOR = 4;
export const SCROLL_OFFSET_DESKTOP_FACTOR = 1.2;
export const SCROLL_DELAY = 4;

export const SHOWING_SCROLLUP_BUTTON_HEIGHT = 900;

export enum PlaceholderText {
  BLURRED = 'Search for locals...',
  FOCUSED = 'Start typing to search...',
}

export const DEFAULT_SUGGESTIONS = [
  {
    id: 0,
    imgSrc: '',
    firstText: '',
    secondText: '',
  },
];

export const LOCATIONS = [
  {
    id: 91,
    name: 'Dublin',
    path: 'dublin',
  },
  {
    id: 162239,
    name: 'South City West',
    path: 'south-city-west',
  },
  {
    id: 96201,
    name: 'Temple Bar',
    path: 'temple-bar',
  },
  {
    id: 95051,
    name: 'Clondalkin',
    path: 'clondalkin',
  },
  {
    id: 96181,
    name: 'Swords',
    path: 'swords',
  },
  {
    id: 96191,
    name: 'Tallaght',
    path: 'tallaght',
  },
  {
    id: 94881,
    name: 'Blanchardstown',
    path: 'blanchardstown',
  },
  {
    id: 162240,
    name: 'South City East',
    path: 'south-city-east',
  },
  {
    id: 95311,
    name: 'Dundrum',
    path: 'dundrum',
  },
  {
    id: 95341,
    name: 'Finglas',
    path: 'finglas',
  },
  {
    id: 94791,
    name: 'Ballyfermot',
    path: 'ballyfermot',
  },
  {
    id: 96081,
    name: 'Santry',
    path: 'santry',
  },
  {
    id: 95711,
    name: 'Lucan',
    path: 'lucan',
  },
  {
    id: 94671,
    name: 'Artane',
    path: 'artane',
  },
  {
    id: 95721,
    name: 'Malahide',
    path: 'malahide',
  },
  {
    id: 95301,
    name: 'Dun Laoghaire',
    path: 'dun-laoghaire',
  },
  {
    id: 96271,
    name: 'Walkinstown',
    path: 'walkinstown',
  },
  {
    id: 94871,
    name: 'Blackrock',
    path: 'blackrock',
  },
  {
    id: 95851,
    name: 'Palmerstown',
    path: 'palmerstown',
  },
  {
    id: 95981,
    name: 'Rathmines',
    path: 'rathmines',
  },
  {
    id: 94701,
    name: 'Balbriggan',
    path: 'balbriggan',
  },
  {
    id: 94761,
    name: 'Ballybrack',
    path: 'ballybrack',
  },
  {
    id: 96111,
    name: 'Smithfield',
    path: 'smithfield',
  },
  {
    id: 95181,
    name: 'Crumlin',
    path: 'crumlin',
  },
  {
    id: 94971,
    name: 'Castleknock',
    path: 'castleknock',
  },
  {
    id: 95511,
    name: 'Howth',
    path: 'howth',
  },
  {
    id: 94951,
    name: 'Cabra',
    path: 'cabra',
  },
  {
    id: 96291,
    name: 'Whitehall',
    path: 'whitehall',
  },
  {
    id: 95901,
    name: 'Portmarnock',
    path: 'portmarnock',
  },
  {
    id: 95641,
    name: 'Kimmage',
    path: 'kimmage',
  },
];

export const CUISINES = [
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/stew.svg`,
    id: 135,
    name: 'Irish',
    path: 'irish',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/pizza.svg`,
    id: 55,
    name: 'Italian',
    path: 'italian',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/bruschetta.svg`,
    id: 70,
    name: 'Mediterranean',
    path: 'mediterranean',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/rice.svg`,
    id: 3,
    name: 'Asian',
    path: 'asian',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/healthy_food.svg`,
    id: 143,
    name: 'Healthy Food',
    path: 'healthy-food',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/gulab.svg`,
    id: 148,
    name: 'Indian',
    path: 'indian',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/taco.svg`,
    id: 73,
    name: 'Mexican',
    path: 'mexican',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/fries.svg`,
    id: 40,
    name: 'Fast Food',
    path: 'fast-food',
  },
];

export const HIGHLIGHTED_RESTAURANTS = [
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/cleaver-east.jpg`,
    id: 9100233,
    path: 'cleaver-east',
    name: 'Cleaver East Restaurant',
    description:
      'Situated in the heart of Ireland’s capital city, on East Essex Street in the popular Temple Bar area, Cleaver East Restaurant offers the finest Irish and European cuisine.',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/tapas-de-lola.jpg`,
    id: 16518539,
    path: 'tapas-de-lola',
    name: 'Tapas de Lola',
    description:
      'This restaurant is a love letter to all things Spanish and flavorful. Its owners make regular pilgrimages to Spain for inspiration and pack it all into a lively menu of small plates.',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/ely-wine.jpg`,
    id: 16517305,
    path: 'ely-wine',
    name: 'Ely Wine Bar',
    description:
      'Eric and his wife Michelle are the founders of this clubby place where you can eat and drink well both downstairs in the cozy basement and upstairs in an elegant dining room.',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/oxmantown.jpg`,
    id: 16520229,
    path: 'oxmantown',
    name: 'Oxmantown',
    description:
      'In this small place, the art of a brilliant sandwich means every element is taken seriously, like the breakfast sandwich that comes with butcher Jack McCarthy’s black pudding.',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/chapter-one.jpg`,
    id: 9100702,
    path: 'chapter-one',
    name: 'Chapter One',
    description:
      'Dublin writers are more closely associated with booze rather than food, but Chapter One is a Michelin-starred restaurant in the basement of the Dublin Writers Museum.',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/rosa-madre.jpg`,
    id: 9101166,
    path: 'rosa-madre',
    name: 'Rosa Madre',
    description:
      'In the menu-hawking clamor of Temple Bar you might long for a quieter restaurant where you won’t feel like a tourist on a conveyor belt. If so, Rosa Madre is your place.',
  },
];

export const HIGHLIGHT_GENERIC_SRC = `${CDN_URL_STATIC_DIRECTORY}/images/highlight-generic.png`;
export const THUMB_GENERIC_SRC = `${CDN_URL_STATIC_DIRECTORY}/images/generic-thumb.png`;
export const DETAIL_GENERIC_SRC = `${CDN_URL_STATIC_DIRECTORY}/images/generic-detail.png`;
export const DEFAULT_RATING_STAR_LIST = [
  { id: 1, type: 'star_outline' },
  { id: 2, type: 'star_outline' },
  { id: 3, type: 'star_outline' },
  { id: 4, type: 'star_outline' },
  { id: 5, type: 'star_outline' },
];

export enum FilterSort {
  COST = 'cost',
  RANK = 'rating',
}
export enum FilterOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const FILTER_DATA = [
  {
    primaryText: 'cost',
    secondaryText: '- high to low',
    icon: 'keyboard_arrow_up',
    sort: FilterSort.COST,
    order: FilterOrder.ASC,
    id: 1,
  },
  {
    primaryText: 'cost',
    secondaryText: '- low to high',
    icon: 'keyboard_arrow_down',
    sort: FilterSort.COST,
    order: FilterOrder.DESC,
    id: 2,
  },
  {
    primaryText: 'rank',
    secondaryText: '- high to low',
    icon: 'keyboard_arrow_up',
    sort: FilterSort.RANK,
    order: FilterOrder.ASC,
    id: 3,
  },
  {
    primaryText: 'rank',
    secondaryText: '- low to high',
    icon: 'keyboard_arrow_down',
    sort: FilterSort.RANK,
    order: FilterOrder.DESC,
    id: 4,
  },
];
