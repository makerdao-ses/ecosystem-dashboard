import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import lightTheme from '@ses/styles/theme/light';
import Image from 'next/image';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface EndgameIntroductionBannerProps {
  isKeyChanges?: boolean;
}

const EndgameIntroductionBanner: React.FC<EndgameIntroductionBannerProps> = ({ isKeyChanges = false }) => {
  const { isLight } = useThemeContext();

  return (
    <EndgameContainer isLight={isLight}>
      <ImageContainer isLight={isLight}>
        <ImageWrapper>
          <Image
            src="/assets/img/maker_endgame.png"
            alt="Endgame"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/assets/img/maker_endgame.png"
          />
        </ImageWrapper>
      </ImageContainer>
      <Container>
        <InfoContainer>
          <Title isLight={isLight}>{isKeyChanges ? 'Key Changes' : 'Endgame has arrived'}</Title>
          <Paragraph isLight={isLight}>
            On <Date>17-Feb-2023</Date> Maker Governance approved the{' '}
            <ExternalLink href="https://vote.makerdao.com/polling/QmTmS5Nf">Endgame proposal</ExternalLink>. This kicks
            off the biggest restructuring of MakerDAO since the dissolution of the Maker Foundation in June 2021.
          </Paragraph>
          {isKeyChanges ? (
            <Paragraph isLight={isLight} noMargin={true}>
              Below are some key changes that will take place as a result of the transition.{' '}
            </Paragraph>
          ) : (
            <LearMore isLight={isLight} href="#" buttonType={ButtonType.Primary} label="Learn More" />
          )}
        </InfoContainer>
      </Container>
    </EndgameContainer>
  );
};

export default EndgameIntroductionBanner;

const EndgameContainer = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  background: isLight ? '#F6F8F9' : '#10191F',
  overflow: 'hidden',
}));

const ImageContainer = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 0,
  boxShadow: isLight
    ? '-8.3px 0px 16.6px 0px rgba(190, 190, 190, 0.25), -16.6px 0px 33px 0px rgba(219, 227, 237, 0.40)'
    : '-10px 0px 20px 0px rgba(24, 9, 68, 0.25), -20px 0px 40px 0px rgba(9, 35, 68, 0.40)',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: '50%',
    right: 0,
    marginLeft: 'auto',
  },
}));

const ImageWrapper = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const InfoContainer = styled.div({
  position: 'relative',
  zIndex: 1,
  marginTop: 145,
  padding: '32px 16px',
  marginLeft: -16,
  marginRight: -16,
  textAlign: 'center',
  background: 'linear-gradient(360deg, #10131F 0%, rgba(16, 25, 31, 0.00) 100%)',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 133,
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

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: '50%',
    margin: 0,
    padding: '62px 64px 62px 0',

    '&::before': {
      display: 'none',
    },
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '54px 48px 54px 0',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingRight: 112,
  },

  [lightTheme.breakpoints.up('desktop_1920')]: {
    padding: '117px 112px 117px 0',
  },
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: 0.4,
  color: '#D2D4EF',
  marginTop: 0,
  marginBottom: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    color: isLight ? '#25273D' : '#D2D4EF',
    lineHeight: '29.05px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 32,
    lineHeight: '38.7px',
  },
}));

const Paragraph = styled.p<WithIsLight & { noMargin?: boolean }>(({ isLight, noMargin = false }) => ({
  fontSize: 14,
  lineHeight: '22px',
  color: '#D2D4EF',
  marginBottom: 0,
  marginTop: noMargin ? 0 : 14,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    color: isLight ? '#25273D' : '#D2D4EF',
    marginTop: noMargin ? 0 : 15,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    lineHeight: '34px',
  },
}));

const Date = styled.span({
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 700,
  },
});

const ExternalLink = styled(CustomLink)({
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

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,

    '& svg': {
      // override default component inline style
      marginLeft: '7px!important',
      marginRight: -3,
    },
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
  },
});

const LearMore = styled(LinkButton)<WithIsLight>(({ isLight }) => ({
  padding: '7px 39px',
  background: '#06554C',
  marginTop: 24,

  // label
  '& > div': {
    fontSize: 16,
    lineHeight: 'normal',
    fontWeight: 500,
    color: '#6EDBD0',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '13px 39px',
    marginTop: 32,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    background: isLight ? '#E7FCFA' : '#06554C',

    '& > div': {
      color: isLight ? '#1AAB9B' : '#6EDBD0',
    },
  },
}));
