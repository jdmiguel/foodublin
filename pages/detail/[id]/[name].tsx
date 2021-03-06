import React, { useState, useEffect } from 'react';
import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';

import ErrorPage from '@/components/pages/ErrorPage/ErrorPage';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';

import {
  clearRelatedRestaurants,
  addFavorite,
  deleteFavorite,
} from '@/store/redux/actions';
import { InitialAppState } from '@/store/redux/types';
import { DEFAULT_TEXT_LOADING } from '@/store/statics';

import { getFormattedUrlText } from '@/helpers/utils';

import { getRestaurant, getReviews } from '@/services/index';

import {
  RestaurantDetail,
  Review,
  RawReview,
  Restaurant,
} from '@/components/pages/types';
import { BreadcrumbsType } from '@/components/core/types';

type DetailProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type CustomGetServerSidePropsContext = GetServerSidePropsContext & {
  params: {
    id: number;
  };
};

const DynamicDetailPage = dynamic(
  () => import('@/components/pages/DetailPage/DetailPage'),
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

const Detail: NextPage<DetailProps> = ({ detail, reviews, id }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  if (!detail) {
    return (
      <ErrorPage
        isNavigating={isNavigating}
        onNavigate={() => setIsNavigating(true)}
      />
    );
  }

  const { favorites, relatedRestaurants } = useSelector(
    (state: InitialAppState) => state,
  );
  const dispatch = useDispatch();

  const router = useRouter();

  const isFavorite = favorites.some((favorite) => favorite.id === id);

  useEffect(() => {
    return () => {
      dispatch(clearRelatedRestaurants());
    };
  }, [id]);

  const handleSaveButton = (action: string) => {
    const favorite = getRefinedRestaurant(id, detail);
    dispatch(action === 'save' ? addFavorite(favorite) : deleteFavorite(id));
  };

  const { name, imgSrc } = detail;
  const detailBreadcrumbs = {
    text: name,
    route: '/detail/[id]/[name]',
    asRoute: `/detail/${id}/${getFormattedUrlText(name, true)}`,
    type: BreadcrumbsType.DETAIL,
  };
  const { breadcrumbs } = useBreadcrumbs(detailBreadcrumbs, 'detail');

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={imgSrc} />
      </Head>
      <DynamicDetailPage
        detail={detail}
        reviews={reviews}
        isFavorite={isFavorite}
        relatedRestaurants={relatedRestaurants}
        onClickSaveButton={handleSaveButton}
        onClickRelatedRestaurant={(route: string, asRoute: string) =>
          router.push(route, asRoute)
        }
        isNavigating={isNavigating}
        onNavigate={(route: string, asRoute?: string) => {
          setIsNavigating(true);
          router.push(route, asRoute && asRoute);
        }}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: CustomGetServerSidePropsContext) => {
  const { rawRestaurantDetail, status } = await getRestaurant(id);
  const { rawReviews, status: reviewsStatus } = await getReviews(id);

  let formattedRestaurantDetail: RestaurantDetail | null = null;
  let formattedReviews: Review[] | null = null;

  if (status === 200) {
    formattedRestaurantDetail = {
      imgSrc: rawRestaurantDetail.featured_image,
      thumbSrc: rawRestaurantDetail.thumb,
      name: rawRestaurantDetail.name,
      location: rawRestaurantDetail.location.locality,
      cuisines: rawRestaurantDetail.cuisines,
      timings: rawRestaurantDetail.timings,
      rating: rawRestaurantDetail.user_rating.aggregate_rating,
      votes: rawRestaurantDetail.user_rating.votes,
      average: rawRestaurantDetail.average_cost_for_two,
      establishment: rawRestaurantDetail.establishment[0] || '',
      highlights: rawRestaurantDetail.highlights,
      phone: rawRestaurantDetail.phone_numbers,
      address: rawRestaurantDetail.location.address,
    };
  }

  if (reviewsStatus === 200) {
    const currentReviews = selectReviews(rawReviews);
    formattedReviews = currentReviews(getRefinedReview);
  }

  return {
    props: {
      detail: formattedRestaurantDetail,
      reviews: formattedReviews,
      id,
    },
  };
};

export default Detail;
