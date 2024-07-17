import { styled } from '@mui/material';
import Image from 'next/image';
import MobileDark from 'public/assets/img/empty-mobile-dark.png';
import Mobile from 'public/assets/img/empty_mobile.png';
import EmptyDark from 'public/assets/img/no-data-provide-dark.png';
import Empty from 'public/assets/img/no-data-provide.png';

import React from 'react';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import { useThemeContext } from '@/core/context/ThemeContext';
import { ResourceType } from '@/core/models/interfaces/types';
import { MAKER_BURN_LINK } from '@/core/utils/const';

interface Props {
  longCode: string;
  shortCode: string;
  resource?: ResourceType;
  isNotLoading?: boolean;
  // Only for the stories
  titleStory?: string;
}

const BudgetStatementsPlaceholder: React.FC<Props> = ({
  longCode,
  shortCode,
  resource,
  isNotLoading = true,
  titleStory = '',
}) => {
  const { isLight } = useThemeContext();

  let title: string;
  switch (resource) {
    case ResourceType.Delegates:
      title = 'No data reported by the Delegates Administrator';
      break;
    case ResourceType.EcosystemActor:
      title = `No data reported by ${shortCode} Ecosystem Actor`;
      break;
    default:
      // handle as a core unit
      title = `No data reported by ${shortCode} Core Unit`;
  }
  return (
    <Container>
      <ImageWrapperMobile>
        <Image src={isLight ? Mobile : MobileDark} alt="There are no elements" layout="fill" />
      </ImageWrapperMobile>
      <ImageWrapper>
        <Image src={isLight ? Empty : EmptyDark} alt="There are no elements" layout="fill" />
      </ImageWrapper>
      {isNotLoading && (
        <ContainerDescription>
          <Title>{titleStory || title}</Title>
          <Description>View On-Chain Transfers on makerburn.com</Description>

          <ContainerButton>
            <ExternalLinkButtonStyled
              href={
                resource === ResourceType.Delegates
                  ? 'https://makerburn.com/#/expenses/core-units/DELEGATES'
                  : `${MAKER_BURN_LINK}/${longCode}`
              }
            >
              Go To Makerburn
            </ExternalLinkButtonStyled>
          </ContainerButton>
        </ContainerDescription>
      )}
    </Container>
  );
};
export default BudgetStatementsPlaceholder;
const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative',
  width: '100%',
  height: '100%',
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  lineHeight: '28.8px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  [theme.breakpoints.up('tablet_768')]: {
    lineHeight: '28.8px',
    fontSize: 24,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 32,
    lineHeight: '38.4px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 40,
    lineHeight: '48px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '21.6px',
    fontWeight: 700,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
    lineHeight: '28.8px',
  },
}));

const ImageWrapper = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
    position: 'relative',
    minWidth: '100%',
    width: '704px',
    height: '328px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: '960px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: '1184px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: '1312',
  },
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  position: 'absolute',
  margin: '0 auto',
  top: '12%',
  marginLeft: 4,
  marginTop: 1,
  maxWidth: '279px',
  padding: '16px 8px',

  backgroundColor: theme.palette.isLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 42, 52, 0.2)',
  [theme.breakpoints.up('tablet_768')]: {
    backgroundColor: theme.palette.isLight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(37, 42, 52, 0.5)',
    maxWidth: '512px',
    top: '11%',
    padding: '40px 16px 32px',
    marginLeft: 0,
    marginTop: 2,
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: '671px',
    gap: 24,
    marginTop: 4,
    padding: '32px 16px 24px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: '831px',

    marginTop: -1,
    marginLeft: 0,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: '832px',

    marginTop: -1,
    marginLeft: -6,
  },
}));

const ContainerButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const ExternalLinkButtonStyled = styled(ExternalLinkButton)({
  padding: '4px 16px 4px 22px',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: -0.02,

  '& div': {
    width: 20,
    height: 20,
  },
});

const ImageWrapperMobile = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '343px',
  minWidth: '100%',
  height: '300px',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
