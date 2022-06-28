import ChatFooter from '../svg/chat-footer';
import Discord from '../svg/discord';
import Forum from '../svg/forum';
import Github from '../svg/github';
import LinkedIn from '../svg/linkedin';
import Reddit from '../svg/reddit';
import Telegram from '../svg/telegram';
import Twitter from '../svg/twitter';
import WWW from '../svg/www';
import Youtube from '../svg/youtube';
import { TypeIconFooter } from './footer-link';

export const iconsContact = [{
  icon: <Discord fill='#333333' />,
  href: 'https://discord.com/invite/RBRumCpEDH',
  title: 'Discord',
  spacingsRight: 24,
  width: 21,
  height: 16

},
{
  icon: <Twitter fill='#333333' />,
  href: 'https://twitter.com/MakerDAO',
  title: 'Twitter',
  spacingsRight: 24,
  width: 19,
  height: 16
},
{
  icon: <Reddit />,
  href: 'https://www.reddit.com/r/MakerDAO/',
  title: 'Reddit',
  spacingsRight: 24,
  width: 20,
  height: 20
},
{
  icon: <Telegram />,
  href: '#',
  title: 'Telegram',
  spacingsRight: 24,
  width: 19.55,
  height: 17
},

{
  icon: <ChatFooter />,
  href: '#',
  title: 'Chat',
  spacingsRight: 24,
  width: 20,
  height: 16.15,
},
{
  icon: <Youtube fill='#333333' />,
  href: 'https://www.youtube.com/MakerDAO',
  title: 'Youtube',
  spacingsRight: 24,
  width: 23.11,
  height: 16
},
{
  icon: <Github />,
  href: 'https://github.com/makerdao',
  title: 'Github',
  width: 22,
  height: 21
},
] as TypeIconFooter[];

export const iconsSupport = [{
  icon: <WWW fill='#333333' />,
  href: '#',
  title: 'Website',
  spacingsRight: 28.14,
  width: 19.73,
  height: 20

},
{
  icon: <Forum fill='#333333' />,
  href: 'https://forum.makerdao.com/',
  title: 'Forum',
  spacingsRight: 29,
  width: 19.73,
  height: 20
},
{
  icon: <Discord fill='#333333' />,
  href: 'https://discord.com/invite/RBRumCpEDH',
  title: 'Discord',
  spacingsRight: 29.5,
  width: 17.5,
  height: 20
},
{
  icon: <Twitter fill='#333333' />,
  href: 'https://twitter.com/MakerDAO',
  title: 'Twitter',
  spacingsRight: 28,
  width: 20,
  height: 20
},
{
  icon: <Youtube fill='#333333' />,
  href: 'https://www.youtube.com/MakerDAO',
  title: 'Youtube',
  spacingsRight: 29,
  width: 20,
  height: 14
},
{
  icon: <LinkedIn fill='#333333' />,
  href: 'https://www.linkedin.com/company/makerdao-ses/',
  title: 'LinkedIn',
  spacingsRight: 22,
  width: 19,
  height: 19
},
] as TypeIconFooter[];

export const governesses = ['Forum', 'Operational Manual', ' Governance FAQs', 'Gov Tracking Sheet', ' Monthly Gov Cycle', ' Weekly Gov Cycle'];
export const products = ['Service Status', 'Oasis', ' Auctions Dashboard', ' Migrate Dashboard', ' MakerBurn', 'DAI Stats'];
export const developer = ['Whitepaper', 'Technical Docs', 'API docs', 'Developer Guides', 'Brand Assets', ' Oracle Feeds'];
