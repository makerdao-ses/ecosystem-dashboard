import styled from '@emotion/styled';
import CopyIcon from '@ses/components/CopyIcon/CopyIcon';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TxHashProps {
  txHash: string;
  className?: string;
}

const TxHash: React.FC<TxHashProps> = ({ txHash, ...props }) => {
  const { isLight } = useThemeContext();
  const formattedHash = txHash.length <= 16 ? txHash : `${txHash.slice(0, 16)}...`;

  return (
    <TxHashContainer {...props}>
      <Hash href={`https://etherscan.io/tx/${txHash}`} target="_blank" isLight={isLight}>
        {formattedHash}
      </Hash>
      <CopyIcon text={txHash} defaultTooltip="Copy Transaction Hash" />
    </TxHashContainer>
  );
};

export default TxHash;

const TxHashContainer = styled.div({
  display: 'flex',
});

const Hash = styled.a<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  color: isLight ? '#447AFB' : 'red',
}));
