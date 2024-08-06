import { styled } from '@mui/material';
import React from 'react';
import SimpleBar from 'simplebar-react';
import Card from '@/components/Card/Card';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import type { Team } from '@/core/models/interfaces/team';
import ContributorsItem from './ContributorsItem';
import TabDescriptions from './TabDescriptions';
import { useContributorsSection } from './useContributorsSection';
import type { FC } from 'react';

interface Props {
  teams: Team[];
}
const ContributorsSection: FC<Props> = ({ teams }) => {
  const {
    hasDefaultColors,
    activeCategoryTab,
    handleActiveCategoryTab,
    activeDetailTab,
    handleActiveDetailTab,
    teamCategoriesTabs,
    teamDetailsTabs,
    subTitle,
    isLegacy,
    teamCategoryDataMock,
    contributors,
    textDefault,
  } = useContributorsSection(teams);
  return (
    <Container>
      <TabsDescriptions>
        <ShadowWrapperStyled>
          <FancyTabs
            tabs={teamCategoriesTabs}
            activeTab={activeCategoryTab}
            onTabChange={(tab: string) => {
              handleActiveCategoryTab(tab);
            }}
          />

          <CardTabs isLegacy={isLegacy}>
            <TabDescriptions contributorsDescription={teamCategoryDataMock} isLegacy={isLegacy} />
          </CardTabs>
        </ShadowWrapperStyled>
      </TabsDescriptions>
      <ContainerTabs>
        <ShadowWrapper>
          <FancyTabs
            tabs={teamDetailsTabs}
            activeTab={activeDetailTab}
            onTabChange={(tab: string) => {
              handleActiveDetailTab(tab);
            }}
          />

          <ContributorInformation>
            <Title>{subTitle}</Title>
            <ContainerScroll>
              <SimpleBarStyled>
                <ContainerContributors>
                  {contributors.map((contributor) => (
                    <ContributorsItem
                      contributor={contributor}
                      hasDefaultColors={hasDefaultColors}
                      textDefault={textDefault}
                    />
                  ))}
                </ContainerContributors>
              </SimpleBarStyled>
            </ContainerScroll>
          </ContributorInformation>
        </ShadowWrapper>
      </ContainerTabs>
    </Container>
  );
};

export default ContributorsSection;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  flex: 1,
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    gap: 32,
  },
}));
const ContainerTabs = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: 1,

  [theme.breakpoints.up('tablet_768')]: {
    width: 401,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 632,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 789,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 976,
  },
}));

const ContributorInformation = styled(Card)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0px 12px 12px 12px',
  overFlow: 'hidden',
}));

const CardTabs = styled(Card)<{ isLegacy: boolean }>(({ isLegacy, theme }) => ({
  borderTopLeftRadius: 0,
  boxShadow: 'none',
  height: 'calc(100% - 32px)',
  backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  padding: isLegacy ? '8px 8px' : '8px 0px',
}));

const TabsDescriptions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    width: 279,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 304,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 379,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 304,
  },
}));

const Title = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  padding: '9px 16px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: '0px 12px 0px 0px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ContainerContributors = styled('div')({
  display: 'flex',
  width: 'calc(100%-8px)', // Reduces the width of the container to make space for the scrollbar margin
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  flex: 1,
});
const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  height: '100%',
  width: '100%',

  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    height: 128,
    background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
    borderRadius: 12,
  },

  [theme.breakpoints.up('tablet_768')]: {
    height: 480,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 540,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: 550,
  },
}));

const ContainerScroll = styled('div')({
  display: 'flex',
  marginRight: 4,
});

const ShadowWrapperStyled = styled(ShadowWrapper)({
  height: '100%',
});
