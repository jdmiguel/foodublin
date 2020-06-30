export const SUGGESTIONS_MOCK = [
  {
    id: '165204783',
    thumbSrc:
      'https://b.zmtcdn.com/data/pictures/chains/6/16518306/cacec634483f94b6b8a50b85a7b226fc_featured_v2.jpg?fit=around%7C150%3A150&crop=150%3A150%3B%2A%2C%2A',
    localName: 'Manifesto',
    locationName: 'Rathmines',
  },
  {
    id: '165204021',
    thumbSrc:
      'https://b.zmtcdn.com/data/pictures/7/9101117/46ff6ab924384eacb9a3493ba158f9b7_featured_v2.jpg?fit=around%7C150%3A150&crop=150%3A150%3B%2A%2C%2A',
    localName: 'Dragon Inn',
    locationName: 'South City West',
  },
  {
    id: '165204967',
    thumbSrc:
      'https://b.zmtcdn.com/data/pictures/9/16518269/5ef3412808820207794fb57f0cb3ba56_featured_v2.jpg?fit=around%7C150%3A150&crop=150%3A150%3B%2A%2C%2A',
    localName: 'Casa Del Toro',
    locationName: 'Drumcondra',
  },
];

export const EMPTY_SUGGESTIONS_MOCK = [
  {
    id: '',
    thumbSrc: '',
    localName: '',
    locationName: '',
  },
];

export const AUTOCOMPLETE_PROPS_MOCK = {
  loaderSrc: 'loader.svg',
  suggestions: SUGGESTIONS_MOCK,
  fetchSuggestions: () => {},
  selectSuggestion: () => {},
  loading: false,
  withSearchIcon: true,
};
