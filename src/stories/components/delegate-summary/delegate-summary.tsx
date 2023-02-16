/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LinkTypeEnum } from '@ses/core/enums/link-type.enum';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { CustomLink } from '../custom-link/custom-link';

interface Props {
  code?: string;
}

const DelegateSummary: React.FC<Props> = ({ code = 'del' }) => {
  const isUp1440 = useMediaQuery(lightTheme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const links = [
    {
      linkType: LinkTypeEnum.WWW,
      href: 'sm.website',
    },
    {
      linkType: LinkTypeEnum.Forum,
      href: 'sm.website',
    },
    {
      linkType: LinkTypeEnum.Discord,
      href: 'sm.website',
    },
    {
      linkType: LinkTypeEnum.Youtube,
      href: 'sm.website',
    },
  ];

  return (
    <Container>
      <ContainerRow>
        <CircleContainer>
          <CircleAvatar
            style={{
              filter: 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25));',
            }}
            width={isUp1440 ? '68px' : '32px'}
            height={isUp1440 ? '68px' : '32px'}
            name=""
            image="https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png"
          />
        </CircleContainer>
        <ContainerDescription>
          <ContainerMoment>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Code>{code.toUpperCase()}</Code>
              <Text>Recognized Delegates</Text>
            </div>
            <ContainerLink>
              <CustomLink
                children="Onchain transactions"
                fontSize={11}
                fontWeight={400}
                href="#"
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
          </ContainerMoment>

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
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
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
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
const CircleContainer = styled.div({
  marginRight: 8,
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    marginRight: 16,
  },
});
const Code = styled.div({
  marginRight: 4,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: ' 16px',
  lineHeight: '19px',
  color: '#9FAFB9',
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
});

const Text = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#231536',
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
});

const ContainerLink = styled.div({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: 4,
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    marginBottom: 0,
    alignItems: 'center',
  },
});

const ContainerLinks = styled.div({
  display: 'flex',
});

const ContainerMoment = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    display: 'flex',
    flexDirection: 'row',
  },
});
