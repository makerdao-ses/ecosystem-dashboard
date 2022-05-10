import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import VerticalRectangle from '../svg/VerticalRectangle';

type MenuType = {
    title: string,
    id?: string,
    expanded?: boolean,
    icon?: JSX.Element,
    items?: MenuType[],
  }

export const menuItems = [
  {
    title: 'Core Units',
    icon: <DashboardIcon />,
    items: [
      {
        title: 'About',
        icon: <VerticalRectangle />,
        items: [
          {
            title: 'About the Core Unit',
            id: 'about-sustainable-ecosystem-scaling-core-unit',
          },
          {
            title: 'What we do',
            id: ' what-we-do',
          },
          {
            title: 'Team Size',
            id: 'team-size',
          },
          {
            title: 'MIPs (Maker Improvement Proposals)',
            id: 'mips',
          }
        ]
      },
      {
        title: 'Initiatives',
      },
      {
        title: 'Finances',
      }
    ]
  },
  {
    title: 'Strategic Initiatives',
    icon: <BatchPredictionIcon />,
  },
  {
    title: 'Finances',
    icon: <PaidIcon />,
  },
  {
    title: 'People',
    icon: <PeopleIcon />,
  }
];
