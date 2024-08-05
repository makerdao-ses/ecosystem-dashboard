import { styled, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Card from '@/components/Card/Card';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import RoleChip from '@/components/RoleChip/RoleChip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';

import { siteRoutes } from '@/config/routes';
import { getFTEsFromCoreUnit } from '@/core/businessLogic/coreUnits';
import type { TeamRole } from '@/core/enums/teamRole';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import type { Team } from '@/core/models/interfaces/team';

import { ResourceType, type TeamCategory } from '@/core/models/interfaces/types';
import { getProfileUpdate } from '../../utils/utils';
import GroupScopesContributors from './GroupScopesContributors';
import Profile from './Profile';
import ProfileUpdated from './ProfileUpdated';
import type { Theme } from '@mui/material';
import type { FC } from 'react';

interface Props {
  contributor: Team;
  className?: string;
  hasDefaultColors?: boolean;
  textDefault?: boolean;
}
const ContributorsItem: FC<Props> = ({ contributor, className, hasDefaultColors = true, textDefault }) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1280Plus = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));
  const isEcosystemActor = contributor.type === ResourceType.EcosystemActor;
  return (
    <LinkStyled
      href={
        isEcosystemActor
          ? siteRoutes.ecosystemActorAbout(contributor.shortCode)
          : siteRoutes.coreUnitAbout(contributor.shortCode)
      }
    >
      <Container className={className}>
        <ContainerData>
          <ProfileArrow>
            <ProfileStyled contributor={contributor} type={contributor.type} textDefault={textDefault ?? false} />
            <ArrowContainerMobile>
              <InternalLinkButtonStyled showIcon isLink={false} />
            </ArrowContainerMobile>
          </ProfileArrow>
          <Line />
          <ContainerScopeRoleMobile>
            {contributor.type === ResourceType.EcosystemActor ? (
              <>
                <Scopes>
                  {contributor.scopes?.map((item, index) => (
                    <ScopeChip
                      scope={item}
                      key={index}
                      size={isTablet && contributor.scopes.length < 2 ? 'large' : 'small'}
                    />
                  ))}
                </Scopes>
                <RoleMobileContainer>
                  <RoleChipStyled
                    type={contributor.type}
                    status={(contributor.category?.[0] ?? '') as TeamRole}
                    hasDefaultColors={hasDefaultColors}
                    textDefault={textDefault}
                  />
                </RoleMobileContainer>
              </>
            ) : (
              <>
                <ContainerCategoryMobile>
                  <Label>Category</Label>
                  <ContainerCategories>
                    {contributor.category?.map((category) => (
                      <CategoryChip category={category as TeamCategory} />
                    ))}
                  </ContainerCategories>
                </ContainerCategoryMobile>
                <ContainerFTEsMobile>
                  <Label>FTS</Label>
                  <FTS>{getFTEsFromCoreUnit(contributor as unknown as CoreUnit)}</FTS>
                </ContainerFTEsMobile>
              </>
            )}
          </ContainerScopeRoleMobile>
        </ContainerData>

        {contributor.type === ResourceType.EcosystemActor ? (
          <>
            <ScopesDesk>
              {contributor?.scopes?.length > 1 ? (
                <GroupScopesContributors items={contributor.scopes} />
              ) : contributor?.scopes?.length === 0 || contributor.scopes === null ? (
                <PlaceHolderEcosystemActor />
              ) : (
                contributor?.scopes?.map((item, index) => (
                  <ScopeChip scope={item} key={index} size={isDesktop1280Plus ? 'medium' : 'small'} />
                ))
              )}
            </ScopesDesk>
            <RoleDesk>
              <RoleChipDeskStyled
                status={contributor.category?.[0] as TeamRole}
                hasDefaultColors={hasDefaultColors}
                textDefault={textDefault}
                type={contributor.type}
              />
            </RoleDesk>
          </>
        ) : textDefault ? (
          <>
            <ScopesDesk>
              {contributor?.scopes?.length > 1 ? (
                <GroupScopesContributors items={contributor.scopes} />
              ) : contributor?.scopes?.length === 0 || contributor.scopes === null ? (
                <PlaceHolderEcosystemActor />
              ) : (
                contributor?.scopes?.map((item, index) => (
                  <ScopeChip scope={item} key={index} size={isDesktop1280Plus ? 'medium' : 'small'} />
                ))
              )}
            </ScopesDesk>
            <RoleDesk>
              <RoleChipDeskStyled
                status={contributor.category?.[0] as TeamRole}
                hasDefaultColors={hasDefaultColors}
                textDefault={textDefault}
                type={contributor.type}
              />
            </RoleDesk>
          </>
        ) : (
          <>
            <ContainerCategoryDesk>
              <Label>Category</Label>
              <ContainerCategories>
                {contributor?.category?.length > 2 ? (
                  <GroupScopesContributors items={contributor.category as TeamCategory[]} />
                ) : contributor?.category?.length === 0 || contributor.category === null ? (
                  <PlaceHolderEcosystemActor />
                ) : (
                  contributor?.category?.map((item, index) => (
                    <CategoryChip category={item as TeamCategory} key={index} />
                  ))
                )}
              </ContainerCategories>
            </ContainerCategoryDesk>
            <ContainerFTEsDesk>
              <LabelFTs>FTES</LabelFTs>
              <FTS>{getFTEsFromCoreUnit(contributor as unknown as CoreUnit)}</FTS>
            </ContainerFTEsDesk>
          </>
        )}

        <DateUpdated>
          <ProfileUpdated date={getProfileUpdate(contributor)} type={contributor.type} />
        </DateUpdated>
        <ArrowContainerDesk>
          <InternalLinkButtonStyled showIcon isLink={false} />
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
  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#292E38',
  },
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

const ProfileStyled = styled(Profile)<{ type: ResourceType; textDefault: boolean }>(({ theme, type, textDefault }) => ({
  width: 180,
  [theme.breakpoints.up('desktop_1024')]: {
    width: 185,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 230,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: type === ResourceType.EcosystemActor ? 250 : 292,
    ...(textDefault && {
      width: 252,
    }),
  },
}));

const ContainerCategories = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 4,
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
  },
}));

const ContainerCategoryMobile = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

const ContainerCategoryDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 145,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 168,
  },
}));
const ContainerFTEsDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 54,
    padding: '4px 8px',
    paddingRight: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const ContainerFTEsMobile = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});
const Label = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[500],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
const LabelFTs = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  [theme.breakpoints.up('desktop_1024')]: {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const FTS = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  [theme.breakpoints.up('desktop_1024')]: {
    justifyContent: 'flex-start',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],

    lineHeight: '24px',
  },
}));

const PlaceHolderEcosystemActor = styled('div')(({ theme }) => ({
  width: 32,
  [theme.breakpoints.up('desktop_1280')]: {
    width: 45,
  },
}));

const RoleChipStyled = styled(RoleChip)(() => ({
  '& div': {
    fontSize: 14,
  },
}));

const RoleChipDeskStyled = styled(RoleChip)(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    '& div': {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    '& div': {
      fontSize: 14,
      lineHeight: '22px',
    },
  },
}));
