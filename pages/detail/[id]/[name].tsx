import React, { useEffect } from 'react';

import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { useSelector, useDispatch } from 'react-redux';

import ErrorPage from '../../../components/pages/ErrorPage/ErrorPage';

import { FullLoader } from '../../../components/ui/FullLoader/FullLoader';

import { Loader } from '../../../components/core/Loader/Loader';

import { useBreadcrumbs } from '../../../components/hooks/useBreadcrumbs';

import {
  clearRelatedRestaurants,
  addFavorite,
  deleteFavorite,
} from '../../../store/actions';

import { DEFAULT_TEXT_LOADING } from '../../../helpers/staticData';
import {
  InitialAppState,
  RestaurantDetail,
  Review,
  RawReview,
  Restaurant,
  BreadcrumbsType,
} from '../../../helpers/types';
import { getFormattedUrlText } from '../../../helpers/utils';

import { getRestaurant, getReviews } from '../../../services';

type DetailProps = {
  data: RestaurantDetail | null;
  reviewsData: Review[] | null;
  id: number;
};

type CustomNextPageContext = NextPageContext & {
  query: {
    id: number;
  };
};

const DynamicDetailPage = dynamic(
  () => import('../../../components/pages/DetailPage/DetailPage'),
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <FullLoader>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
    ),
  },
);

const getRefinedRestaurant = (
  id: number,
  restaurant: RestaurantDetail,
): Restaurant => ({
  id,
  imgSrc: restaurant.thumbSrc,
  title: restaurant.name,
  content: restaurant.location,
  route: '/detail/[id]/[name]',
  asRoute: `/detail/${id}/${getFormattedUrlText(restaurant.name, true)}`,
});

const getRefinedReview = (rawReview: RawReview): Review => ({
  id: rawReview.review.id,
  userName: rawReview.review.user.name,
  userImgSrc: rawReview.review.user.profile_image,
  rating: rawReview.review.rating,
  date: rawReview.review.review_time_friendly,
  text: rawReview.review.review_text || rawReview.review.rating_text,
});

const selectReviews = (rawReviews: RawReview[]) => (
  formattedFuntion: (rawReview: RawReview) => Review,
) => rawReviews.map((rawReview) => formattedFuntion(rawReview));

const Detail: NextPage<DetailProps> = ({ data, reviewsData, id }) => {
  if (!data) {
    return <ErrorPage />;
  }

  const { favorites, relatedRestaurants } = useSelector(
    (state: InitialAppState) => state,
  );
  const dispatch = useDispatch();

  const router = useRouter();

  const isFavorite = favorites.some((favorite) => favorite.id === id);

  useEffect(() => {
    console.log('reviews: ', reviewsData);
    return () => {
      dispatch(clearRelatedRestaurants());
    };
  }, [id]);

  const handleSaveButton = (action: string) => {
    const favorite = getRefinedRestaurant(id, data);
    dispatch(action === 'save' ? addFavorite(favorite) : deleteFavorite(id));
  };

  const { name, imgSrc } = data;
  const detailBreadcrumbs = {
    text: name,
    route: '/detail/[id]/[name]',
    asRoute: `/detail/${id}/${getFormattedUrlText(name, true)}`,
    type: BreadcrumbsType.DETAIL,
  };
  useBreadcrumbs(detailBreadcrumbs, id);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={imgSrc} />
      </Head>
      <DynamicDetailPage
        data={data}
        isFavorite={isFavorite}
        relatedRestaurants={relatedRestaurants}
        onClickSaveButton={handleSaveButton}
        onClickRelatedRestaurant={(route: string, asRoute: string) =>
          router.push(route, asRoute)
        }
      />
    </>
  );
};

export const getServerSideProps = async ({ query }: CustomNextPageContext) => {
  const { id } = query;

  const { data, status } = await getRestaurant(id);
  const { data: reviewsData, status: reviewsStatus } = await getReviews(id);

  let filteredData: RestaurantDetail | null = null;
  let currentReviewsData: Review[] | null = null;

  if (status === 200) {
    filteredData = {
      imgSrc: data.featured_image,
      thumbSrc: data.thumb,
      name: data.name,
      location: data.location.locality,
      cuisines: data.cuisines,
      timings: data.timings,
      rating: data.user_rating.aggregate_rating,
      votes: data.user_rating.votes,
      average: data.average_cost_for_two,
      establishment: data.establishment[0],
      highlights: data.highlights,
      phone: data.phone_numbers,
      address: data.location.address,
    };
  }

  if (reviewsStatus === 200) {
    const reviews = selectReviews(reviewsData.user_reviews);
    currentReviewsData = reviews(getRefinedReview);
  }

  return {
    props: {
      data: filteredData,
      reviewsData: currentReviewsData,
      id,
    },
  };
};

export default Detail;
