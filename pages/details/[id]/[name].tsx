import { useState } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import ErrorPage from '@/components/views/Error';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { addFavorite, deleteFavorite } from '@/store/redux/actions';
import { AppState } from '@/store/redux/types';
import { DEFAULT_TEXT_LOADING } from '@/store/statics';
import { getFormattedUrlText, getFormattedHours, inferSSRProps } from '@/helpers/utils';
import { getRestaurantDetails } from '@/services/index';
import { RestaurantDetails, Restaurant } from '@/helpers/types';
import { BreadcrumbsType } from '@/components/core/types';

type DetailProps = inferSSRProps<typeof getServerSideProps>;

type CustomGetServerSidePropsContext = GetServerSidePropsContext & {
  params: {
    id: string;
  };
};

const DynamicDetailsPage = dynamic(() => import('@/components/views/Details'), {
  loading: () => (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ),
});

const getRefinedRestaurant = (id: string, details: RestaurantDetails | null): Restaurant | null => {
  if (!details) {
    return null;
  }
  return {
    id,
    imgSrc: details.imgSrc,
    title: details.name,
    content: details.address,
    route: '/details/[id]/[name]',
    asRoute: `/details/${id}/${getFormattedUrlText(details.name, true)}`,
  };
};

const Detail: NextPage<DetailProps> = ({ details, id }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const { favorites } = useSelector((state: AppState) => state);
  const dispatch = useDispatch();

  const router = useRouter();

  const isFavorite = favorites.some((favorite) => favorite.id === id);

  const handleSaveButton = (action: string) => {
    const favorite = getRefinedRestaurant(id, details);
    if (!favorite) {
      return;
    }

    dispatch(action === 'save' ? addFavorite(favorite) : deleteFavorite(id));
  };

  const detailBreadcrumbs = {
    text: details?.name || '',
    route: '/details/[id]/[name]',
    asRoute: `/details/${id}/${getFormattedUrlText(details?.name || '', true)}`,
    type: BreadcrumbsType.DETAILS,
  };
  const { breadcrumbs } = useBreadcrumbs(detailBreadcrumbs, 'details');

  if (!details) {
    return <ErrorPage isNavigating={isNavigating} onNavigate={() => setIsNavigating(true)} />;
  }

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={details.imgSrc} />
      </Head>
      <DynamicDetailsPage
        details={details}
        isFavorite={isFavorite}
        onClickSaveButton={handleSaveButton}
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
  const { details } = await getRestaurantDetails(id);

  let restaurantDetails: RestaurantDetails | null = null;

  if (details) {
    const formattedCategories = details.categories?.map((category) => category.title);
    const formattedAddress = details.location.display_address.join(' - ');
    const formattedHours = Array.isArray(details.hours)
      ? getFormattedHours(details.hours[0].open)
      : null;

    restaurantDetails = {
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
      details: restaurantDetails,
      id,
    },
  };
};

export default Detail;
