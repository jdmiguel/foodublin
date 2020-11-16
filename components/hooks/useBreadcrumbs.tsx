import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addBreadcrumbs, replaceBreadcrumbs } from '../../store/redux/actions';
import { InitialAppState } from '../../store/redux/types';

import { BreadcrumbsData } from '../core/types';

export const useBreadcrumbs = (
  currentBreadcrumbs: BreadcrumbsData,
  page: string,
) => {
  const { breadcrumbs } = useSelector((state: InitialAppState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const index = breadcrumbs.findIndex(
      (breadcrumb) => breadcrumb.type === currentBreadcrumbs.type,
    );
    dispatch(
      index === -1
        ? addBreadcrumbs(currentBreadcrumbs)
        : replaceBreadcrumbs(index, currentBreadcrumbs),
    );
  }, [page]);
};
