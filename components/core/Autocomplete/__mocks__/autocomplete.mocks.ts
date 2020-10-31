export const SUGGESTIONS_MOCK = [
  {
    id: 165204783,
    imgSrc:
      'https://b.zmtcdn.com/data/pictures/chains/6/16518306/cacec634483f94b6b8a50b85a7b226fc_featured_v2.jpg?fit=around%7C150%3A150&crop=150%3A150%3B%2A%2C%2A',
    title: 'Manifesto',
    content: 'Rathmines',
    route: '/',
    asRoute: '/',
  },
  {
    id: 165204021,
    imgSrc:
      'https://b.zmtcdn.com/data/pictures/7/9101117/46ff6ab924384eacb9a3493ba158f9b7_featured_v2.jpg?fit=around%7C150%3A150&crop=150%3A150%3B%2A%2C%2A',
    title: 'Dragon Inn',
    content: 'South City West',
    route: '/',
    asRoute: '/',
  },
  {
    id: 165204967,
    imgSrc:
      'https://b.zmtcdn.com/data/pictures/9/16518269/5ef3412808820207794fb57f0cb3ba56_featured_v2.jpg?fit=around%7C150%3A150&crop=150%3A150%3B%2A%2C%2A',
    title: 'Casa Del Toro',
    content: 'Drumcondra',
    route: '/',
    asRoute: '/',
  },
];

export const AUTOCOMPLETE_PROPS_MOCK = {
  suggestions: SUGGESTIONS_MOCK,
  fetchSuggestions: () => {},
  selectSuggestion: () => {},
  loading: false,
  hasSearchIcon: true,
  disabled: false,
};
