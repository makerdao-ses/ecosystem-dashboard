import Forum from '@/components/icons/Forum';
import Github from '@/components/icons/Github';
import Youtube from '@/components/icons/Youtube';
import DiscordFooter from '../svg/discord-footer';
import DiscordSupport from '../svg/discord-support-footer';
import LinkedIn from '../svg/linkedin';
import Reddit from '../svg/reddit';

import Twitter from '../svg/twitter';
import TwitterFooter from '../svg/twitter-footer';
import WWW from '../svg/www';
import type { TypeIconFooter } from './FooterLinks';

export const iconsContact = [
  {
    icon: <DiscordFooter fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://discord.com/invite/RBRumCpEDH',
    title: 'Discord',
    spacingsRight: 27,
    width: 21,
    height: 16,
    fill: '#e53935',
  },
  {
    icon: <TwitterFooter fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://twitter.com/MakerDAO',
    title: 'Twitter',
    width: 20,
    height: 16.15,
    spacingsRight: 28,
  },
  {
    icon: <Reddit fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://www.reddit.com/r/MakerDAO/',
    title: 'Reddit',
    spacingsRight: 28,
    width: 20,
    height: 20,
  },
  {
    icon: <Youtube fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://www.youtube.com/MakerDAO',
    title: 'Youtube',
    spacingsRight: 27.55,
    width: 20,
    height: 14,
  },
  {
    icon: <Github fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://github.com/makerdao',
    title: 'Github',
    width: 20.15,
    height: 19.66,
    spacingsRight: 6.2,
  },
] as TypeIconFooter[];

export const iconsSupport = [
  {
    icon: <WWW fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://ses.makerdao.network/',
    title: 'Website',
    spacingsRight: 28.14,
    width: 19.73,
    height: 20,
  },
  {
    icon: <Forum fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://forum.makerdao.com/c/core-units/sustainable-ecosystem-scaling/42',
    title: 'Forum',
    spacingsRight: 29,
    width: 20,
    height: 20,
  },
  {
    icon: <DiscordSupport fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://discord.com/invite/h7GKvqDyDP',
    title: 'Discord',
    spacingsRight: 29.5,
    width: 17.5,
    height: 20,
  },
  {
    icon: <Twitter fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://twitter.com/MakerDAO_SES',
    title: 'Twitter',
    spacingsRight: 28,
    width: 20,
    height: 20,
  },
  {
    icon: <Youtube fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about',
    title: 'Youtube',
    spacingsRight: 29,
    width: 20,
    height: 14,
  },
  {
    icon: <LinkedIn fill="#231536" fillDark="#D1DEE6" />,
    href: 'https://www.linkedin.com/company/makerdao-ses/',
    title: 'LinkedIn',
    width: 19,
    height: 19,
  },
] as TypeIconFooter[];

export const governesses = [
  {
    title: 'Forum',
    url: 'https://forum.makerdao.com/',
  },
  {
    title: 'Operation Manual',
    url: 'https://manual.makerdao.com/',
  },
  {
    title: 'Governance FAQs',
    url: 'https://makerdao.world/en/learn/governance/',
  },
  {
    title: 'Gov Tracking Sheet',
    url: 'https://docs.google.com/spreadsheets/d/1LWNlv6hr8oXebk8rvXZBPRVDjN-3OrzI0IgLwBVk0vM/edit#gid=0',
  },
  {
    title: 'Monthly Gov Cycle',
    url: 'https://manual.makerdao.com/governance/governance-cycle/monthly-governance-cycle',
  },
  {
    title: 'Weekly Gov Cycle',
    url: 'https://manual.makerdao.com/governance/governance-cycle/weekly-governance-cycle',
  },
];

export const products = [
  {
    title: 'Service Status',
    url: 'https://makerdao.statuspage.io/',
  },
  {
    title: 'Auctions Dashboard',
    url: 'https://unified-auctions.makerdao.com/',
  },
  {
    title: 'Migrate Dashboard',
    url: 'https://migrate.makerdao.com/',
  },
  {
    title: 'MakerBurn',
    url: 'https://makerburn.com/#/',
  },
  {
    title: 'DAI Stats',
    url: 'https://daistats.com/',
  },
  {
    title: 'Cookies Policy',
    url: '/cookies-policy',
    isNotLink: true,
  },
];

export const developer = [
  {
    title: 'Whitepaper',
    url: 'https://makerdao.com/en/whitepaper/',
  },
  {
    title: 'Technical Docs',
    url: 'https://docs.makerdao.com/',
  },
  {
    title: 'Developer Guides',
    url: 'https://github.com/makerdao/developerguides',
  },
  {
    title: 'Brand Assets',
    url: 'https://www.notion.so/makerdao/Maker-Brand-ac517c82ff9a43089d0db5bb2ee045a4',
  },
  {
    title: 'API Sandbox',
    url: 'https://studio.apollographql.com/public/Performance-Dashboard-Prd/',
  },
  {
    title: 'Github Repos',
    url: 'https://github.com/makerdao-ses',
  },
];
