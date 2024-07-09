import { styled } from '@mui/material';

import { MAKER_BURN_LINK } from '@ses/core/utils/const';

import React from 'react';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';

interface CuHeadlineTextProps {
  cuLongCode: string;
  shortCode: string;
  className?: string;
  isCoreUnit?: boolean;
}

const CuHeadlineText: React.FC<CuHeadlineTextProps> = ({ cuLongCode, isCoreUnit = true, shortCode }) => {
  const resource = isCoreUnit ? 'Core Unit' : 'Ecosystem Actor';
  return (
    <LinkDescription>
      <ExternalLinkButtonStyled href={`${MAKER_BURN_LINK}/${cuLongCode}`} wrapText={false}>
        {`${shortCode} ${resource} on-chain transaction history`}
      </ExternalLinkButtonStyled>
    </LinkDescription>
  );
};

export default CuHeadlineText;

export const LinkDescription = styled('div')(() => ({
  display: 'flex',
}));

const ExternalLinkButtonStyled = styled(ExternalLinkButton)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  hover: {
    borderWidth: 1.5,
    padding: '0px 6px 0px 8px',
  },
  '& div': {
    width: 16,
    height: 16,
  },

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 600,
    padding: '2px 16px 2px 24px',
    hover: {
      borderWidth: 1.5,
      padding: '2px 16px 2px 24px',
    },
  },
}));
