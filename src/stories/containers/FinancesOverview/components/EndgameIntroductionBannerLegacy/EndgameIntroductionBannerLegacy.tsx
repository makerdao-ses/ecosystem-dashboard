import { styled, useMediaQuery } from '@mui/material';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import Image from 'next/image';
import React from 'react';
import Container from '@/components/Container/Container';
import type { Theme } from '@mui/material';

interface EndgameIntroductionBannerProps {
  isKeyChanges?: boolean;
}

const EndgameIntroductionBannerLegacy: React.FC<EndgameIntroductionBannerProps> = ({ isKeyChanges = false }) => {
  const isUpDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));

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
    <EndgameContainer>
      {!isUpDesktop1280 && <ImageContainer>{image}</ImageContainer>}

      <ContentContainer>
        <InfoContainer isKeyChanges={isKeyChanges}>
          <Title>{isKeyChanges ? 'Key Changes' : 'Endgame has arrived'}</Title>
          <Paragraph>
            On <Date>24-Oct-2022</Date> Maker Governance approved the{' '}
            <ExternalLink href="https://vote.makerdao.com/polling/QmTmS5Nf#poll-detail">Endgame proposal</ExternalLink>.
            This kicks off the biggest restructuring of MakerDAO since the dissolution of the Maker Foundation in June
            2021.
          </Paragraph>
          {isKeyChanges && (
            <Paragraph noMargin={true}>
              Below are some key changes that will take place as a result of the transition.{' '}
            </Paragraph>
          )}
          <LinkContainer>
            {!isKeyChanges && (
              <ButtonLink href={siteRoutes.endgame} buttonType={ButtonType.Primary} label="Learn More" />
            )}
          </LinkContainer>
        </InfoContainer>
        {isUpDesktop1280 && <ImageContainer>{image}</ImageContainer>}
      </ContentContainer>
    </EndgameContainer>
  );
};

export default EndgameIntroductionBannerLegacy;

const EndgameContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.isLight
    ? 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #F6F8F9 5.61%, #F6F8F9 93.65%, rgba(246, 248, 249, 0.00) 100%)'
    : 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #10191F 5.61%, #10191F 93.65%, rgba(246, 248, 249, 0.00) 100%)',
  overflow: 'hidden',

  [theme.breakpoints.up('desktop_1280')]: {
    background: theme.palette.isLight
      ? 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #F6F8F9 6.4%, #F6F8F9 94.57%, rgba(246, 248, 249, 0.00) 100%)'
      : 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #10191F 6.4%, #10191F 94.57%, rgba(246, 248, 249, 0.00) 100%)',
  },

  [theme.breakpoints.up('desktop_1920')]: {
    background: theme.palette.isLight
      ? 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #F6F8F9 19.97%, #F6F8F9 80.22%, rgba(246, 248, 249, 0.00) 100%)'
      : 'linear-gradient(90deg, rgba(246, 248, 249, 0.00) 0%, #10191F 19.97%, #10191F 80.22%, rgba(246, 248, 249, 0.00) 100%)',
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 0,
  boxShadow: theme.palette.isLight
    ? '-8.3px 0px 16.6px 0px rgba(190, 190, 190, 0.25), -16.6px 0px 33px 0px rgba(219, 227, 237, 0.40)'
    : '-10px 0px 20px 0px rgba(24, 9, 68, 0.25), -20px 0px 40px 0px rgba(9, 35, 68, 0.40)',

  [theme.breakpoints.up('desktop_1280')]: {
    width: '50%',
    right: 0,
    marginLeft: 'auto',
  },
}));

const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',

  [theme.breakpoints.up('desktop_1280')]: {
    right: 0,
  },
}));

const InfoContainer = styled('div')<{ isKeyChanges: boolean }>(({ theme, isKeyChanges }) => ({
  position: 'relative',
  zIndex: 1,
  marginTop: isKeyChanges ? 188 : 145,
  padding: isKeyChanges ? '40px 16px' : '32px 16px',
  marginLeft: -16,
  marginRight: -16,
  textAlign: 'center',
  background: 'linear-gradient(360deg, #10131F 0%, rgba(16, 25, 31, 0.00) 100%)',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: isKeyChanges ? 169 : 133,
    marginLeft: -32,
    marginRight: 0,
    padding: 48,
    maxWidth: 440,
    textAlign: 'left',
    background: 'transparent',

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(34deg, #10131F 0%, rgba(16, 25, 31, 0.00) 79.55%)',
      filter: 'blur(22px)',
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: isKeyChanges ? 120 : 133,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: '50%',
    margin: 0,
    padding: isKeyChanges ? '60px 48px 60px 0' : '54px 48px 54px 0',

    '&::before': {
      display: 'none',
    },
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingRight: 112,
  },
}));

const Title = styled('h2')(({ theme }) => ({
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: '#D2D4EF',
  marginTop: 0,
  marginBottom: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    color: theme.palette.isLight ? '#25273D' : '#D2D4EF',
    fontSize: 32,
    lineHeight: '38.7px',
  },
}));

const Paragraph = styled('p')<{ noMargin?: boolean }>(({ theme, noMargin = false }) => ({
  fontSize: 14,
  lineHeight: '22px',
  color: '#D2D4EF',
  marginBottom: 0,
  marginTop: noMargin ? 0 : 14,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    color: theme.palette.isLight ? '#25273D' : '#D2D4EF',
    marginTop: noMargin ? 0 : 15,
    fontSize: 20,
    lineHeight: '34px',
  },
}));

const Date = styled('span')(({ theme }) => ({
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
    width: 14,
    height: 14,
    // override default component inline style
    marginLeft: '8px!important',
    marginRight: -6,
  },

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,

    '& svg': {
      // override default component inline style
      marginLeft: '7px!important',
      marginRight: -3,
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
  },
}));

const LinkContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 24,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
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
