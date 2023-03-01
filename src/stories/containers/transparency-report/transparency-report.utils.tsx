import styled from '@emotion/styled';
import React from 'react';
import { formatAddressForOutput } from '../../../core/utils/string.utils';
import { CustomLink } from '../../components/custom-link/custom-link';
import { TextCell } from '../../components/text-cell/text-cell';
import { WalletTableCell } from '../../components/wallet-table-cell/wallet-table-cell';
import type { BudgetStatementWalletDto } from '../../../core/models/dto/core-unit.dto';

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
    <StyledCustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://etherscan.io/address/${address}#tokentxns`}
      style={{ marginRight: '16px' }}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Etherscan
    </StyledCustomLink>
  </TextCell>
);

const StyledCustomLink = styled(CustomLink)({
  fontSize: 14,
  lineHeight: '18px',
  letterSpacing: '0px',
});
