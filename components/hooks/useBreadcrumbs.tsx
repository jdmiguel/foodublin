import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addBreadcrumbs, replaceBreadcrumbs } from '../../store/actions';

import { InitialAppState, BreadcrumbsData } from '../../helpers/types';

const useBreadcrumbs = (
  currentBreadcrumbs: BreadcrumbsData,
  pageId: string,
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
  }, [pageId]);
};

export default useBreadcrumbs;
