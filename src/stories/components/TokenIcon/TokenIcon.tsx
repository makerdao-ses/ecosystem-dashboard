import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import DAIIcon from '../svg/DAIIcon';
import ETHIcon from '../svg/ETHIcon';
import MKRIcon from '../svg/MKRIcon';

export type Token = 'DAI' | 'ETH' | 'MKR';

interface TokenIcon {
  token: Token;
  size?: number;
  className?: string;
  failSilently?: boolean;
}

const TokenIcon: React.FC<TokenIcon> = ({ token, size = 24, className, failSilently = false }) => {
  const Icon = useMemo(() => {
    switch (token) {
      case 'DAI':
        return <DAIIcon width={size} height={size} />;
      case 'ETH':
        return <ETHIcon width={size} height={size} />;
      case 'MKR':
        return <MKRIcon width={size} height={size} />;
      default:
        if (!failSilently) throw new Error(`Token icon "${token}" not supported.`);
    }
  }, [token, size, failSilently]);

  return <IconContainer className={className}>{Icon}</IconContainer>;
};

export default TokenIcon;

const IconContainer = styled.div({
  display: 'inline-flex',
});
