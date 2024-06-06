import { styled, useTheme } from '@mui/material';
import React from 'react';
import CardInfoMember from '@/stories/components/CardInfoMember/CardInfoMember';
import { CircleAvatar } from '@/stories/components/CircleAvatar/CircleAvatar';
import { CustomPopover } from '@/stories/components/CustomPopover/CustomPopover';
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
}: CuTableColumnTeamMemberProps) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  return !isLoading ? (
    <Container className="TeamMembers">
      <CustomPopover
        title={'Full-Time Equivalents'}
        id={'popover-fulltime-equivalents'}
        popupStyle={{
          padding: '16px',
          color: isLight ? '#231536' : '#D2D4EF',
        }}
      >
        <Data>
          <Title>FTEs</Title>
          <Value className="TeamMembers_Value">{fte}</Value>
        </Data>
      </CustomPopover>

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
            <CircleAvatar
              key={member.id}
              name={member.contributor[0].name}
              fontSize={'14px'}
              width={'36px'}
              height={'36px'}
              style={{
                boxSizing: 'border-box',
                marginLeft: i === 0 ? 0 : '-9px',
              }}
              image={member.contributor[0].facilitatorImage?.trim()}
            />
          </CustomPopover>
        ))}
      </CirclesWrapper>
    </Container>
  ) : (
    <ColumnTeamMemberSkeleton />
  );
};

export default CuTableColumnTeamMember;
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  borderRadius: 8,
  gap: 4,
  fontWeight: 400,
  cursor: 'pointer',
  width: 128,
  padding: '17px 4px 14px 4px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1024')]: {
    width: 140,
    padding: '17px 8px 12px 8px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 164,
    gap: 16,
    padding: '17px 16px 12px 16px',
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
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('desktop_1194')]: {},
  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: '4px',
  },
}));

const CirclesWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: 4,
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 10,
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
    left: 16,
  },
}));
