import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';

export const useRecognizedDelegates = () => {
  const totalDAI = Math.trunc(17892312 || 0).toLocaleString('es-US');
  const startMonth = 'Nov 2021';
  const endMonth = 'Jun 2023';
  const links = [
    {
      linkType: LinkTypeEnum.Forum,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Twitter,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.Github,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.LinkedIn,
      href: '#',
    },
  ];

  return {
    totalDAI,
    startMonth,
    endMonth,
    links,
  };
};
