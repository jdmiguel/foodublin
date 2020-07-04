const LIST_MOCK = [
  {
    id: 1,
    name: 'First option',
  },
  {
    id: 2,
    name: 'Second option',
  },
  {
    id: 3,
    name: 'Third option',
  },
  {
    id: 4,
    name: 'Fourth option',
  },
  {
    id: 5,
    name: 'Fifth option',
  },
];

export const ICON_OPTIONS = {
  label: 'label',
  location: 'near_me',
  cuisine: 'restaurant',
  none: '',
};

export const DROPDOWN_PROPS_MOCK = {
  icon: 'label',
  labelTxt: 'Select any option',
  list: LIST_MOCK,
  onSelect: () => {},
};
