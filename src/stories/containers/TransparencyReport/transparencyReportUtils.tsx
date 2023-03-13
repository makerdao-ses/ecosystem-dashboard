import styled from '@emotion/styled';

import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { NumberCell } from '@ses/components/NumberCell/NumberCell';
import Information from '@ses/components/svg/information';
import ArrowPopoverTargetValueComponent from '@ses/containers/TransparencyReport/components/ArrowPopoverTargetValue/ArrowPopoverTargetValueComponent';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { formatAddressForOutput } from '../../../core/utils/string';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { TextCell } from '../../components/TextCell/TextCell';
import { WalletTableCell } from '../../components/WalletTableCell/WalletTableCell';
import type { BudgetStatementWalletDto } from '../../../core/models/dto/coreUnitDTO';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';

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

export const renderNumberWithIcon = (data: TargetBalanceTooltipInformation) => (
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
        <ContainerNumberCell value={data.balance} />
        <ContainerStyleMonths style={{}}>{`${data.targetBalanceFirstMonth
          .toFormat('LLL')
          .toLocaleUpperCase()} + ${data.targetBalanceSecondMonth
          .toFormat('LLL')
          .toLocaleUpperCase()}  Budget Cap`}</ContainerStyleMonths>
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
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'flex-start',
  },
});

const ContainerNumberCell = styled(NumberCell)({
  paddingBottom: 2,
  '@media (min-width: 834px)': {
    paddingBottom: 0,
  },
});

const ContainerStyleMonths = styled.div({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#546978',
  marginLeft: 16,
});
