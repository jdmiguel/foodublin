import React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '../../layouts/Layout/Layout';

import { FullLoader } from '../../ui/FullLoader/FullLoader';

import { Loader } from '../../core/Loader/Loader';
import { Button } from '../../core/Button/Button';

import { StyledErrorPage, StyledText } from './styles';

import { LoaderType } from '../../core/types';

type ErrorPage = {
  isNavigating: boolean;
  onNavigate: () => void;
};

const ErrorPage: React.FC<ErrorPage> = ({ isNavigating, onNavigate }) => {
  const router = useRouter();

  return (
    <Layout onNavigate={onNavigate}>
      <StyledErrorPage className="grid-container">
        <FullLoader isShowed={isNavigating} type={LoaderType.LINE}>
          <Loader type={LoaderType.LINE} />
        </FullLoader>
        <StyledText text="Sorry but something was wrong..." />
        <Button fullWidth={false} onClick={() => router.push('/')}>
          <i className="material-icons">home</i>Back to home
        </Button>
      </StyledErrorPage>
    </Layout>
  );
};

export default ErrorPage;
