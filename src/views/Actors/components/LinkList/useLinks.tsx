import { useTheme } from '@mui/material';
import React from 'react';
import Discord from '@/components/icons/Discord';
import Forum from '@/components/icons/Forum';
import Github from '@/components/icons/Github';
import LinkedIn from '@/components/icons/LinkeIn';
import Website from '@/components/icons/Website';
import XSocialNetwork from '@/components/icons/XSocialNetwork';
import Youtube from '@/components/icons/Youtube';

export const useLinks = () => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const links = [
    {
      icon: <Website fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]} />,
      title: 'Website',
      href: 'https://ses.makerdao.network',
    },
    {
      icon: (
        <Forum
          fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]}
          width={14}
          height={14}
        />
      ),
      title: ' Forum',
      href: 'https://forum.makerdao.com/c/legacy/sustainable-ecosystem-scaling/42',
    },
    {
      icon: (
        <Discord
          fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]}
          width={14}
          height={14}
        />
      ),
      title: 'Discord',
      href: 'https://discord.com/invite/RBRumCpEDH',
    },
    {
      icon: <XSocialNetwork fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]} />,
      title: 'Twitter X',
      href: 'https://x.com/MakerDAO',
    },
    {
      icon: (
        <Github
          fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]}
          width={14}
          height={14}
        />
      ),
      title: 'Github',
      href: 'https://github.com/makerdao',
    },
    {
      icon: <LinkedIn fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]} />,
      title: 'Linkedin',
      href: 'https://www.linkedin.com/company/makerdao-ses/',
    },
    {
      icon: (
        <Youtube
          fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]}
          width={14}
          height={14}
        />
      ),
      title: 'Youtube',
      href: 'https://www.youtube.com/MakerDAO',
    },
  ];
  return links;
};
