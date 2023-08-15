import { createStore, Reducer } from 'redux';
import appReducer from '@/store/redux/reducer';
import { HourDetail } from '@/components/pages/types';

// GENERAL UTILS

type ComposableStringFunction = (text: string) => string;

export const compose =
  (...fns: ComposableStringFunction[]) =>
  (value: string) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

//const checkAlphanumeric = (name: string) => !!name.match(/^[0-9a-zA-Z]+$/);

export const getAlphanumericText = (text: string) => text.replace(/[^a-z0-9]/gi, '');

export const getLoweredText = (text: string) => text.toLowerCase();

export const getFormattedUrlText = (text: string, isPath = false) => {
  const concatenatorSymbol = isPath ? '-' : '+';
  return text.split(' ').reduce((acc: string, next: string) => {
    const concatenator = acc && getAlphanumericText(next) ? concatenatorSymbol : '';
    const formattedText = compose(getLoweredText, getAlphanumericText);

    return `${acc}${concatenator}${formattedText(next)}`;
  }, '');
};

export const getFormattedHours = (hoursDetails: HourDetail[]) => {
  const formattedHourDetails = hoursDetails.reduce(
    (
      newHoursDetails: HourDetail[],
      nextHourDetail: HourDetail,
      currentIndex: number,
      prevHoursDetails: HourDetail[],
    ) => {
      if (currentIndex > 0 && prevHoursDetails[currentIndex - 1].day === nextHourDetail.day) {
        newHoursDetails.splice(newHoursDetails.length - 1, 1, nextHourDetail);
      } else {
        newHoursDetails.push(nextHourDetail);
      }

      return newHoursDetails;
    },
    [],
  );

  return formattedHourDetails;
};

// SEARCH AND FAVORITES PAGE TITLE

export const getTitleText = (total: number) => ({
  totalText: total > 0 ? total : 'There are no',
  restaurantText: `restaurant${total === 0 || total >= 2 ? 's' : ''}`,
});

type GetSSRResult<TProps> = { props: TProps } | { redirect: any } | { notFound: true };

type GetSSRFn<TProps> = (args: any) => Promise<GetSSRResult<TProps>>;

// TYPES

export type inferSSRProps<TFn extends GetSSRFn<any>> = TFn extends GetSSRFn<infer TProps>
  ? NonNullable<TProps>
  : never;

type GetStaticResult<TProps> = { props: TProps } | { redirect: any } | { notFound: true };

type GetStaticFn<TProps> = (args: any) => Promise<GetStaticResult<TProps>>;

export type inferStaticProps<TFn extends GetStaticFn<any>> = TFn extends GetStaticFn<infer TProps>
  ? NonNullable<TProps>
  : never;

// CreateMockStore

export const createTestStore = () => createStore(appReducer as Reducer);

// Debounce

export type Timer = ReturnType<typeof setTimeout>;

export const debounce = (fn: any, delay: number) => {
  let timer: Timer;

  return (...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
