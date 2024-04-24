import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { capitalizeSentence } from '../../../core/utils/string';
import CopyIcon from '../CopyIcon/CopyIcon';
import { CustomLink } from '../CustomLink/CustomLink';
import Identicon from '../Identicon/Identicon';
import Gnosis from '../svg/Gnosis';

interface WalletTableCellProps {
  imgUrl?: string;
  name: string;
  wallet: string;
  address?: string;
}

export const WalletTableCell = (props: WalletTableCellProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <BlockiesIdenticon address={props.address ?? ''} size={32} className="circle-avatar" />
      <Data>
        <Label isLight={isLight}>{capitalizeSentence(props.name)}</Label>
        <LinkContainer>
          <StyledLink
            className="custom-link"
            style={{
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
            }}
            href={`https://etherscan.io/address/${props.address}`}
            withArrow={false}
          >
            {props.wallet.toLowerCase()}
          </StyledLink>

          <IconsContainer>
            <CopyIcon text={props.address ?? ''} defaultTooltip="Copy Address" />

            <a href={`https://app.safe.global/home?safe=eth:${props.address}`} target="_blank">
              <Gnosis />
            </a>
          </IconsContainer>
        </LinkContainer>
      </Data>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: '77px',
  '@media (min-width: 835px)': {
    height: '72px',
  },
  '.circle-avatar': {
    margin: '0 16px',
    '@media (min-width: 834px) and (max-width: 1193px)': {
      margin: '0 16px 0 8px',
    },
  },
});

const BlockiesIdenticon = styled(Identicon)({
  [lightTheme.breakpoints.up('table_834')]: {
    // !important is needed to override the inline style
    marginTop: '-6px!important',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    // !important is needed to override the inline style
    marginTop: '3px!important',
  },
});

const Data = styled.div({
  height: '40px',
});

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '15px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const LinkContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginTop: 4,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: 3,
  },
});

const StyledLink = styled(CustomLink)({
  '&.custom-link': {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: 0,
    margin: 0,

    [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
      fontSize: 12,
      lineHeight: '15px',
    },

    [lightTheme.breakpoints.up('desktop_1194')]: {
      fontSize: 14,
      lineHeight: '17px',
      fontWeight: 400,
    },
  },
});

const IconsContainer = styled.div({
  display: 'flex',
  alignItems: 'center',

  '& > div': {
    cursor: 'pointer',
    marginLeft: 13,

    '> *': {
      display: 'flex',
    },

    [lightTheme.breakpoints.up('table_834')]: {
      marginLeft: 5,
    },

    [lightTheme.breakpoints.up('desktop_1194')]: {
      marginLeft: -1,
    },
  },

  a: {
    display: 'flex',
    marginLeft: 32,

    [lightTheme.breakpoints.up('table_834')]: {
      marginLeft: 16,
    },
  },
});
