import styled from '@emotion/styled';

import ArrowTooltipComponent from '@ses/components/ArrowToolTip/ArrowTootipComponent';

import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { NumberCell } from '@ses/components/NumberCell/NumberCell';
import Information from '@ses/components/svg/information';
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
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        sxProps={{
          '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
            overflowX: 'unset',
            overflowY: 'unset',
          },
          // marginLeft: -10,
        }}
        id="information"
        popupStyle={{
          padding: 10,
        }}
        title={
          <ArrowTooltipComponent
            align="left"
            description="2 Month Budget Cap"
            longCode="SES-01"
            mipNumber="MIP40c3-SP14:"
            name="Collateral Engineering Services"
          />
        }
        leaveOnChildrenMouseOut
      >
        <ContainerInfo>
          <Information />
        </ContainerInfo>
      </CustomPopover>

      <NumberCell value={number} />
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
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row-reverse',
    marginLeft: 0,
  },
});

const ContainerInfo = styled.div({
  paddingRight: 0,
  [lightTheme.breakpoints.up('table_834')]: {
    paddingRight: 30,
  },
});
