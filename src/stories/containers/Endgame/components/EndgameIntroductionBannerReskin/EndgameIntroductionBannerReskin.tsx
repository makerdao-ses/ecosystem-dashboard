import { styled, useMediaQuery } from '@mui/material';
import Container from '@ses/components/Container/Container';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import Image from 'next/image';
import React from 'react';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import type { Theme } from '@mui/material';

interface EndgameIntroductionBannerProps {
  isKeyChanges?: boolean;
}

const EndgameIntroductionBannerReskin: React.FC<EndgameIntroductionBannerProps> = ({ isKeyChanges = false }) => {
  const isUpDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));
  const [isEnabled] = useFlagsActive();

  const image = (
    <ImageWrapper>
      <Image
        src="/assets/img/endgame/maker_endgame.png"
        alt="Endgame"
        layout="fill"
        style={{
          objectFit: 'cover',
        }}
        placeholder="blur"
        blurDataURL="/assets/img/endgame/maker_endgame.png"
      />
    </ImageWrapper>
  );

  return (
    <EndgameContainer id="section-key-changes">
      {!isUpDesktop1024 && <ImageContainer>{image}</ImageContainer>}

      <ContentContainer>
        <InfoContainer isKeyChanges={isKeyChanges}>
          <Title>{isKeyChanges ? 'Key Changes' : 'Endgame has arrived'}</Title>
          <Paragraph>
            On <Date>17-Feb-2023</Date> Maker Governance approved the{' '}
            <ExternalLink href="https://vote.makerdao.com/polling/QmTmS5Nf#poll-detail">Endgame proposal</ExternalLink>.
            This kicks off the biggest restructuring of MakerDAO since the dissolution of the Maker Foundation in June
            2021.
          </Paragraph>
          {isKeyChanges && (
            <Paragraph>Below are some key changes that will take place as a result of the transition. </Paragraph>
          )}
          <LinkContainer>
            {!isKeyChanges && (
              <ButtonLink href={siteRoutes.endgame} buttonType={ButtonType.Primary} label="Learn More" />
            )}

            {isEnabled('FEATURE_ROADMAP_MILESTONES') && !isKeyChanges && (
              <ButtonLink
                // TODO: replace with correct link
                href={siteRoutes.roadmapMilestones('endgame-phase-1')}
                buttonType={ButtonType.Primary}
                label="Phase 1 Progress"
              />
            )}
            {isKeyChanges && (
              <InternalLinkContainer isKeyChanges={isKeyChanges}>
                <InternalLinkButtonStyled
                  href={siteRoutes.roadmapMilestones('endgame-phase-1')}
                  icon
                  label="Phase 1  Progress"
                />
              </InternalLinkContainer>
            )}
          </LinkContainer>
        </InfoContainer>
        {isUpDesktop1024 && <ImageContainer>{image}</ImageContainer>}
      </ContentContainer>
    </EndgameContainer>
  );
};

export default EndgameIntroductionBannerReskin;

const EndgameContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('desktop_1024')]: {
    background: theme.palette.isLight
      ? 'linear-gradient(90deg, rgba(243, 245, 247, 0) 0%, #F3F5F7 7.38%, #F3F5F7 93.62%, rgba(243, 245, 247, 0) 100%)'
      : 'linear-gradient(90deg, rgba(20, 23, 24, 0) 0%, #151822 20.28%, #151822 92.8%, rgba(20, 23, 24, 0) 100%)',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    background: theme.palette.isLight
      ? 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #F3F5F7 6.4%, #F3F5F7 94.57%, rgba(246, 248, 249, 0.00) 100%)'
      : 'linear-gradient(90deg, rgba(20, 23, 24, 0) 0%, #151822 20.28%, #151822 92.8%, rgba(20, 23, 24, 0) 100%)',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    background: theme.palette.isLight
      ? 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #F3F5F7 6.4%, #F3F5F7 94.57%, rgba(246, 248, 249, 0.00) 100%)'
      : 'linear-gradient(90deg, rgba(20, 23, 24, 0) 0%, #151822 50.28%, #151822 92.8%, rgba(20, 23, 24, 0) 100%)',
  },

  [theme.breakpoints.up('desktop_1920')]: {
    background: theme.palette.isLight
      ? 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, ##F3F5F7 19.97%, #F3F5F7 80.22%, rgba(246, 248, 249, 0.00) 100%)'
      : 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #10191F 19.97%, #10191F 80.22%, rgba(246, 248, 249, 0.00) 100%)',
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    maxWidth: 1200,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
}));

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 0,

  borderRadius: 12,
  overflow: 'hidden',
  [theme.breakpoints.up('desktop_1024')]: {
    width: '50%',
    right: 0,
    marginLeft: 'auto',
    borderRadius: 'revert',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: '48.8%',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: '50%',
  },
}));

