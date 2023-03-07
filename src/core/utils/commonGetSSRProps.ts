import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../config/endpoints';

export const getSSRPropsDefaultAuth = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      protected: true,
    },
  };
};
