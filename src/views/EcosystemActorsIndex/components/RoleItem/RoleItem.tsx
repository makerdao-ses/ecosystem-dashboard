import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import RoleChip from '@/components/RoleChip/RoleChip';

import { siteRoutes } from '@/config/routes';
import type { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import type { FC } from 'react';

interface Props {
  actor: Team;
  className?: string;
  queryStrings?: string;
}

const RoleItem: FC<Props> = ({ actor, className, queryStrings }) => (
  <Container
    className={className}
    href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`}
    id="role"
  >
    <TypeSection>
      <Label>Role</Label>
      <WrapperHiddenOnlyMobileCategory>
        <RoleChip status={(actor.category?.[0] ?? '') as TeamRole} />
      </WrapperHiddenOnlyMobileCategory>
    </TypeSection>
  </Container>
);
export default RoleItem;

const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 190,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingTop: 27.5,
    paddingBottom: 27.5,
  },
}));
const TypeSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'start',
    gap: 2,
    marginLeft: 8,
    paddingTop: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 0,
    marginTop: -4,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,
    marginTop: -10,
    flexDirection: 'row',
  },
}));

const Label = styled('div')(({ theme }) => ({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.charcoal[700],
  [theme.breakpoints.up('tablet_768')]: {
    lineHeight: '22px',
    fontWeight: 600,
    fontSize: 14,
    alignItems: 'end',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const WrapperHiddenOnlyMobileCategory = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 10,
    marginTop: -6,
    minWidth: 200,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginRight: 12,
    marginLeft: 40,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginRight: 0,
    marginLeft: 90,
    paddingTop: 4,
  },
}));
