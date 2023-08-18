import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_API } from '@/store/statics';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { latitude, longitude, cuisine, offset } = req.query;

  try {
    const response = await axios(`${BASE_API}businesses/search`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants',
        latitude,
        longitude,
        radius: 1000,
        categories: cuisine,
        offset,
        limit: 20,
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching data from Yelp API:', error);
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
};
