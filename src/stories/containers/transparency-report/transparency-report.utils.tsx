import React from 'react';
import { formatAddressForOutput } from '../../../core/utils/string.utils';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { TextCell } from '../../components/TextCell/TextCell';
import { WalletTableCell } from '../../components/WalletTableCell/WalletTableCell';
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
