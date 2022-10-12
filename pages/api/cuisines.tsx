import type { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      iconSrc: '/images/stew.svg',
      id: 135,
      name: 'Irish',
      path: 'irish',
    },
    {
      iconSrc: '/images/pizza.svg',
      id: 55,
      name: 'Italian',
      path: 'italian',
    },
    {
      iconSrc: '/images/bruschetta.svg',
      id: 70,
      name: 'Mediterranean',
      path: 'mediterranean',
    },
    {
      iconSrc: '/images/rice.svg',
      id: 3,
      name: 'Asian',
      path: 'asian',
    },
    {
      iconSrc: '/images/healthy_food.svg',
      id: 143,
      name: 'Healthy Food',
      path: 'healthy-food',
    },
    {
      iconSrc: '/images/gulab.svg',
      id: 148,
      name: 'Indian',
      path: 'indian',
    },
    {
      iconSrc: '/images/taco.svg',
      id: 73,
      name: 'Mexican',
      path: 'mexican',
    },
    {
      iconSrc: '/images/fries.svg',
      id: 40,
      name: 'Fast Food',
      path: 'fast-food',
    },
  ]);
};
