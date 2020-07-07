import { CDN_URL_STATIC_DIRECTORY } from './utils';

export const LOCATIONS = [
  {
    id: 162239,
    name: 'South City West',
  },
  {
    id: 96201,
    name: 'Temple Bar',
  },
  {
    id: 95051,
    name: 'Clondalkin',
  },
  {
    id: 96181,
    name: 'Swords',
  },
  {
    id: 96191,
    name: 'Tallaght',
  },
  {
    id: 94881,
    name: 'Blanchardstown',
  },
  {
    id: 162240,
    name: 'South City East',
  },
  {
    id: 95311,
    name: 'Dundrum',
  },
  {
    id: 95341,
    name: 'Finglas',
  },
  {
    id: 94791,
    name: 'Ballyfermot',
  },
  {
    id: 96081,
    name: 'Santry',
  },
  {
    id: 95711,
    name: 'Lucan',
  },
  {
    id: 94671,
    name: 'Artane',
  },
  {
    id: 95721,
    name: 'Malahide',
  },
  {
    id: 95301,
    name: 'Dun Laoghaire',
  },
  {
    id: 96271,
    name: 'Walkinstown',
  },
  {
    id: 94871,
    name: 'Blackrock',
  },
  {
    id: 95851,

    name: 'Palmerstown',
  },
  {
    id: 95981,

    name: 'Rathmines',
  },
  {
    id: 94701,
    name: 'Balbriggan',
  },
  {
    id: 94761,
    name: 'Ballybrack',
  },
  {
    id: 96111,
    name: 'Smithfield',
  },
  {
    id: 95181,
    name: 'Crumlin',
  },
  {
    id: 94971,
    name: 'Castleknock',
  },
  {
    id: 95511,
    name: 'Howth',
  },
  {
    id: 94951,
    name: 'Cabra',
  },
  {
    id: 96291,
    name: 'Whitehall',
  },
  {
    id: 95901,
    name: 'Portmarnock',
  },
  {
    id: 95641,
    name: 'Kimmage',
  },
];

export const CUISINES = [
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/stew.svg`,
    id: 135,
    name: 'Irish',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/pizza.svg`,
    id: 55,
    name: 'Italian',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/bruschetta.svg`,
    id: 70,
    name: 'Mediterranean',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/rice.svg`,
    id: 3,
    name: 'Asian',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/healthy_food.svg`,
    id: 143,
    name: 'Healthy Food',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/gulab.svg`,
    id: 148,
    name: 'Indian',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/taco.svg`,
    id: 73,
    name: 'Mexican',
  },
  {
    iconSrc: `${CDN_URL_STATIC_DIRECTORY}/images/fries.svg`,
    id: 40,
    name: 'Fast Food',
  },
];

export const HIGHLIGHTED_RESTAURANTS = [
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/cleaver-east.jpg`,
    id: 1,
    name: 'Cleaver East Restaurant',
    description:
      'Situated in the heart of Ireland’s capital city, on East Essex Street in the popular Temple Bar area, Cleaver East Restaurant offers the finest Irish and European cuisine.',
    link: 'https://theclarence.ie/cleaver-east/',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/tapas-de-lola.jpg`,
    id: 2,
    name: 'Tapas de Lola',
    description:
      'This restaurant is a love letter to all things Spanish and flavorful. Its owners make regular pilgrimages to Spain for inspiration and pack it all into a lively menu of small plates.',
    link: 'http://lastapasdelola.com/',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/ely-wine.jpg`,
    id: 3,
    name: 'Ely Wine Bar',
    description:
      'Eric and his wife Michelle are the founders of this clubby place where you can eat and drink well both downstairs in the cozy basement and upstairs in an elegant dining room.',
    link: 'http://www.elywinebar.ie/',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/locks.jpg`,
    id: 4,
    name: 'Locks',
    description:
      'Locks is a beautiful restaurant with a clever young team in the kitchen. Seasonal menus include dishes like violet artichoke teamed with burrata, broad beans, and fennel.',
    link: 'https://www.locksrestaurant.ie/',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/chapter-one.jpg`,
    id: 5,
    name: 'Chapter One',
    description:
      'Dublin writers are more closely associated with booze rather than food, but Chapter One is a Michelin-starred restaurant in the basement of the Dublin Writers Museum.',
    link: 'https://www.chapteronerestaurant.com/',
  },
  {
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/rosa-madre.jpg`,
    id: 6,
    name: 'Rosa Madre',
    description:
      'In the menu-hawking clamor of Temple Bar you might long for a quieter restaurant where you won’t feel like a tourist on a conveyor belt. If so, Rosa Madre is your place.',
    link: 'http://www.rosamadre.ie/',
  },
];

export const HIGHLIGHT_GENERIC_SRC = `${CDN_URL_STATIC_DIRECTORY}/images/highlight-generic.png`;

enum FILTER_SORT {
  cost = 'cost',
  rank = 'rank',
}
enum FILTER_ORDER {
  asc = 'asc',
  desc = 'desc',
}

export const FILTER_DATA = [
  {
    primaryText: 'cost',
    secondaryText: '- high to low',
    icon: 'keyboard_arrow_up',
    sort: FILTER_SORT.cost,
    order: FILTER_ORDER.asc,
    id: 1,
  },
  {
    primaryText: 'cost',
    secondaryText: '- low to high',
    icon: 'keyboard_arrow_down',
    sort: FILTER_SORT.cost,
    order: FILTER_ORDER.desc,
    id: 2,
  },
  {
    primaryText: 'rank',
    secondaryText: '- high to low',
    icon: 'keyboard_arrow_up',
    sort: FILTER_SORT.rank,
    order: FILTER_ORDER.asc,
    id: 3,
  },
  {
    primaryText: 'rank',
    secondaryText: '- low to high',
    icon: 'keyboard_arrow_down',
    sort: FILTER_SORT.rank,
    order: FILTER_ORDER.desc,
    id: 4,
  },
];
