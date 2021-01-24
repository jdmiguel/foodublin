const LIST_MOCK = [
  {
    id: 1,
    name: 'First option',
    path: 'first-option',
  },
  {
    id: 2,
    name: 'Second option',
    path: 'second-option',
  },
  {
    id: 3,
    name: 'Third option',
    path: 'third-option',
  },
  {
    id: 4,
    name: 'Fourth option',
    path: 'fourth-option',
  },
  {
    id: 5,
    name: 'Fifth option',
    path: 'fifth-option',
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
  disabled: false,
  isReset: false,
  onSelect: () => {},
  onClear: () => {},
};
