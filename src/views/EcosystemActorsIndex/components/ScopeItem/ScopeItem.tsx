import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import { siteRoutes } from '@/config/routes';
import type { Team } from '@/core/models/interfaces/team';
import GroupedScopes from '../ActorItem/GroupedScopes';
import type { FC } from 'react';
interface Props {
  actor: Team;
  className?: string;
}

const ScopeItem: FC<Props> = ({ actor, className }) => (
  <Container id="scope" className={className} href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}`}>
    <ContainerMobileTable>
      <LabelMobile>Scope</LabelMobile>
      <ContainerScopeMobile>
        {actor.scopes?.map((item, index) => (
          <ScopeChip scope={item} key={index} codeOnly />
        ))}
      </ContainerScopeMobile>
    </ContainerMobileTable>
    <WrapperScopeLinks alignEnd={actor?.scopes?.length === 0}>
      <ContainerDesk>
        <ScopeSection>
          {actor?.scopes?.length > 2 ? (
            <GroupedScopes scopes={actor.scopes} />
          ) : (
            actor?.scopes?.map((item, index) => <ScopeChipStyled scope={item} key={index} />)
          )}
        </ScopeSection>
      </ContainerDesk>
    </WrapperScopeLinks>
  </Container>
);

export default ScopeItem;

const Container = styled(Link)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 190,
    marginLeft: -6,
  },
  [theme.breakpoints.up('desktop_1024')]: {},
}));
const ContainerMobileTable = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
const ContainerScopeMobile = styled('div')(({ theme }) => ({
  display: 'flex',

  flexDirection: 'row',
  gap: 4,
  '& div': {
    width: 34,
    padding: '0px',
  },
  [theme.breakpoints.up('tablet_768')]: {
    '& div': {
      width: 40,
    },
  },
}));
const LabelMobile = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.charcoal[700],
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const WrapperScopeLinks = styled('div')<{ alignEnd: boolean }>(({ alignEnd, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: alignEnd ? 'flex-end' : 'space-between',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 'revert',
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 'revert',
    flex: 1.5,
  },
}));

const ContainerDesk = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 1,
    marginLeft: 8,

    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 34,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: 60,
    marginTop: -6,
  },
}));

const ScopeSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  justifyContent: 'center',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'none',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 150,
    marginLeft: 10,

    gap: 4,
    width: 202,
    marginBottom: 0,
    paddingTop: 14,
    paddingBottom: 14,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 8,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 150,
    marginLeft: 22,
    flexDirection: 'column',
    gap: 4,
  },
}));

const ScopeChipStyled = styled(ScopeChip)(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    height: 24,
  },
}));
