import { useState } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import ErrorPage from '@/components/pages/ErrorPage/ErrorPage';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { addFavorite, deleteFavorite } from '@/store/redux/actions';
import { AppState } from '@/store/redux/types';
import { DEFAULT_TEXT_LOADING } from '@/store/statics';
import { getFormattedUrlText, getFormattedHours, inferSSRProps } from '@/helpers/utils';
import { getRestaurantDetails } from '@/services/index';
import { RestaurantDetail, Restaurant } from '@/components/pages/types';
import { BreadcrumbsType } from '@/components/core/types';

type DetailProps = inferSSRProps<typeof getServerSideProps>;

type CustomGetServerSidePropsContext = GetServerSidePropsContext & {
  params: {
    id: string;
  };
};

const DynamicDetailPage = dynamic(() => import('@/components/pages/DetailPage/DetailPage'), {
  loading: () => (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ),
}) as any;

const getRefinedRestaurant = (
  id: string,
  restaurant: RestaurantDetail | null,
): Restaurant | null => {
  if (!restaurant) {
    return null;
  }
  return {
    id,
    imgSrc: restaurant.imgSrc,
    title: restaurant.name,
    content: restaurant.address,
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
  const { details, status } = await getRestaurantDetails(id);

  let formattedRestaurantDetail: RestaurantDetail | null = null;

  const formattedCategories = details.categories?.map((category) => category.title);
  const formattedAddress = details.location.display_address.join(' - ');
  const formattedHours = Array.isArray(details.hours)
    ? getFormattedHours(details.hours[0].open)
    : null;

  console.log(details);

  if (status === 200) {
    formattedRestaurantDetail = {
      imgSrc: details.image_url,
      name: details.name,
      phone: details.display_phone,
      categories: formattedCategories,
      rating: details.rating,
      price: details.price || null,
      reviewCount: details.review_count,
      hours: formattedHours,
      address: formattedAddress,
      street: details.location.address1,
      reviews: details.reviews,
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
