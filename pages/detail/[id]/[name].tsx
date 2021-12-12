import { useState, useEffect } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import ErrorPage from '@/components/pages/ErrorPage/ErrorPage';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { clearRelatedRestaurants, addFavorite, deleteFavorite } from '@/store/redux/actions';
import { AppState } from '@/store/redux/types';
import { DEFAULT_TEXT_LOADING } from '@/store/statics';
import { getFormattedUrlText, inferSSRProps } from '@/helpers/utils';
import { getRestaurant } from '@/services/index';
import { RestaurantDetail, Restaurant } from '@/components/pages/types';
import { BreadcrumbsType } from '@/components/core/types';

type DetailProps = inferSSRProps<typeof getServerSideProps>;

type CustomGetServerSidePropsContext = GetServerSidePropsContext & {
  params: {
    id: number;
  };
};

const DynamicDetailPage = dynamic(() => import('@/components/pages/DetailPage/DetailPage'), {
  loading: () => (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ),
});

const getRefinedRestaurant = (
  id: number,
  restaurant: RestaurantDetail | null,
): Restaurant | null => {
  if (!restaurant) {
    return null;
  }
  return {
    id,
    imgSrc: restaurant.thumbSrc,
    title: restaurant.name,
    content: restaurant.location,
    route: '/detail/[id]/[name]',
    asRoute: `/detail/${id}/${getFormattedUrlText(restaurant.name, true)}`,
  };
};

const Detail: NextPage<DetailProps> = ({ detail, id }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const { favorites, relatedRestaurants } = useSelector((state: AppState) => state);
  const dispatch = useDispatch();

  const router = useRouter();

  const isFavorite = favorites.some((favorite) => favorite.id === id);

  useEffect(() => {
    return () => {
      dispatch(clearRelatedRestaurants());
    };
  }, [dispatch, id]);

  const handleSaveButton = (action: string) => {
    const favorite = getRefinedRestaurant(id, detail);
    if (!favorite) {
      return;
    }

    dispatch(action === 'save' ? addFavorite(favorite) : deleteFavorite(id));
  };

  const detailBreadcrumbs = {
    text: detail?.name || '',
    route: '/detail/[id]/[name]',
    asRoute: `/detail/${id}/${getFormattedUrlText(detail?.name || '', true)}`,
    type: BreadcrumbsType.DETAIL,
  };
  const { breadcrumbs } = useBreadcrumbs(detailBreadcrumbs, 'detail');

  if (!detail) {
    return <ErrorPage isNavigating={isNavigating} onNavigate={() => setIsNavigating(true)} />;
  }

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={detail.imgSrc} />
      </Head>
      <DynamicDetailPage
        detail={detail}
        isFavorite={isFavorite}
        relatedRestaurants={relatedRestaurants}
        onClickSaveButton={handleSaveButton}
        onClickRelatedRestaurant={(route: string, asRoute: string) => router.push(route, asRoute)}
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

export const getServerSideProps = async ({ params: { id } }: CustomGetServerSidePropsContext) => {
  const { rawRestaurantDetail, status } = await getRestaurant(id);

  let formattedRestaurantDetail: RestaurantDetail | null = null;

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

  return {
    props: {
      detail: formattedRestaurantDetail,
      id,
    },
  };
};

export default Detail;
