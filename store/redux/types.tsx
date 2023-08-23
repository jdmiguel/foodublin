import { Restaurant } from '@/helpers/types';
import { BreadcrumbsData } from '@/components/core/types';

export type AppState = {
  favorites: Restaurant[];
  breadcrumbs: BreadcrumbsData[];
};

// Actions

type AddFavoriteAction = {
  type: 'ADD_FAVORITE';
  favorite: Restaurant;
};

type DeleteFavoriteAction = {
  type: 'DELETE_FAVORITE';
  id: string;
};

type AddBreadcrumbsAction = {
  type: 'ADD_BREADCRUMBS';
  breadcrumbs: BreadcrumbsData;
};

type ReplaceBreadcrumbsAction = {
  type: 'REPLACE_BREADCRUMBS';
  index: number;
  breadcrumbs: BreadcrumbsData;
};

export type Actions =
  | AddFavoriteAction
  | DeleteFavoriteAction
  | AddBreadcrumbsAction
  | ReplaceBreadcrumbsAction;
