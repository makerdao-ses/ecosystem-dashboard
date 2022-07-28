import ChatFooter from '../svg/chat-footer';
import DiscordFooter from '../svg/discord-footer';
import DiscordSupport from '../svg/discord-support-footer';
import Forum from '../svg/forum';
import Github from '../svg/github';
import LinkedIn from '../svg/linkedin';
import Reddit from '../svg/reddit';
import Telegram from '../svg/telegram';
import Twitter from '../svg/twitter';
import TwitterFooter from '../svg/twitter-footer';
import WWW from '../svg/www';
import Youtube from '../svg/youtube';
import { TypeIconFooter } from './footer-link';

export const iconsContact = [{
  icon: <DiscordFooter />,
  href: 'https://discord.com/invite/RBRumCpEDH',
  title: 'Discord',
  spacingsRight: 27,
  width: 21,
  height: 16

},
{
  icon: <TwitterFooter />,
  href: 'https://twitter.com/MakerDAO',
  title: 'Twitter',
  width: 20,
  height: 16.15,
  spacingsRight: 28,
},
{
  icon: <Reddit />,
  href: 'https://www.reddit.com/r/MakerDAO/',
  title: 'Reddit',
  spacingsRight: 28,
  width: 20,
  height: 20
},
{
  icon: <Youtube fill='#211634' />,
  href: 'https://www.youtube.com/MakerDAO',
  title: 'Youtube',
  spacingsRight: 27.55,
  width: 20,
  height: 14
},
{
  icon: <Github />,
  href: 'https://github.com/makerdao',
  title: 'Github',
  width: 20.15,
  height: 19.66,
  spacingsRight: 6.2
},
] as TypeIconFooter[];

export const iconsSupport = [{
  icon: <WWW fill='#211634' />,
  href: '#',
  title: 'Website',
  spacingsRight: 28.14,
  width: 19.73,
  height: 20

},
{
  icon: <Forum fill='#211634' />,
  href: 'https://forum.makerdao.com/',
  title: 'Forum',
  spacingsRight: 29,
  width: 20,
  height: 20
},
{
  icon: <DiscordSupport fill='#211634' />,
  href: 'https://discord.com/invite/RBRumCpEDH',
  title: 'Discord',
  spacingsRight: 29.5,
  width: 17.5,
  height: 20
},
{
  icon: <Twitter fill='#211634' />,
  href: 'https://twitter.com/MakerDAO',
  title: 'Twitter',
  spacingsRight: 28,
  width: 20,
  height: 20
},
{
  icon: <Youtube fill='#211634' />,
  href: 'https://www.youtube.com/MakerDAO',
  title: 'Youtube',
  spacingsRight: 29,
  width: 20,
  height: 14
},
{
  icon: <LinkedIn fill='#211634' />,
  href: 'https://www.linkedin.com/company/makerdao-ses/',
  title: 'LinkedIn',
  width: 19,
  height: 19
},
] as TypeIconFooter[];

export const governesses = ['Forum', 'Operation Manual', 'Governance FAQs', 'Gov Tracking Sheet', 'Monthly Gov Cycle', 'Weekly Gov Cycle'];
export const products = ['Service Status', 'Auctions Dashboard', ' Migrate Dashboard', ' MakerBurn', 'DAI Stats', 'Terms'];
export const developer = ['Whitepaper', 'Technical Docs', 'API docs', 'Developer Guides', 'Brand Assets', ' Oracle Feeds'];
