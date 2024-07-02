import { styled } from '@mui/material';
import React from 'react';
import { capitalizeSentence } from '../../core/utils/string';
import ExternalLink from '../../stories/components/ExternalLink/ExternalLink';
import Identicon from '../../stories/components/Identicon/Identicon';
import Gnosis from '../../stories/components/svg/Gnosis';
import CopyIcon from '../CopyIcon/CopyIcon';

interface WalletTableCellProps {
  imgUrl?: string;
  name: string;
  wallet: string;
  address?: string;
}

export const WalletTableCell = (props: WalletTableCellProps) => (
  <Container>
    <BlockiesIdenticon address={props.address ?? ''} size={32} className="circle-avatar" />
    <Data>
      <Label>{capitalizeSentence(props.name)}</Label>
      <LinkContainer>
        <StyledLink showArrow={false} className="custom-link" href={`https://etherscan.io/address/${props.address}`}>
          {props.wallet.toLowerCase()}
        </StyledLink>

        <IconsContainer>
          <CopyIcon text={props.address ?? ''} defaultTooltip="Copy Address" />

          <a href={`https://app.safe.global/home?safe=eth:${props.address}`} target="_blank">
            <GnosisStyled />
          </a>
        </IconsContainer>
      </LinkContainer>
    </Data>
  </Container>
);

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '77px',
  [theme.breakpoints.up('tablet_768')]: {
    height: '72px',
  },

  '.circle-avatar': {
    margin: '0 16px',
    [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
      margin: '0 16px 0 8px',
    },
  },
}));

const BlockiesIdenticon = styled(Identicon)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    // !important is needed to override the inline style
    marginTop: '-6px!important',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    // !important is needed to override the inline style
    marginTop: '3px!important',
  },
}));

const Data = styled('div')({
  height: '40px',
});

const Label = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 12,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const LinkContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 4,

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginTop: 3,
  },
}));

const StyledLink = styled(ExternalLink)(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.colors.blue[700],
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 600,
  },
}));

const IconsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '& > div': {
    cursor: 'pointer',
    marginLeft: 13,

    '> *': {
      display: 'flex',
    },

    [theme.breakpoints.up('tablet_768')]: {
      marginLeft: 5,
    },

    [theme.breakpoints.up('desktop_1024')]: {
      marginLeft: -1,
    },
  },

  a: {
    display: 'flex',
    marginLeft: 32,

    [theme.breakpoints.up('tablet_768')]: {
      marginLeft: 16,
    },
  },
}));

const GnosisStyled = styled(Gnosis)(({ theme }) => ({
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
}));
