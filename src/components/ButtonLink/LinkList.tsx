import { styled } from '@mui/material';
import Discord from 'public/assets/svg/discord.svg';
import Forum from 'public/assets/svg/forum.svg';
import Github from 'public/assets/svg/github.svg';
import GlobeWWW from 'public/assets/svg/globe_www.svg';
import LinkedIn from 'public/assets/svg/linkedin.svg';
import X from 'public/assets/svg/x.svg';
import Youtube from 'public/assets/svg/youtube.svg';
import React, { useMemo } from 'react';
import Card from '@/components/Card/Card';
import type { SocialMediaChannels } from '@/core/models/interfaces/socialMedia';
import ItemLinkList from './ItemLinkList';

interface Props {
  socialMedia: SocialMediaChannels;
  className?: string;
}

const LinkList: React.FC<Props> = ({ className, socialMedia }) => {
  const links = useMemo(() => {
    if (!socialMedia) {
      return []; // no social media links
    }

    const socialLinks = [];
    if (socialMedia.website) {
      socialLinks.push({
        icon: <GlobeWWW />,
        title: 'Website',
        href: socialMedia.website,
      });
    }
    if (socialMedia.forumTag) {
      socialLinks.push({
        icon: <Forum />,
        title: 'Forum',
        href: socialMedia.forumTag,
      });
    }
    if (socialMedia.discord) {
      socialLinks.push({
        icon: <Discord />,
        title: 'Discord',
        href: socialMedia.discord,
      });
    }
    if (socialMedia.twitter) {
      socialLinks.push({
        icon: <X />,
        title: 'Twitter X',
        href: socialMedia.twitter,
      });
    }
    if (socialMedia.github) {
      socialLinks.push({
        icon: <Github />,
        title: 'Github',
        href: socialMedia.github,
      });
    }
    if (socialMedia.linkedIn) {
      socialLinks.push({
        icon: <LinkedIn />,
        title: 'Linkedin',
        href: socialMedia.linkedIn,
      });
    }
    if (socialMedia.youtube) {
      socialLinks.push({
        icon: <Youtube />,
        title: 'Youtube',
        href: socialMedia.youtube,
      });
    }

    return socialLinks;
  }, [socialMedia]);

  return (
    <Container className={className}>
      {links.map((link) => (
        <ItemLinkList icon={link.icon} title={link.title} href={link.href} onClick={() => null} />
      ))}
    </Container>
  );
};

export default LinkList;

const Container = styled(Card)(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.3)',
  boxShadow: `${theme.fusionShadows.innerShadow}!important`,
  padding: 16,
  gap: 8,
  width: 200,

  [theme.breakpoints.up('tablet_768')]: {
    background: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[800],
  },
}));
