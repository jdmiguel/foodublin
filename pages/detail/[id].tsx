import React from 'react';
import { NextPageContext } from 'next';

import DetailPage from '../../components/DetailPage/DetailPage';

/*type DetailProps = {
  id: string;
};*/

//const Detail = ({ id }: DetailProps) => <DetailPage />;
const Detail = () => <DetailPage />;

Detail.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;
  return { id };
};

export default Detail;
