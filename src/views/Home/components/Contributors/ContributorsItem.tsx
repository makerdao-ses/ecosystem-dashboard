import { styled, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import RoleChip from '@/components/RoleChip/RoleChip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';

import type { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';

import { getProfileUpdate } from '../../utils/utils';
import Profile from './Profile';
import ProfileUpdated from './ProfileUpdated';
import type { Theme } from '@mui/material';
import type { FC } from 'react';

interface Props {
  contributors: Team;
  className?: string;
  hasDefaultColors?: boolean;
}
const ContributorsItem: FC<Props> = ({ contributors, className, hasDefaultColors = true }) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1280Plus = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));
  return (
    <LinkStyled href="#">
      <Container className={className}>
        <ContainerData>
          <ProfileArrow>
            <ProfileStyled contributor={contributors} />
            <ArrowContainerMobile>
              <InternalLinkButtonStyled href={'#'} showIcon isLink={false} />
            </ArrowContainerMobile>
          </ProfileArrow>
          <Line />
          <ContainerScopeRoleMobile>
            <Scopes>
              {contributors.scopes?.map((item, index) => (
                <ScopeChip scope={item} key={index} size={isTablet ? 'large' : 'small'} />
              ))}
            </Scopes>
            <RoleMobileContainer>
              <RoleChip status={(contributors.category?.[0] ?? '') as TeamRole} hasDefaultColors={hasDefaultColors} />
            </RoleMobileContainer>
          </ContainerScopeRoleMobile>
        </ContainerData>
        <ScopesDesk>
          {contributors.scopes?.map((item, index) => (
            <ScopeChip scope={item} key={index} size={isDesktop1280Plus ? 'medium' : 'small'} />
          ))}
        </ScopesDesk>
        <RoleDesk>
          <RoleChip status={contributors.category?.[0] as TeamRole} hasDefaultColors={hasDefaultColors} />
        </RoleDesk>
        <DateUpdated>
          <ProfileUpdated date={getProfileUpdate(contributors)} />
        </DateUpdated>
        <ArrowContainerDesk>
          <InternalLinkButtonStyled href={'#'} showIcon isLink={false} />
        </ArrowContainerDesk>
      </Container>
    </LinkStyled>
  );
};

export default ContributorsItem;

const ContainerData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '8px 8px 0px 8px',
  gap: 8,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 6,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    padding: 0,
    width: 'revert',
  },
}));

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    padding: '8px 12px',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '12px 16px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    padding: '12px 16px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
const Line = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  padding: '2px 8px 2px 8px',
  width: 40,
  height: 32,
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});

const ProfileArrow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const LinkStyled = styled(Link)({
  display: 'flex',
});

const Scopes = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
});
const RoleMobileContainer = styled('div')({});
const ScopesDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));
const RoleDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 170,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const DateUpdated = styled('div')({});
const ArrowContainerDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));
const ArrowContainerMobile = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ContainerScopeRoleMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 8,
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ProfileStyled = styled(Profile)(({ theme }) => ({
  width: 180,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 185,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 230,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 250,
  },
}));
