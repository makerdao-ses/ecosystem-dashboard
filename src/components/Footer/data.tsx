import { styled } from '@mui/material';
import DiscordIcon from 'public/assets/svg/discord.svg';
import GithubIcon from 'public/assets/svg/github.svg';
import MakerdaoIcon from 'public/assets/svg/makerdao.svg';
import ConnectIcon from 'public/assets/svg/makerdao_connect.svg';
import FusionIcon from 'public/assets/svg/makerdao_fusion.svg';
import SwitchboardIcon from 'public/assets/svg/makerdao_switchboard.svg';
import PowerhouseIcon from 'public/assets/svg/powerhouse.svg';
import RedditIcon from 'public/assets/svg/reddit.svg';
import X from 'public/assets/svg/x.svg';
import YoutubeIcon from 'public/assets/svg/youtube.svg';
import type { FooterContact, LinkCategory, TypeIconFooter } from './type';

const XStyled = styled(X)(({ theme }) => ({
  width: 22,
  height: 22,

  marginLeft: 6,

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 4,
    marginRight: 8,
  },
}));
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
        link: 'https://www.notion.so/makerdao-ses/ed7c926d094f46aa82647583077c8205?v=d4a8854753214b3fa4a2446fb2c72045',
      },
      {
        label: 'Github Repos',
        link: 'https://github.com/powerhouse-inc',
      },
    ],
  },
  {
    name: 'MakerDAO Tools',
    links: [
      {
        label: 'Connect',
        link: 'https://connect-test-env.vercel.app/',
        Icon: ConnectIcon,
      },
      {
        label: 'Switchboard',
        link: 'https://powerhouse-nginx-router-5dcc24a23f9e.herokuapp.com/makerdao/switchboard',
        Icon: SwitchboardIcon,
      },
      {
        label: 'Fusion',
        link: 'https://fusion.fog.money',
        Icon: FusionIcon,
      },
    ],
  },
];

const iconsMakerDAO: TypeIconFooter[] = [
  {
    Icon: DiscordIcon,
    href: 'https://discord.com/invite/SK9K9VHQBD',
    title: 'discord',
  },
  {
    Icon: XStyled,
    href: 'https://x.com/MakerDAO',
    title: 'twitter',
  },
  {
    Icon: RedditIcon,
    href: 'https://www.reddit.com/r/MakerDAO/',
    title: 'reddit',
  },
  {
    Icon: YoutubeIcon,
    href: 'https://www.youtube.com/MakerDAO',
    title: 'youtube',
  },
  {
    Icon: GithubIcon,
    href: 'https://github.com/makerdao',
    title: 'github',
  },
];

const iconsPowerhouse: TypeIconFooter[] = [
  {
    Icon: DiscordIcon,
    href: 'https://discord.com/invite/h7GKvqDyDP',
    title: 'discord',
  },
  {
    Icon: XStyled,
    href: 'https://x.com/PowerhouseDAO',
    title: 'twitter',
  },
  {
    Icon: GithubIcon,
    href: 'https://github.com/powerhouse-inc',
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
