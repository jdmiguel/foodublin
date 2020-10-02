import React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '../../layouts/Layout/Layout';

import { Button } from '../../core/Button/Button';

import { StyledErrorPage, StyledText } from './styles';

export const ErrorPage: React.FC = () => {
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
