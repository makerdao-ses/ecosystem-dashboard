import React from 'react';
import { WalletTableCell } from '../../components/wallet-table-cell/wallet-table-cell';
import { BudgetStatementWalletDto } from '../../../core/models/dto/core-unit.dto';
import { formatAddressForOutput } from '../../../core/utils/string.utils';
import { TextCell } from '../../components/text-cell/text-cell';
import { CustomLink } from '../../components/custom-link/custom-link';

export const renderWallet = (wallet: BudgetStatementWalletDto) => {
  return (
    <WalletTableCell
      key={wallet.address}
      name={wallet.name}
      wallet={formatAddressForOutput(wallet.address)}
      address={wallet.address}
    />
  );
};

export const renderLinks = (address: string) => {
  return (
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
};
