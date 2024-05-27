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
      href: '/link1',
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
      href: '/link1',
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
      href: '/link1',
    },
    {
      icon: <XSocialNetwork fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]} />,
      title: 'Twitter X',
      href: '/link1',
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
      href: '/link1',
    },
    {
      icon: <LinkedIn fill={isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[100]} />,
      title: 'Linkedin',
      href: '/link1',
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
      href: '/link1',
    },
  ];
  return links;
};
