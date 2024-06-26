import { Typography, styled } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import Card from '@/components/Card/Card';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { TeamStatus } from '@/core/models/interfaces/types';
import ExternalLink from '@/stories/components/ExternalLink/ExternalLink';
import { getMipsStatus } from '../../../../core/businessLogic/coreUnitAbout';
import { getMipTitle } from '../../../../core/utils/string';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';

export type RelateMipType = {
  status: TeamStatus;
  statusModified: Date;
  mipTitle?: string;
  href: string;
};

interface Props {
  relateMips: CuMip;
}

const RelateMips = ({ relateMips }: Props) => {
  const mips = getMipsStatus(relateMips || '');
  const mipStatus = relateMips.mipStatus;
  const newDate = mips ? DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate() : null;
  const pieces = getMipTitle(relateMips.mipTitle);

  return (
    <Content>
      <Row>
        {mipStatus && <StatusStyled status={mipStatus as TeamStatus} />}
        {newDate && <SinceDate>Since {DateTime.fromJSDate(newDate).toFormat('d-MMM-y').toUpperCase()}</SinceDate>}
      </Row>
      {pieces.length === 2 && (
        <RowUnderLine>
          <StyleMipNumber>{`${pieces[0]}:`}</StyleMipNumber>

          <ExternalLinkStyled href={relateMips.mipUrl}>{pieces[1]}</ExternalLinkStyled>
        </RowUnderLine>
      )}
      {pieces.length === 1 && (
        <RowUnderLine>
          <ExternalLink href={`${relateMips.mipUrl}` || '#'}> {relateMips.mipTitle}</ExternalLink>
        </RowUnderLine>
      )}
    </Content>
  );
};
export default RelateMips;
const Content = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  minWidth: 343,
  width: '100%',
  gap: 16,
  cursor: 'pointer',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
  [theme.breakpoints.up('tablet_768')]: {
    width: 640,
    padding: '8px 16px',
    gap: 8,
  },
  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#292E38',
  },
}));

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 4,
});

const RowUnderLine = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 4,
  },
}));

const SinceDate = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.slate[300],
}));

const StyleMipNumber = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  gap: 4,
  minWidth: 'fit-content',
  display: 'inline-block',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

const ExternalLinkStyled = styled(ExternalLink)(({ theme }) => ({
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 500,
  display: 'inline-block',
  '& svg': {
    marginLeft: 4,
  },
  color: theme.palette.colors.blue[700],
  '& path': {
    fill: theme.palette.colors.blue[700],
  },
  ':hover': {
    color: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[600],
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[600],
    },
  },
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    fontSize: 16,
    lineHeight: '18px',
  },
}));

const StatusStyled = styled(StatusChip)(() => ({
  padding: '1px 16px 1px 16px',
  height: 24,
  fontSize: 14,
}));
