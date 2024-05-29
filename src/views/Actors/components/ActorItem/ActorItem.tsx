import { styled } from '@mui/material';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import SocialMediaComponent from '@ses/components/SocialMediaComponent/SocialMediaComponent';
import { siteRoutes } from '@ses/config/routes';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import React from 'react';
import ButtonLinksSheet from '@/components/ButtonLinksSheet/ButtonLinksSheet';
import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import RoleChip from '@/components/RoleChip/RoleChip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { TeamRole } from '@/core/enums/teamRole';
import type { TeamStatus } from '@/core/models/interfaces/types';
import { getActorLastMonthWithData } from '../../utils/utils';
import ActorLastModified from '../ActorLastModified/ActorLastModified';
import PopoverListLinks from '../PopoverListLinks/PopoverListLinks';
import GroupedScopes from './GroupedScopes';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Team } from '@ses/core/models/interfaces/team';
import type { PropsWithChildren } from 'react';

interface Props {
  queryStrings?: string;
  actor: Team;
}

const ActorItem: React.FC<Props> = ({ actor, queryStrings }) => {
  const [isEnabled] = useFlagsActive();
  const ActorSpaceLink: React.FC<PropsWithChildren> = ({ children }) => (
    <ContainerLinkColum>
      <LinkColumSpace>{children}</LinkColumSpace>
    </ContainerLinkColum>
  );

  const ActorAboutLink: React.FC<PropsWithChildren> = ({ children }) => (
    <ContainerLinkColum>
      <LinkColum>{children}</LinkColum>
    </ContainerLinkColum>
  );
  const socialIcons: SocialMediaChannels = actor.socialMediaChannels[0] ?? {};
  const keysWithNonNullValues = Object.keys(socialIcons).filter(
    (key): key is keyof SocialMediaChannels =>
      socialIcons[key as keyof SocialMediaChannels] !== null &&
      socialIcons[key as keyof SocialMediaChannels] !== undefined
  );

  return (
    <CardContainer socialLength={keysWithNonNullValues.length}>
      <ActorSpaceLink>
        <ContainerActorType>
          <WrapperEcosystemActor>
            <ActorAvatar>
              <CircleAvatarExtended width="32px" height="32px" name={actor.name || 'Wallet'} image={actor.image} />
              <ContainerDescription>
                <ContainerTitleStatus>
                  <TitleLinks>
                    <ContainerShortCodeName>
                      {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                        <ShortCode>{actor.shortCode}</ShortCode>
                      )}
                      <Name>{actor.name}</Name>
                    </ContainerShortCodeName>
                    {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                      <StatusMobile>
                        <StatusChip status={actor.status as TeamStatus} />
                      </StatusMobile>
                    )}
                  </TitleLinks>
                  <ScopeOnlyTable>
                    <LabelMobile>Scope</LabelMobile>
                    <ContainerScopeMobile>
                      {actor.scopes?.map((item, index) => (
                        <ScopeChip scope={item} key={index} codeOnly />
                      ))}
                    </ContainerScopeMobile>
                  </ScopeOnlyTable>
                  <RoleOnlyTable>
                    <LabelMobile>Role</LabelMobile>
                    <RoleChip status={(actor.category?.[0] ?? '') as TeamRole} />
                  </RoleOnlyTable>
                </ContainerTitleStatus>

                <ContainerLinksArrowsMobile>
                  <ButtonLinksSheet />

                  <InternalLinkButtonStyled
                    href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`}
                    showIcon
                  />
                </ContainerLinksArrowsMobile>
                <ContainerLinksArrowsTable>
                  <PopoverListLinks />
                  <InternalLinkButtonStyled
                    href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`}
                    showIcon
                  />
                </ContainerLinksArrowsTable>
              </ContainerDescription>
            </ActorAvatar>
          </WrapperEcosystemActor>

          <TypeSection>
            <WrapperType>Role</WrapperType>
            <WrapperHiddenOnlyMobileCategory>
              <RoleChip status={(actor.category?.[0] ?? '') as TeamRole} />
            </WrapperHiddenOnlyMobileCategory>
          </TypeSection>
          <WrapperCategoryScopeMobile>
            <TableHiddenScope>
              <LabelMobile>Role</LabelMobile>
              <WrapperCategoryScopeMobileInside>
                <RoleChip status={(actor.category?.[0] ?? '') as TeamRole} />
              </WrapperCategoryScopeMobileInside>
            </TableHiddenScope>

            <ContainerScopeMobileOnly>
              <LabelMobile>Scope</LabelMobile>
              <ContainerScopeMobile>
                {actor.scopes?.map((item, index) => (
                  <ScopeChip scope={item} key={index} codeOnly />
                ))}
              </ContainerScopeMobile>
            </ContainerScopeMobileOnly>
          </WrapperCategoryScopeMobile>
        </ContainerActorType>
      </ActorSpaceLink>
      <WrapperScopeLinks alignEnd={actor?.scopes?.length === 0}>
        <WrapperHiddenOnlyMobileScope>
          <ContainerScopeLastModified>
            <ActorAboutLink>
              <ScopeSection>
                {actor?.scopes?.length > 2 ? (
                  <GroupedScopes scopes={actor.scopes} />
                ) : (
                  actor?.scopes?.map((item, index) => <ScopeChip scope={item} key={index} />)
                )}
              </ScopeSection>
            </ActorAboutLink>

            <ContainerLastModifiedDesk>
              <ActorLastModified
                date={getActorLastMonthWithData(actor)}
                href={`${siteRoutes.ecosystemActorReports(actor.shortCode)}`}
              />
            </ContainerLastModifiedDesk>
          </ContainerScopeLastModified>
          <ActorAboutLink>
            <LinkSpace />
          </ActorAboutLink>
        </WrapperHiddenOnlyMobileScope>
      </WrapperScopeLinks>
      <ContainerLastModifiedMobileTable>
        <ActorLastModifiedStyled
          date={getActorLastMonthWithData(actor)}
          href={`${siteRoutes.ecosystemActorReports(actor.shortCode)}`}
        />
      </ContainerLastModifiedMobileTable>
      <ContainerLinksArrowsDesk>
        <PopoverListLinksStyled label="Links" />
        <VerticalLine />
        <InternalLinkButtonStyled
          href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`}
          showIcon
        />
      </ContainerLinksArrowsDesk>
    </CardContainer>
  );
};

export default ActorItem;

const ContainerTitleStatus = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [theme.breakpoints.up('desktop_1024')]: {
    width: 202,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 256,
  },
}));

const TitleLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  [theme.breakpoints.up('tablet_768')]: {
    width: 154,
    gap: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: -4,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 202,
  },
}));

const ContainerScopeMobileOnly = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 6,
});
const CardContainer = styled(Card)<{ socialLength: number }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  [theme.breakpoints.up('tablet_768')]: {
    padding: 0,
    flexDirection: 'column',
    maxHeight: 'revert',
    minHeight: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    ':hover': {
      background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(41, 46, 56, 1)',
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 16px 16px 16px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    maxWidth: 1312,
    minHeight: 82,
    alignItems: 'center',
    padding: '16px 24px 16px 8px',
  },
}));

const ContainerActorType = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 'revert',
  },
}));

const WrapperEcosystemActor = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const ActorAvatar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  paddingLeft: 8,
  paddingTop: 8,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 'revert',
    paddingLeft: 0,
    marginBottom: 0,
    paddingBottom: 0,
    width: '100%',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingTop: -4,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 304,
    paddingLeft: 2,
    gap: 20,
    paddingTop: -6,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 292,
  },
}));

const Name = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',
  width: 160,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  [theme.breakpoints.up('tablet_768')]: {
    width: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: '14px',
    width: 202,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    width: 159,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 211,
  },
}));

const TypeSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'none',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -3,
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

const WrapperType = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    color: theme.palette.isLight ? '#9FAFB9' : '#9FAFB9',

    lineHeight: '17px',
    alignItems: 'end',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
const CircleAvatarExtended = styled(CircleAvatar)(({ theme }) => ({
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.shortShadow,
  minWidth: 32,
  minHeight: 32,
  [theme.breakpoints.up('desktop_1024')]: {
    '& img': {
      minWidth: 36,
      minHeight: 36,
      width: '54px',
      height: '54px',
    },
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

const ScopeSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,

  justifyContent: 'center',
  marginBottom: 8,
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'none',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 150,
    marginLeft: 11,
    marginTop: -4,
    gap: 4,
    width: 202,
    marginBottom: 0,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 6,
    paddingTop: 6,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 150,
    marginLeft: 20,
    paddingTop: 0,
    flexDirection: 'column',
    gap: 4,
  },
}));

export const SocialMediaComponentStyled = styled(SocialMediaComponent)(({ theme }) => ({
  '& a': {
    '&:hover svg path': {
      fill: theme.palette.isLight ? '#231536' : '#48495F',
      stroke: 'none',
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 4,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    rowGap: 4,
    flexDirection: 'row',
    width: 176,
    paddingTop: 16,
    paddingBottom: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 'revert',
    justifyContent: 'revert',
    flexWrap: 'revert',
    rowGap: 'revert',
    flexDirection: 'revert',
    width: 'revert',
  },
}));

const ContainerLinkColum = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 1,
  },
}));

const LinkColum = styled('a')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    paddingLeft: 16,

    paddingRight: 16,
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    padding: 0,
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    padding: 0,
    flex: 1,
  },
}));
const LinkColumSpace = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 'revert',
    paddingLeft: 'revert',
    paddingRight: 'revert',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingRight: 0,
    minWidth: 430,
    paddingLeft: 8,
  },
}));

const ContainerLastModifiedDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: -1,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    marginLeft: 'revert',
    marginTop: 0,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',

    marginTop: -4,
  },
}));

const ContainerScopeLastModified = styled('div')(({ theme }) => ({
  marginTop: 0,
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',

    flexDirection: 'row',
    gap: 8,
    marginTop: -1,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 54,
    marginLeft: 18,
    marginTop: -4,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 88,
    marginLeft: 50,
    paddingTop: 2,
  },
}));

const ContainerLastModifiedMobileTable = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 6,
  marginLeft: 0,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 4,
    marginLeft: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const WrapperCategoryScopeMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 8,
  paddingRight: 8,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const WrapperCategoryScopeMobileInside = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

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
const WrapperHiddenOnlyMobileCategory = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 10,
    minWidth: 200,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginRight: 12,
    marginLeft: 40,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginRight: 0,
    marginLeft: 84,
    paddingTop: 4,
  },
}));

const WrapperHiddenOnlyMobileScope = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',

    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,
  },
}));

const LinkSpace = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  [theme.breakpoints.up('desktop_1024')]: {},
}));

const ShortCode = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  flex: 1,
  paddingRight: 8,
  [theme.breakpoints.up('tablet_768')]: {
    paddingRight: 0,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const StatusMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: -4,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 1,
  },
}));
const ContainerShortCodeName = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
});
const ContainerLinksArrowsMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  height: 32,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
const ContainerLinksArrowsTable = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    gap: 8,
    paddingTop: 16,
    height: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
const ContainerLinksArrowsDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 140,
    justifyContent: 'flex-end',
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

const TableHiddenScope = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'none',
  },
}));

const ScopeOnlyTable = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 195,
    marginLeft: 8,
    gap: 2,
  },
}));

const RoleOnlyTable = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 195,
    marginLeft: 6,
    gap: 1,
  },
}));
const ActorLastModifiedStyled = styled(ActorLastModified)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    padding: '3px 8px 4px 8px',
    fontSize: 14,
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  borderRadius: 8,
  padding: '2px 8px 2px 8px',
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});

const VerticalLine = styled('div')(({ theme }) => ({
  marginLeft: 8,
  marginRight: 8,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 16,
    marginRight: 16,
  },
}));
const PopoverListLinksStyled = styled(PopoverListLinks)(({ theme }) => ({
  'div:first-of-type': {
    width: 21,
    height: 21,
    justifyContent: 'flex',
    alignItem: 'center',
  },
  '& button': {
    gap: 4,
    [theme.breakpoints.up('desktop_1280')]: {
      padding: '5px 7px 5px 4px',
    },
  },
}));
