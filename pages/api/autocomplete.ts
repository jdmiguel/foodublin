import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_API } from '@/store/statics';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchText, latitude, longitude } = req.query;

  try {
    const response = await axios(`${BASE_API}autocomplete`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        text: searchText,
        latitude,
        longitude,
      },
    });

    res.status(200).json(response.data.businesses);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
};