const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',

  height: '100%',
  overflow: 'hidden',
  '& img': {
    objectFit: 'cover',
    objectPosition: 'center',
  },

  [theme.breakpoints.up('tablet_768')]: {
    '& img': {
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    '& img': {
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
}));

const InfoContainer = styled('div')<{ isKeyChanges: boolean }>(({ isKeyChanges, theme }) => ({
  position: 'relative',
  zIndex: 1,
  marginTop: isKeyChanges ? 0 : 145,
  padding: isKeyChanges ? '42px 24px' : '32px 16px',
  marginLeft: -16,
  marginRight: -16,
  textAlign: 'left',
  '&  > p:nth-of-type(2)': {
    marginTop: 0,
  },

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: isKeyChanges ? 104 : 133,
    marginLeft: -32,
    marginRight: 0,
    padding: isKeyChanges ? 32 : 48,
    maxWidth: 424,
    textAlign: 'left',
    background: isKeyChanges ? 'none' : 'transparent',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: isKeyChanges ? 0 : 133,
    padding: '34px 0px 40px 24px',
    '&  > p:nth-of-type(2)': {
      marginTop: 2,
    },
    maxWidth: 440,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    margin: 0,
    maxWidth: '50%',
    padding: isKeyChanges ? '34px 48px 34px 0' : '54px 48px 54px 0',
    '&  > p:nth-of-type(2)': {
      marginTop: 0,
    },
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingRight: 112,
  },
}));

const Title = styled('h2')(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: 0.4,
  lineHeight: '21.6px',
  color: theme.palette.colors.gray[50],
  marginTop: 0,
  marginBottom: 0,

  [theme.breakpoints.up('desktop_1024')]: {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',
    fontSize: 20,
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    color: theme.palette.isLight ? '#25273D' : '#D2D4EF',
    fontSize: 24,
    lineHeight: '28.8px',
  },
}));

const Paragraph = styled('p')<{ noMargin?: boolean }>(({ theme, noMargin = false }) => ({
  fontSize: 14,
  width: '100%',
  fontWeight: 400,
  lineHeight: '23.8px',
  color: theme.palette.colors.gray[50],
  marginBottom: 0,
  marginTop: noMargin ? 0 : 10,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',
    lineHeight: '27.2px',
    marginTop: noMargin ? 0 : 12,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    color: theme.palette.isLight ? '#25273D' : '#D2D4EF',
    marginTop: noMargin ? 0 : 15,
    fontSize: 20,
    lineHeight: '34px',
  },
}));

const Date = styled('span')(({ theme }) => ({
  fontWeight: 700,
  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 700,
  },
}));

const ExternalLink = styled(CustomLink)(({ theme }) => ({
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 400,
  letterSpacing: 'normal',
  marginLeft: 0,
  textWrap: 'initial',

  '& svg': {
    width: 10,
    height: 10,
    // override default component inline style
    marginLeft: '4px!important',
    marginRight: 4,
  },

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,

    '& svg': {
      // override default component inline style
      marginLeft: '4px!important',
      marginRight: 3,
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 0,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    paddingRight: 4,
  },
}));

const LinkContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 24,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 26,
  },
}));

const InternalLinkContainer = styled('div')<{ isKeyChanges: boolean }>(({ isKeyChanges, theme }) => ({
  marginTop: isKeyChanges ? 24 : 0,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 26,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: isKeyChanges ? 32 : 0,
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '4px 12px 4px 12px',
    gap: 12,
    background: theme.palette.colors.gray[900],

    '& div': {
      color: theme.palette.colors.slate[50],
      fontWeight: 600,
    },

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[300],
    },
    ':hover': {
      background: theme.palette.colors.gray[700],
      border: `1px solid ${theme.palette.colors.charcoal[500]}`,
      '& div': {
        color: theme.palette.colors.slate[50],
        fontWeight: 600,
      },
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[100],
      },
    },
  },
}));

const ButtonLink = styled(LinkButton)(({ theme }) => ({
  padding: '7px 7px',
  background: '#06554C',
  marginTop: 24,
  flex: 1,
  display: 'flex',
  justifyContent: 'center',

  // label
  '& > div': {
    fontSize: 16,
    lineHeight: 'normal',
    fontWeight: 500,
    color: '#6EDBD0',
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '13px 39px',
    marginTop: 32,
    flex: 'none',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    background: theme.palette.isLight ? '#E7FCFA' : '#06554C',

    '& > div': {
      color: theme.palette.isLight ? '#1AAB9B' : '#6EDBD0',
    },
  },
}));
