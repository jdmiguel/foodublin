import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_API } from '@/store/statics';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const detailsResponse = await axios(`${BASE_API}businesses/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    const reviewsResponse = await axios(
      `${BASE_API}businesses/${detailsResponse.data.id}/reviews`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'x-requested-with': 'xmlhttprequest',
          accept: 'application/json',
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      },
    );

    res.status(200).json({ ...detailsResponse.data, ...reviewsResponse.data });
  } catch (error: any) {
    console.error('Error fetching data from Yelp API:', error);
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
};
