import { styled } from '@mui/material';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import CardInfoMember from '@/stories/components/CardInfoMember/CardInfoMember';
import { CustomPopover } from '@/stories/components/CustomPopover/CustomPopover';

import ToolTipsCU from '../components/ToolTips/ToolTips';
import { ColumnTeamMemberSkeleton } from './CuTableColumnTeamMemberSkeleton';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';

interface CuTableColumnTeamMemberProps {
  members?: ContributorCommitment[];
  fte?: number;
  isLoading?: boolean;
}

const CuTableColumnTeamMember: React.FC<CuTableColumnTeamMemberProps> = ({
  isLoading = false,
  fte,
  members,
}: CuTableColumnTeamMemberProps) =>
  !isLoading ? (
    <Container className="TeamMembers" hasMember={(members?.length || 0) >= 1}>
      <SESTooltipStyled content={<ToolTipsCU>Full-Time Equivalents</ToolTipsCU>}>
        <Data>
          <Title>FTEs</Title>
          <Value className="TeamMembers_Value">{fte}</Value>
        </Data>
      </SESTooltipStyled>

      <CirclesWrapper>
        {members?.map((member, i) => (
          <CustomPopover
            key={member.contributor[0].name + i}
            popupStyle={{
              padding: 0,
            }}
            title={<CardInfoMember contributorCommitment={member} />}
            id={member.contributor[0].name + i}
            leaveOnChildrenMouseOut
          >
            <CircleAvatarStyled
              key={member.id}
              name={member.contributor[0].name}
              index={i}
              image={member.contributor[0].facilitatorImage?.trim()}
            />
          </CustomPopover>
        ))}
      </CirclesWrapper>
    </Container>
  ) : (
    <ColumnTeamMemberSkeleton />
  );

export default CuTableColumnTeamMember;
const Container = styled('div')<{ hasMember: boolean }>(({ theme, hasMember }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: hasMember ? 'start' : 'center',
  alignItems: 'center',
  borderRadius: 8,
  gap: hasMember ? 4 : 0,
  fontWeight: 400,
  cursor: 'pointer',
  width: hasMember ? 128 : 60,
  padding: '17px 4px 14px 4px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1024')]: {
    width: hasMember ? 140 : 70,
    height: 78,
    padding: '17px 8px 8px 8px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: hasMember ? 164 : 82,
    gap: hasMember ? 16 : 0,
    padding: '17px 16px 8px 16px',
  },

  ':hover': {
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700]}`,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
    '& > div:nth-of-type(1) .TeamMembers_Value': {
      color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
    },
  },
}));

const Data = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',

  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: '4px',
  },
}));

const CirclesWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: 4,
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 0,
    height: 36,
  },
}));

const Value = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
  width: 32,

  textAlign: 'center',
  marginTop: 4,
  alignSelf: 'center',
}));

const Title = styled('span')(({ theme }) => ({
  fontSize: 12,
  top: -8,
  left: 4,
  borderRadius: 4,
  fontWeight: 500,
  position: 'absolute',
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[500],
  padding: '0px 4px',
  fontStyle: 'normal',

  lineHeight: '18px',
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('desktop_1280')]: {
    left: 12,
  },
}));

const SESTooltipStyled = styled(SESTooltip)({
  padding: 0,
  width: 'fit-content',
  '&.MuiTooltip-tooltip MuiTooltip-tooltipPlacementBottom': {
    backgroundColor: 'red',
  },
  '& div': {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,

    fontWeight: 500,
    lineHeight: '24px',
  },
});

const CircleAvatarStyled = styled(CircleAvatar)<{ index: number }>(({ index }) => ({
  width: 36,
  height: 36,
  minWidth: 36,
  minHeight: 36,
  fontSize: 14,
  boxSizing: 'border-box',
  marginLeft: index === 0 ? 0 : '-9px',
}));
