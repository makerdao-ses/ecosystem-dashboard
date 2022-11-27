import Router from 'next/router';

export const goBack = (defaultRoute?: string): void => {
  console.log('goBack');
  console.log('window?.history?.length', window?.history?.length);
  console.log('window?.history?.state', window?.history?.state?.idx);
  if (window?.history?.state?.idx > 0) {
    Router.back();
  } else {
    Router.push(defaultRoute || '/');
  }
};
