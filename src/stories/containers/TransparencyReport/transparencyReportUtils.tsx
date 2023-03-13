import styled from '@emotion/styled';

import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import Information from '@ses/components/svg/information';
import ArrowPopoverTargetValueComponent from '@ses/containers/TransparencyReport/components/ArrowPopoverTargetValue/ArrowPopoverTargetValueComponent';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { formatAddressForOutput } from '../../../core/utils/string';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { TextCell } from '../../components/TextCell/TextCell';
import { WalletTableCell } from '../../components/WalletTableCell/WalletTableCell';
import type { BudgetStatementWalletDto } from '../../../core/models/dto/coreUnitDTO';

export const renderWallet = (wallet: BudgetStatementWalletDto) => (
  <WalletTableCell
    key={wallet.address}
    name={wallet.name}
    wallet={formatAddressForOutput(wallet.address)}
    address={wallet.address}
  />
);

export const renderLinks = (address: string) => (
  <TextCell key={6} responsivePadding="0">
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://etherscan.io/address/${address}`}
      style={{ marginRight: '16px' }}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Etherscan
    </CustomLink>
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://gnosis-safe.io/app/eth:${address}`}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Gnosis
    </CustomLink>
  </TextCell>
);

export const renderLinksWithToken = (address: string) => (
  <TextCell key={6} responsivePadding="0">
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://etherscan.io/address/${address}#tokentxns`}
      style={{ marginRight: '16px' }}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Etherscan
    </CustomLink>
  </TextCell>
);

export const renderNumberWithIcon = (number: number) => (
  <PopoverContainer>
    <Container>
      <CustomPopover
        widthArrow
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        sxProps={{
          '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
            overflowX: 'unset',
            overflowY: 'unset',
          },
          marginLeft: -4.5,
          marginTop: 0.6,
        }}
        id="information"
        popupStyle={{
          padding: 10,
        }}
        title={
          <ArrowPopoverTargetValueComponent
            link="#"
            description="2 Month Budget Cap"
            longCode="SES-001"
            mipNumber="MIP40c3-SP14:"
            name="Collateral Engineering Services"
          />
        }
        leaveOnChildrenMouseOut
      >
        <ContainerInfoIcon>
          <Information />
        </ContainerInfoIcon>
      </CustomPopover>
      <ContainerInformation>
        <ContainerNumber>{number}</ContainerNumber>
        <ContainerMonth>FEB + MAR Budget Cap</ContainerMonth>
      </ContainerInformation>
    </Container>
  </PopoverContainer>
);

const PopoverContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
});
const Container = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: 8.5,
  marginTop: -8,
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row-reverse',
    marginLeft: 0,
    marginTop: 0,
  },
});

const ContainerInfoIcon = styled.div({
  paddingRight: 0,
  marginTop: -10,
  [lightTheme.breakpoints.up('table_834')]: {
    height: 32,
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,
  },
});

const ContainerInformation = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'flex-start',
  },
});

const ContainerNumber = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontFeatureSettings: " 'tnum' on, 'lnum' on",
  color: '#231536',
  marginBottom: 2,
  marginTop: 2,
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 0,
    marginTop: 0,
  },
});

const ContainerMonth = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#546978',
});
