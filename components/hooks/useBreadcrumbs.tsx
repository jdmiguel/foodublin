import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { InitialState } from '../../store/reducer';
import { addBreadcrumbs, replaceBreadcrumbs } from '../../store/actions';

import { BreadcrumbsData } from '../../helpers/types';

const useBreadcrumbs = (currentBreadcrumbs: BreadcrumbsData) => {
  const { breadcrumbs } = useSelector((state: InitialState) => state);
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
  }, []);
};

export default useBreadcrumbs;
