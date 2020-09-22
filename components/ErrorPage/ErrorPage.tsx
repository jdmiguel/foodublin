import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from '../../layouts/Layout';

import BlockTitle from '../core/BlockTitle/BlockTitle';
import Button from '../core/Button/Button';

const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 70px;
  @media only screen and (min-width: 428px) {
    margin: 50px auto;
  }
  @media only screen and (min-width: 1024px) {
    margin: 75px auto 60px;
    padding: 0 30px;
  }
`;

const StyledText = styled(BlockTitle)`
  margin-bottom: 20px;
`;

const ErrorPage: React.FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <StyledErrorPage className="grid-container">
        <StyledText text="Sorry but something was wrong..." />
        <Button fullWidth={false} onClick={() => router.push('/')}>
          <i className="material-icons">home</i>Back to home
        </Button>
      </StyledErrorPage>
    </Layout>
  );
};

export default ErrorPage;
