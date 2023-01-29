import styled from '@emotion/styled';
import ActivityTable2 from '@ses/components/cu-activity-table/cu-activity-table2';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import { SEOHead } from '../../components/seo-head/seo-head';
import { useCuActivityMvvm2 } from './cu-activity.mvvm2';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

interface CUActivityContainerProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
}

export default ({ coreUnit, coreUnits }: CUActivityContainerProps) => {
  const { isLight, columns, onSortClick, activities, hasMoreElements, isLoadingMore, loadMore } = useCuActivityMvvm2(
    coreUnit.id
  );
  return (
    <Wrapper>
      <SEOHead
        title={`${coreUnit.name} Core Unit | Activity Feed`}
        description={`Learn about the ${coreUnit.name} Core Unit's activity: updates to Core Unit Expense Reports, FTEs, and more.`}
        image={coreUnit.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={coreUnit.image ? 'summary' : 'summary_large_image'}
      />
      <CoreUnitSummary coreUnits={coreUnits} trailingAddress={['Activity Feed']} breadcrumbTitle="Activity Feed" />
      <Container isLight={isLight}>
        <InnerPage>
          <TableWrapper>
            <ActivityTable2
              columns={columns}
              shortCode={coreUnit.shortCode}
              isGlobal={false}
              sortClick={onSortClick}
              activities={activities}
              loadMore={loadMore}
              hasMoreElements={hasMoreElements}
              isLoadingMore={isLoadingMore}
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

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
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

const InnerPage = styled.div({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
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
});

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
