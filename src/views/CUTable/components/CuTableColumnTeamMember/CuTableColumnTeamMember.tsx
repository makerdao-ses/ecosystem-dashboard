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
    <Container className="TeamMembers" hasMember={(members?.length || 0) >= 1}>
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
const Container = styled('div')<{ hasMember: boolean }>(({ theme, hasMember }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: hasMember ? 'start' : 'center',
  alignItems: 'center',
  borderRadius: 8,
  gap: hasMember ? 4 : 0,
  fontWeight: 400,
  cursor: 'pointer',
  width: 128,
  padding: '17px 4px 14px 4px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : 'red',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : 'red'}`,
  [theme.breakpoints.up('desktop_1024')]: {
    width: 140,
    padding: '17px 8px 12px 8px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 164,
    gap: hasMember ? 16 : 0,
    padding: '17px 16px 12px 16px',
  },

  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : 'red',
    '& > div:nth-of-type(1) .TeamMembers_Value': {
      color: theme.palette.isLight ? theme.palette.colors.gray[600] : 'red',
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
    marginTop: 10,
  },
}));

const Value = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',
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
  background: '#FFFFFF',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : 'red',
  padding: '0px 4px',
  fontStyle: 'normal',

  lineHeight: '18px',
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('desktop_1280')]: {
    left: 16,
  },
}));
