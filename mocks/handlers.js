import { rest } from 'msw';
import { searchInputRestaurants } from './data/search-input-restaurants';

export const handlers = [
  rest.get(`${process.env.BASE_API}search`, (req, res, ctx) => {
    return res(ctx.json(searchInputRestaurants));
  }),
];
