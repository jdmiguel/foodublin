import React from 'react';
import { NextPageContext } from 'next';

type DetailProps = {
  id: string;
};

const Detail = ({ id }: DetailProps) => <div>Detail: {id}</div>;

Detail.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;
  return { id };
};

export default Detail;
