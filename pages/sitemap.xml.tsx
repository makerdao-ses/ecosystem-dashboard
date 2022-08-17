import { GetServerSideProps } from 'next';
import { featureFlags } from '../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../src/config/endpoints';
import { SitemapBuilder } from '../src/core/utils/sitemap';

const Sitemap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async({ res }) => {
  const flags = featureFlags[CURRENT_ENVIRONMENT];
  if (!flags.FEATURE_SITEMAP) {
    return {
      notFound: true,
    };
  }

  const sitemapBuilder = new SitemapBuilder();
  const sitemap = await sitemapBuilder.build();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, immutable');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
