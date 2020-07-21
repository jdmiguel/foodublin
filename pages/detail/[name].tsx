import React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import DetailPage from '../../components/DetailPage/DetailPage';

/*type DetailProps = {
  id: string;
};*/

//const Detail = ({ id }: DetailProps) => <DetailPage />;
const Detail = () => {
  const router = useRouter();
  console.log(router.query);

  return <DetailPage />;
};

Detail.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;
  return { id };
};

export default Detail;
