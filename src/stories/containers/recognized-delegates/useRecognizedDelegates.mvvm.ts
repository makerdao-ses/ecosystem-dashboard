import { siteRoutes } from '@ses/config/routes';
import { LinkTypeEnum } from '@ses/core/enums/link-type.enum';

const useRecognizedDelegates = () => {
  const links = [
    {
      linkType: LinkTypeEnum.WWW,
      href: 'https://vote.makerdao.com/delegates',
    },
    {
      linkType: LinkTypeEnum.Forum,
      href: 'https://forum.makerdao.com/c/governance/delegates/43',
    },
    {
      linkType: LinkTypeEnum.Discord,
      href: 'https://discord.com/invite/uZxdmZcS',
    },
    {
      linkType: LinkTypeEnum.Youtube,
      href: 'https://www.youtube.com/@MakerDAO/videos',
    },
  ];

  const itemsBreadcrumb = [
    {
      label: 'Finances',
      url: siteRoutes.financesOverview,
    },
    {
      label: 'Recognized Delegates',
      url: siteRoutes.recognizedDelegate,
    },
  ];
  return {
    links,
    itemsBreadcrumb,
  };
};

export default useRecognizedDelegates;
