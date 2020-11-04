import { CDN_URL_STATIC_DIRECTORY } from '@helpers/utils';

export const FIRST_DETAIL_MOCKED = {
  imgSrc:
    'https://b.zmtcdn.com/data/res_imagery/9100560_CHAIN_1db4137ab10427fd625b1fe7afc255e2_c.jpg',
  name: 'Boojum',
  location: 'North City',
  address: 'Millenium Walkway, Dublin Dublin 1',
  phone: '01 8729499',
  timings:
    '11:30 AM to 9 PM (Mon-Fri),12 Noon to 9 PM (Sat),1 PM to 6 PM (Sun)',
  cuisines: 'Mexican',
  average: '20',
  rating: 4.4,
  votes: 21,
  establishment: ['Quick Bites'],
  Highlights: [
    'Lunch',
    'Serves Alcohol',
    'Takeaway Available',
    'Dinner',
    'Outdoor Seating',
  ],
};

export const SECOND_DETAIL_MOCKED = {
  imgSrc: '',
  name: `Lam's`,
  location: 'Ballyfermot',
  address: '286 Ballyfermot Road, Ballyfermot, Dublin Dublin 10',
  phone: '01 6232073, 01 6203520',
  timings: '12 Noon to 1 AM (Mon-Sat),5 PM to 1 AM (Sun)',
  cuisines: 'Chinese, Asian',
  average: '25',
  rating: 2.5,
  votes: 105,
  establishment: [''],
  Highlights: ['Takeaway Available', 'Dinner', 'Delivery', 'Lunch'],
};

export const THIRD_DETAIL_MOCKED = {
  imgSrc:
    'https://b.zmtcdn.com/data/res_imagery/16518440_CHAIN_937180d938080196899e8c908558b5e1_c.jpg',
  name: 'F.X. Buckley',
  location: 'South City East',
  address: '1A Pembroke Street Lower, South City East, Dublin 2',
  phone: '01 6764606',
  timings: '12 Noon to 10:30 PM (Mon-Wed),12 Noon to 11 PM (Thu-Sun)',
  cuisines: 'Steak',
  average: '90',
  rating: 3.4,
  votes: 82,
  establishment: ['Casual Dining'],
  Highlights: [
    'Credit Card',
    'Lunch',
    'Serves Alcohol',
    'Dinner',
    'Private Dining Area Available',
    'Has Early Bird Menu',
    'Wine By Glass',
    'Wine',
    'Indoor Seating',
    'Wifi',
    'Lunch Menu',
    'Fullbar',
    'MasterCard for Credit Card',
  ],
};

export const FOURTH_DETAIL_MOCKED = {
  imgSrc:
    'https://b.zmtcdn.com/data/res_imagery/9101221_RESTAURANT_a3d14f5828d263bd1ddb6c454a425f34_c.jpg',
  name: `Sophie's - The Dean Hotel`,
  location: 'The Dean Hotel, City Centre South',
  address: '33 Harcourt Street, South City East, Dublin Dublin 2',
  phone: '01 6078100',
  timings: '7 AM to 11 AM, 12 Noon to 2:30 PM, 5:30 PM to 11 PM (Mon-Sun)',
  cuisines: 'Italian',
  average: '65',
  rating: 4.8,
  votes: 50,
  establishment: ['Casual Dining'],
  Highlights: [
    'Credit Card',
    'Dinner',
    'Breakfast',
    'Lunch',
    'Serves Alcohol',
    'Wifi',
    'Gin Bar',
    'Outdoor Seating',
    'Fullbar',
  ],
};

export const RELATED_RESTAURANTS_MOCKED = [
  {
    id: 234,
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/thumb-1.webp`,
    title: 'Elephant & Castle',
    content: 'Temple Bar',
    route: '/detail/[id]/[name]',
    asRoute: '/detail/234/elephant-castle',
  },
  {
    id: 5474,
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/thumb-2.webp`,
    title: 'Abrecadabra',
    content: 'Rathmines',
    route: '/detail/[id]/[name]',
    asRoute: '/detail/5474/abrecadabra',
  },
  {
    id: 8963,
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/thumb-3.webp`,
    title: 'Brothers in law',
    content: 'Blackrock',
    route: '/detail/[id]/[name]',
    asRoute: '/detail/8963/brothers-in-law',
  },
  {
    id: 4421,
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/thumb-4.webp`,
    title: 'Misushi',
    content: 'Whitehall',
    route: '/detail/[id]/[name]',
    asRoute: '/detail/4421/misushi',
  },
  {
    id: 2144,
    imgSrc: `${CDN_URL_STATIC_DIRECTORY}/images/thumb-5.webp`,
    title: 'Pattaya',
    content: 'Clondalkin',
    route: '/detail/[id]/[name]',
    asRoute: '/detail/2144/pattaya',
  },
];
