import { styled } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import CardInfoMember from '../CardInfoMember/CardInfoMember';
import { CircleAvatar } from '../CircleAvatar/CircleAvatar';
import { CustomPopover } from '../CustomPopover/CustomPopover';
import { ColumnTeamMemberSkeleton } from './CuTableColumnTeamMemberSkeleton';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';

interface CuTableColumnTeamMemberProps {
  members?: ContributorCommitment[];
  fte?: number;
  isLoading?: boolean;
}

export const CuTableColumnTeamMember = ({ isLoading = false, ...props }: CuTableColumnTeamMemberProps) => {
  const { isLight } = useThemeContext();

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
          <Value style={{ justifyContent: 'center' }}>{props.fte}</Value>
        </Data>
      </CustomPopover>
      <CirclesWrapper>
        {props.members?.map((member, i) => (
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

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  fontWeight: 400,
  cursor: 'pointer',
  marginLeft: '7px',
  width: 'fit-content',
  '@media (min-width: 834px) and (max-width: 1194px)': {
    marginLeft: '0px',
  },
  [theme.breakpoints.up('desktop_1194')]: {
    marginRight: 36,

    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  [theme.breakpoints.up('desktop_1920')]: {
    paddingLeft: 6,
    marginLeft: 0,
  },
}));

const Data = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '10px',
  [theme.breakpoints.up('desktop_1194')]: {
    marginRight: '10px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginRight: '10px',
    marginLeft: '4px',
  },
}));

const CirclesWrapper = styled('div')({
  display: 'flex',
});

const Value = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#EDEFFF',
}));

const Title = styled('span')(({ theme }) => ({
  fontSize: '11px',

  color: theme.palette.isLight ? '#434358' : '#9FAFB9',
  fontWeight: 400,
  fontStyle: 'normal',
  marginBottom: '8px',
  lineHeight: '13px',
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: '6px',
  },
}));
