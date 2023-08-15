import { useState, useEffect } from 'react';
import { LazyImage } from 'react-lazy-images';
import { Layout } from '../../layouts/Layout/Layout';
import { FullLoader } from '../../ui/FullLoader/FullLoader';
import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { BlockTitle } from '../../core/BlockTitle/BlockTitle';
import { Rating } from '../../core/Rating/Rating';
import { Button } from '../../core/Button/Button';
import { PercentBar } from '../../core/PercentBar/PercentBar';
import { LoaderType, BreadcrumbsData } from '../../core/types';
import { Review } from '../../ui/Review/Review';
import { Address } from './Address';
import {
  StyledOverlay,
  StyledName,
  StyledStreet,
  StyledButtonWrapper,
  StyledHeader,
  StyledDetailPage,
  StyledInformation,
  StyledMainInformation,
  StyledExtraInformation,
  StyledSectionBlock,
  StyledTitleWrapper,
  StyledAddressWrapper,
  StyledPhone,
  StyledReviews,
} from './styles';
import { getFormattedUrlText } from '@/helpers/utils';
import {
  WEEK_DAYS,
  MAX_PRICE_PERCENT,
  MAX_EURO_PRICE_AMOUNT,
  DETAIL_GENERIC_SRC,
  DEFAULT_TEXT_LOADING,
} from '@/store/statics';
import { Categories } from './Categories';
import { Timings } from './Timings';
import { RestaurantDetail, Timing, HourDetail, Review as ReviewType } from '../types';

type DetailPageProps = {
  detail: RestaurantDetail;
  isFavorite: boolean;
  isNavigating: boolean;
  onClickSaveButton: (action: string) => void;
  onClickRelatedRestaurant: (route: string, asRoute: string) => void;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs: BreadcrumbsData[];
};

export const getTimings = (hours: HourDetail[]): Timing[] =>
  hours.map((hour) => {
    const day = WEEK_DAYS[hour.day];
    const startHour = hour.start.slice(0, 2) + ':' + hour.start.slice(2);
    const endHour = hour.end.slice(0, 2) + ':' + hour.end.slice(2);

    return {
      id: String(hour.day),
      day,
      schedule: `${startHour} - ${endHour}`,
    };
  });

export const getCostPercent = (euroString: string): number =>
  (euroString.length * MAX_PRICE_PERCENT) / MAX_EURO_PRICE_AMOUNT;

export const getMapSrc = (name: string, location: string) => {
  const urlName = getFormattedUrlText(name);
  const urlLocation = getFormattedUrlText(location);

  return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY}&q=${urlName}-${urlLocation},Dublin&zoom=16`;
};

const DetailPage: React.FC<DetailPageProps> = ({
  detail: {
    imgSrc,
    name,
    phone,
    categories,
    rating,
    price,
    reviewCount,
    hours,
    address,
    street,
    reviews,
  },
  isFavorite,
  onClickSaveButton,
  onNavigate,
  isNavigating,
  breadcrumbs,
}) => {
  const [isSaved, setIsSaved] = useState(isFavorite);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(false);
  }, []);

  const clickSaveButton = () => {
    setIsSaved((isSaved) => !isSaved);
    onClickSaveButton(isFavorite ? 'unsave' : 'save');
  };

  const getStyledHeader = (ref: any, imgSrc: string) => (
    <StyledHeader data-testid="detail-header" ref={ref} bgImg={imgSrc}>
      <StyledOverlay>
        <StyledName>{name}</StyledName>
        <StyledStreet>{street}</StyledStreet>
        {isLoading ? (
          <StyledButtonWrapper>
            <Button onClick={clickSaveButton}>{DEFAULT_TEXT_LOADING}</Button>
          </StyledButtonWrapper>
        ) : (
          <StyledButtonWrapper>
            {' '}
            <Button onClick={clickSaveButton}>
              <i className="material-icons">{`${isSaved ? 'favorite' : 'favorite_border'}`}</i>
              {`${isSaved ? 'saved' : 'unsaved'}`}
            </Button>
          </StyledButtonWrapper>
        )}
      </StyledOverlay>
    </StyledHeader>
  );

  const getHeader = (imgSrc: string) => {
    if (imgSrc) {
      return (
        <LazyImage
          src={imgSrc}
          placeholder={({ ref }) => getStyledHeader(ref, DETAIL_GENERIC_SRC)}
          actual={({ imageProps }) => getStyledHeader(null, imageProps.src)}
        />
      );
    }

    return getStyledHeader(null, DETAIL_GENERIC_SRC);
  };

  return (
    <Layout onNavigate={onNavigate} breadcrumbs={breadcrumbs}>
      <StyledDetailPage data-testid="detail-page">
        <FullLoader isShown={isNavigating} type={LoaderType.LINE}>
          <Loader type={LoaderType.LINE} />
        </FullLoader>
        {getHeader(imgSrc)}
        <Title text="Relevant information" />
        <StyledInformation data-testid="detail-info">
          <StyledMainInformation>
            {phone && (
              <StyledSectionBlock data-testid="detail-phone">
                <StyledTitleWrapper>
                  <BlockTitle text="Phone" />
                </StyledTitleWrapper>
                <StyledPhone>{phone}</StyledPhone>
              </StyledSectionBlock>
            )}
            {hours && (
              <StyledSectionBlock data-testid="detail-schedule">
                <StyledTitleWrapper>
                  <BlockTitle text="Schedule" />
                </StyledTitleWrapper>
                <Timings timings={getTimings(hours)} />
              </StyledSectionBlock>
            )}
          </StyledMainInformation>
          <StyledExtraInformation>
            {categories && (
              <StyledSectionBlock data-testid="detail-categories">
                <StyledTitleWrapper>
                  <BlockTitle text="Categories" />
                </StyledTitleWrapper>
                <Categories list={categories} />
              </StyledSectionBlock>
            )}
            {price && (
              <StyledSectionBlock data-testid="detail-price">
                <StyledTitleWrapper>
                  <BlockTitle text="Cost rank" />
                </StyledTitleWrapper>
                <PercentBar
                  percent={getCostPercent(price)}
                  legend={{ initial: 'low', end: 'high' }}
                />
              </StyledSectionBlock>
            )}
            {rating && (
              <StyledSectionBlock data-testid="detail-rating">
                <StyledTitleWrapper>
                  <BlockTitle text="Rating" />
                </StyledTitleWrapper>
                <Rating value={rating} votes={reviewCount} />
              </StyledSectionBlock>
            )}
          </StyledExtraInformation>
          {name && address && (
            <StyledAddressWrapper data-testid="detail-address" className="paper">
              <Address mapSrc={getMapSrc(name, address)} address={address} />
            </StyledAddressWrapper>
          )}
        </StyledInformation>
        <Title text="Reviews" />
        <StyledReviews>
          {reviews?.map((review: ReviewType) => (
            <Review key={review.id} data={review} />
          ))}
        </StyledReviews>
      </StyledDetailPage>
    </Layout>
  );
};

export default DetailPage;
