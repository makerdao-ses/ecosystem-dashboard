import React from 'react';
import CookiesPolicyContainer from '../../src/stories/containers/cookies-policy/cookies-policy-container';

const CookiesPolicy = () => {
  return <CookiesPolicyContainer />;
};

export async function getServerSideProps() {
  return { props: {} };
}
export default CookiesPolicy;
