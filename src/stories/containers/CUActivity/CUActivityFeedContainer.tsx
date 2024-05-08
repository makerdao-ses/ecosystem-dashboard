import styled from '@emotion/styled';
import { siteRoutes } from '@ses/config/routes';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { toAbsoluteURL } from '../../../core/utils/urls';
import ActivityTable from '../../components/CUActivityTable/ActivityTable';
import { CoreUnitSummary } from '../../components/CoreUnitSummary/CoreUnitSummary';
import { SEOHead } from '../../components/SEOHead/SEOHead';
import { useCuActivity } from './useCuActivity';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface CUActivityContainerProps {
  coreUnits: CoreUnit[];
  coreUnit: CoreUnit;
  activities: ChangeTrackingEvent[];
}

const CUActivityFeedContainer: React.FC<CUActivityContainerProps> = ({ coreUnit, coreUnits, activities }) => {
  const { isLight, columns, onSortClick, code, ref } = useCuActivity();

  const { height, showHeader } = useHeaderSummary(ref, code);
  return (
    <Wrapper>
      <SEOHead
        title={`${coreUnit.name} Core Unit | Activity Feed`}
        description={`Learn about the ${coreUnit.name} Core Unit's activity: updates to Core Unit Expense Reports, FTEs, and more.`}
        image={coreUnit.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={coreUnit.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.coreUnitActivityFeed(coreUnit.shortCode)}
      />
      <CoreUnitSummary
        coreUnits={coreUnits}
        trailingAddress={['Activity Feed']}
        breadcrumbTitle="Activity Feed"
        ref={ref}
        showHeader={showHeader}
      />
      <Container isLight={isLight}>
        <InnerPage marginTop={height}>
          <TableWrapper>
            <ActivityTable
              columns={columns}
              shortCode={coreUnit.shortCode}
              activityFeed={activities.map((activity) => ({
                activityFeed: activity,
              }))}
              sortClick={onSortClick}
            />
          </TableWrapper>
          <Title isLight={isLight}>Additional Notes</Title>
          <Paragraph isLight={isLight}>
            The table below reflects the activity regarding the {coreUnit.shortCode} Core Unit. Here you will be able to
            see all previous modifications that the Core Unit has made to their Expense Reports, FTEs, and more.
          </Paragraph>
        </InnerPage>
      </Container>
    </Wrapper>
  );
};

export default CUActivityFeedContainer;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '64px',
  flex: 1,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '79px',

  [lightTheme.breakpoints.up('table_834')]: {
    paddingBottom: '128px',
  },
}));

const InnerPage = styled.div<{ marginTop: number }>(({ marginTop }) => ({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  marginTop,
  paddingTop: 24,
  paddingRight: '64px',
  paddingLeft: '64px',

  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingRight: '48px',
    paddingLeft: '48px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1280')]: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 32,
  },
  [lightTheme.breakpoints.down('table_834')]: {
    paddingRight: '16px',
    paddingLeft: '16px',
  },
}));

export const Title = styled.div<{
  marginBottom?: number;
  isLight: boolean;
  fontSize?: string;
  responsiveMarginBottom?: number;
}>(({ marginBottom = 16, fontSize = '20px', isLight, responsiveMarginBottom }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize,
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom,
  marginTop: 64,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '24px',
    marginBottom: `${responsiveMarginBottom || marginBottom}px`,
  },
}));

export const Paragraph = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '16px',
  },
}));

const TableWrapper = styled.div({
  maxWidth: '928px',
  width: '100%',
  margin: '0 auto',
});
