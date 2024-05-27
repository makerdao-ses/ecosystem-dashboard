import DiscordIcon from 'public/assets/svg/discord.svg';
import GithubIcon from 'public/assets/svg/github.svg';
import MakerdaoIcon from 'public/assets/svg/makerdao.svg';
import ConnectIcon from 'public/assets/svg/makerdao_connect.svg';
import FusionIcon from 'public/assets/svg/makerdao_fusion.svg';
import SwitchboardIcon from 'public/assets/svg/makerdao_switchboard.svg';
import PowerhouseIcon from 'public/assets/svg/powerhouse.svg';
import RedditIcon from 'public/assets/svg/reddit.svg';
import TwitterIcon from 'public/assets/svg/twitter.svg';
import YoutubeIcon from 'public/assets/svg/youtube.svg';
import type { FooterContact, LinkCategory, TypeIconFooter } from './type';

const linkCategory: LinkCategory[] = [
  {
    name: 'Governance',
    links: [
      {
        label: 'Maker forum',
        link: 'https://forum.makerdao.com/',
      },
      {
        label: 'Voting portal',
        link: 'https://vote.makerdao.com/',
      },
      {
        label: 'MIPs portal',
        link: 'https://mips.makerdao.com/mips/lis',
      },
      {
        // eslint-disable-next-line spellcheck/spell-checker
        label: 'Makerburn vnext',
        link: 'https://makerburn.com/v2',
      },
    ],
  },
  {
    name: 'Documentation',
    links: [
      {
        label: 'Organization',
        link: 'https://www.powerhouse.inc/',
      },
      {
        label: 'Technical Docs',
        link: 'https://powerhouse-1.gitbook.io/powerhouse',
      },
      {
        label: 'Brand Assets',
        link: '#',
      },
      {
        label: 'Github Repos',
        link: 'https://github.com/powerhouse-inc',
      },
    ],
  },
  {
    name: 'MakerDao Tools',
    links: [
      {
        label: 'Connect',
        link: '#',
        Icon: FusionIcon,
      },
      {
        label: 'Switchboard',
        link: 'https://powerhouse-nginx-router-5dcc24a23f9e.herokuapp.com/makerdao/switchboard',
        Icon: SwitchboardIcon,
      },
      {
        label: 'Fusion',
        link: '#',
        Icon: ConnectIcon,
      },
    ],
  },
];

const iconsMakerDAO: TypeIconFooter[] = [
  {
    Icon: DiscordIcon,
    href: '#',
    title: 'discord',
  },
  {
    Icon: TwitterIcon,
    href: '#',
    title: 'twitter',
  },
  {
    Icon: RedditIcon,
    href: '#',
    title: 'reddit',
  },
  {
    Icon: YoutubeIcon,
    href: '#',
    title: 'youtube',
  },
  {
    Icon: GithubIcon,
    href: '#',
    title: 'github',
  },
];

const iconsPowerhouse: TypeIconFooter[] = [
  {
    Icon: DiscordIcon,
    href: '#',
    title: 'discord',
  },
  {
    Icon: TwitterIcon,
    href: '#',
    title: 'twitter',
  },
  {
    Icon: RedditIcon,
    href: '#',
    title: 'reddit',
  },
  {
    Icon: YoutubeIcon,
    href: '#',
    title: 'youtube',
  },
  {
    Icon: GithubIcon,
    href: '#',
    title: 'github',
  },
];

const contactMakerDAO: FooterContact = {
  title: 'Contact MakerDAO',
  subtitle: 'Official Community Channels',
  Icon: MakerdaoIcon,
  links: iconsMakerDAO,
};

const contactPowerhouse: FooterContact = {
  title: 'Contact Powerhouse',
  subtitle: 'Official Community Channels',
  Icon: PowerhouseIcon,
  links: iconsPowerhouse,
};

export { linkCategory, contactMakerDAO, contactPowerhouse };
