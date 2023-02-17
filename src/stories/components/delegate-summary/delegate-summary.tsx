import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { CustomLink } from '../custom-link/custom-link';
import type { LinkModel } from '../cu-table-column-links/cu-table-column-links';

interface Props {
  code?: string;
  links: LinkModel[];
}

const DelegateSummary: React.FC<Props> = ({ code = 'del', links }) => {
  const { isLight } = useThemeContext();
  const isUp1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));
  return (
    <Container>
      <ContainerRow>
        <CircleContainer>
          <CircleAvatar
            style={{
              filter: isLight
                ? 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))'
                : 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25));',
            }}
            width={isUp1280 ? '68px' : '32px'}
            height={isUp1280 ? '68px' : '32px'}
            name="mk-logo"
            image="/assets/img/mk-logo.png"
          />
        </CircleContainer>
        <ContainerDescription>
          <ContainerColumnMobile>
            <ContainerText>
              <Code isLight={isLight}>{code.toUpperCase()}</Code>
              <Text isLight={isLight}>Recognized Delegates</Text>
            </ContainerText>
            <ContainerLink>
              <CustomLink
                children="Onchain transactions"
                fontSize={11}
                fontWeight={400}
                href="https://makerburn.com/#/expenses/core-units/DELEGATES"
                style={{
                  fontFamily: 'Inter, sans serif',
                  color: '#447AFB',
                  fontStyle: 'normal',
                  marginLeft: '0px',
                  letterSpacing: '0px',
                  height: '13px',
                }}
                marginLeft="5px"
                withArrow
                iconHeight={6}
                iconWidth={6}
              />
            </ContainerLink>
          </ContainerColumnMobile>

          <ContainerLinks>
            <CuTableColumnLinks links={links} align="flex-start" />
          </ContainerLinks>
        </ContainerDescription>
      </ContainerRow>
    </Container>
  );
};

export default DelegateSummary;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const ContainerRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});
const ContainerDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
const CircleContainer = styled.div({
  marginRight: 8,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginRight: 16,
  },
});
const Code = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  marginRight: 4,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: ' 16px',
  lineHeight: '19px',
  color: isLight ? '#9FAFB9' : '#546978',
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
}));

const Text = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#E2D8EE',
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
}));

const ContainerLink = styled.div({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: 4,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginBottom: 0,
    marginTop: 0,
    alignItems: 'center',
  },
});

const ContainerLinks = styled.div({
  display: 'flex',
  marginLeft: -6,
  [lightTheme.breakpoints.up('desktop_1440')]: {
    ' & > div:first-of-type': {
      marginRight: '26px',
      marginTop: '-6px',
    },
    '* + *': {
      marginRight: '26px',
      marginTop: '1px',
    },
    ' & > div:last-child': {
      marginRight: '6px',
    },
  },
});

const ContainerColumnMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const ContainerText = styled.div({
  display: 'flex',
  flexDirection: 'row',
});
