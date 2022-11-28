import Router from 'next/router';

export const goBack = (defaultRoute?: string): void => {
  if (window?.history?.state?.idx > 0) {
    Router.back();
  } else {
    Router.push(defaultRoute || '/');
  }
};
