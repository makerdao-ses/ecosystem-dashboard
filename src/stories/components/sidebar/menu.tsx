import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import VerticalRectangle from '../svg/VerticalRectangle';

export const menuItems = [
  {
    title: 'Core Units',
    id: 'core-units',
    icon: <DashboardIcon />,
    items: [
      {
        title: 'About',
        id: 'about',
        icon: <VerticalRectangle />,
        items: [
          {
            title: 'About the Core Unit',
            id: 'about-the-core-unit',
          },
          {
            title: 'What we do',
            id: 'what-we-do',
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
        id: 'initiatives',
      },
      {
        title: 'Finances',
        id: 'core-units-finances',
      }
    ]
  },
  {
    title: 'Strategic Initiatives',
    id: 'strategic-initiatives',
    icon: <BatchPredictionIcon />,
  },
  {
    title: 'Finances',
    id: 'finances',
    icon: <PaidIcon />,
  },
  {
    title: 'People',
    id: 'people',
    icon: <PeopleIcon />,
  }
];
