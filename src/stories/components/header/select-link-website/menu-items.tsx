import React, { ReactNode } from 'react';
import Logo from '../../svg/logo';
import Makerdao from '../../svg/makerdao';

export type WebSiteLinks = {
    title: string
    logo: ReactNode | JSX.Element
    background?: string
    fontSize?: number
    color?: string
    fontWeight?: number
    link: string
    marginTop?: string
    marginBottom?: string
  }

export const itemsWebSiteLinks: WebSiteLinks[] = [
  {
    title: 'Voting Portal',
    logo: <Logo />,
    background: '#231635',
    fontSize: 16,
    color: '#FFFFFF',
    link: 'https://vote.makerdao.com/',
    marginTop: '32px',
    marginBottom: '32px',
  },
  {
    title: 'Forum',
    logo: <Makerdao />,
    fontSize: 24,
    fontWeight: 400,
    color: '#1AAB9B',
    link: 'https://forum.makerdao.com/',
    marginBottom: '32px',
  },
  {
    title: 'MIPs Portalppp',
    logo: <Logo fill='#1AAB9B' />,
    background: '#1AAB9B;',
    fontSize: 16,
    fontWeight: 500,
    color: '#FFFFFF',
    link: 'https://mips.makerdao.com/',
    marginBottom: '32px',
  },
  {
    title: 'makerburn.com',
    logo: <Makerdao />,
    color: '#000000',
    fontSize: 18,
    fontWeight: 500,
    link: 'makerburn.com',
    marginBottom: '32px',
  }
];
