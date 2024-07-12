import { styled } from '@mui/material';
import Link from 'next/dist/client/link';
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
  className?: string;
}

export const WalletTableCell = (props: WalletTableCellProps) => (
  <Container className={props.className}>
    <BlockiesIdenticon address={props.address ?? ''} size={32} className="circle-avatar" />
    <Data>
      <Label>{capitalizeSentence(props.name)}</Label>
      <LinkContainer>
        <StyledLink showArrow={false} href={`https://etherscan.io/address/${props.address}`}>
          {props.wallet.toLowerCase()}
        </StyledLink>

        <IconsContainer>
          <CopyIconStyled text={props.address ?? ''} defaultTooltip="Copy Address" />

          <LinkStyled href={`https://app.safe.global/home?safe=eth:${props.address}`} target="_blank">
            <GnosisStyled />
          </LinkStyled>
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

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {},
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
  marginLeft: 24,
  gap: 24,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
    marginLeft: 2,
  },
}));

const GnosisStyled = styled(Gnosis)(({ theme }) => ({
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
  ':hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },
}));

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
});

const CopyIconStyled = styled(CopyIcon)(({ theme }) => ({
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
  ':hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },
}));
