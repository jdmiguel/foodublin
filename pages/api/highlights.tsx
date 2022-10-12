import type { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      id: 9100233,
      featuredSrc: '/images/cleaver-east.jpg',
      imgSrc:
        'https://b.zmtcdn.com/data/res_imagery/9100233_RESTAURANT_8b0a195f5047ea1246c77911e6f18dd4.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      title: 'Cleaver East Restaurant',
      content:
        'Situated in the heart of Ireland’s capital city, on East Essex Street in the popular Temple Bar area, Cleaver East Restaurant offers the finest Irish and European cuisine.',
      route: '/detail/[id]/[name]',
      asRoute: '/detail/9100233/cleaver-east',
    },
    {
      id: 16518539,
      featuredSrc: '/images/tapas-de-lola.jpg',
      imgSrc:
        'https://b.zmtcdn.com/data/res_imagery/16518539_RESTAURANT_58b43e3019e1ecb772e71660f68d9252.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      title: 'Tapas de Lola',
      content:
        'This restaurant is a love letter to all things Spanish and flavorful. Its owners make regular pilgrimages to Spain for inspiration and pack it all into a lively menu of small plates.',
      route: '/detail/[id]/[name]',
      asRoute: '/detail/16518539/tapas-de-lola',
    },
    {
      id: 16517305,
      featuredSrc: '/images/ely-wine.jpg',
      imgSrc:
        'https://b.zmtcdn.com/data/res_imagery/16517305_RESTAURANT_4edf8903aa50f49ac31d924200f8d6d6_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      title: 'Ely Wine Bar',
      content:
        'Eric and his wife Michelle are the founders of this clubby place where you can eat and drink well both downstairs in the cozy basement and upstairs in an elegant dining room.',
      route: '/detail/[id]/[name]',
      asRoute: '/detail/16517305/ely-wine',
    },
    {
      id: 16520229,
      featuredSrc: '/images/oxmantown.jpg',
      imgSrc:
        'https://b.zmtcdn.com/data/res_imagery/16520229_RESTAURANT_9a34e654358a6e5c229a0908fbd852dd_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      title: 'Oxmantown',
      content:
        'In this small place, the art of a brilliant sandwich means every element is taken seriously, like the breakfast sandwich that comes with butcher Jack McCarthy’s black pudding.',
      route: '/detail/[id]/[name]',
      asRoute: '/detail/16520229/oxmantown',
    },
    {
      id: 9100702,
      featuredSrc: '/images/chapter-one.jpg',
      imgSrc:
        'https://b.zmtcdn.com/data/res_imagery/9100702_RESTAURANT_03e5e7e79573629cf664fe8b037aeb4d.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      title: 'Chapter One',
      content:
        'Dublin writers are more closely associated with booze rather than food, but Chapter One is a Michelin-starred restaurant in the basement of the Dublin Writers Museum.',
      route: '/detail/[id]/[name]',
      asRoute: '/detail/9100702/chapter-one',
    },
    {
      id: 9101166,
      featuredSrc: '/images/rosa-madre.jpg',
      imgSrc:
        'https://b.zmtcdn.com/data/res_imagery/9101166_RESTAURANT_9efc824ff8987879a1aff7633776c526_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      title: 'Rosa Madre',
      content:
        'In the menu-hawking clamor of Temple Bar you might long for a quieter restaurant where you won’t feel like a tourist on a conveyor belt. If so, Rosa Madre is your place.',
      route: '/detail/[id]/[name]',
      asRoute: '/detail/9101166/rosa-madre',
    },
  ]);
};
