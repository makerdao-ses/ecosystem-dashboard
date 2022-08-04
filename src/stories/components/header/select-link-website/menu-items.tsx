import React, { ReactNode } from 'react';
import Logo from '../../svg/logo';
import MakerBurn from '../../svg/maker-burn';
import Makerdao from '../../svg/makerdao';
import MipsPortal from '../../svg/mips-portal';
import VotingPortal from '../../svg/voting-portal';

export type WebSiteLinks = {
  title?: string
  logo: ReactNode | JSX.Element
  background?: string
  fontSize?: number | string
  color?: string
  fontWeight?: number
  link: string
  marginTop?: string
  marginBottom?: string
  fontFamily?: string
  lineHeight?: string
  padding?: string
  subtract?: ReactNode | JSX.Element,
  id: string
  description: string
  height?: string
  letterSpacing?: string
  colorDark?: string
}

export const itemsWebSiteLinks: WebSiteLinks[] = [

  {
    title: 'makerburn.com',
    description: 'Easily view onchain data that surfaces key protocol health metrics.',
    logo: <MakerBurn />,
    color: '#000000',
    colorDark: '#FFFFFF',
    fontFamily: 'Cantarell,sans-serif',
    lineHeight: '26px',
    fontSize: 18,
    fontWeight: 500,
    link: 'https://makerburn.com/#/',
    marginBottom: '32px',
    id: 'MakerBurn',
  },
  {
    title: 'Forum',
    description: 'Get up to date on the latest discussions within the Maker community.',
    logo: <Makerdao />,
    fontSize: 24,
    fontWeight: 400,
    color: '#1AAB9B',
    colorDark: '#1AAB9B',
    link: 'https://forum.makerdao.com/',
    marginBottom: '32px',
    fontFamily: 'SF Pro Display, sans-serif',
    id: 'Forum',
    letterSpacing: '3px',
  },
  {
    logo: <Logo width={48} height={24.71} fillDark='#FFFFFF' />,
    description: 'See how MKR holders are having their voice heard through protocol governance.',
    background: '#231635',
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 700,
    color: 'red',
    link: 'https://vote.makerdao.com/',
    marginTop: '32px',
    marginBottom: '32px',
    fontFamily: 'SF Pro Display, sans-serif',
    padding: '4px 8px',
    subtract: <VotingPortal fillDark='#D2D4EF' />,
    id: 'Voting Portal',
    height: '120px',
  },

  {
    logo: <Logo fill='#1AAB9B' width={48} height={24.71} fillDark='#1AAB9B' />,
    description: 'Understand the formalized decision making process that underpins Maker Governance.',
    background: '#1AAB9B',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
    color: '#FFFFFF',
    link: 'https://mips.makerdao.com/',
    marginBottom: '32px',
    fontFamily: 'Roboto , sans-serif',
    padding: '4px 12px',
    subtract: <MipsPortal />,
    id: 'MIPs Portal',
    height: '120px',
  },
];
