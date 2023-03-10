import React from 'react';
import CookiesPolicyContainer from '../../src/stories/containers/CookiesPolicy/CookiesPolicyContainer';

const CookiesPolicy = () => <CookiesPolicyContainer />;

export async function getServerSideProps() {
  return { props: {} };
}
export default CookiesPolicy;
