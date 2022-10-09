import React from 'react';
import styled from '@emotion/styled';
import { SEOHead } from '../../components/seo-head/seo-head';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import lightTheme from '../../../../styles/theme/light';
import ActivityTable from '../../components/cu-activity-table/cu-activity-table';
import { useCuActivityMvvm } from './cu-activity.mvvm';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

interface CUActivityContainerProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
}

export default ({ coreUnit, coreUnits }: CUActivityContainerProps) => {
  const { isLight, columns, onSortClick } = useCuActivityMvvm();

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
          <Title isLight={isLight}>Activity Feed</Title>
          <Paragraph isLight={isLight}>
            The table below reflects the activity regarding the {coreUnit.shortCode} Core Unit. Here you will be able to
            see all previous modifications that the Core Unit has made to their Expense Reports, FTEs, and more.
          </Paragraph>

          <TableWrapper>
            <ActivityTable
              columns={columns}
              shortCode={coreUnit.shortCode}
              activityFeed={coreUnit.activityFeed.map((activity) => ({
                activityFeed: activity,
              }))}
              sortClick={onSortClick}
            />
          </TableWrapper>
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
  padding: '0 16px 79px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '0 32px 128px',
  },
}));

const InnerPage = styled.div({
  display: 'block',
  margin: '24px auto 0',
  width: '100%',
  maxWidth: '1312px',
  textAlign: 'left',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: '32px',
  },
});

export const Title = styled.div<{
  marginBottom?: number;
  isLight: boolean;
  fontSize?: string;
  responsiveMarginBottom?: number;
}>(({ marginBottom = 16, fontSize = '16px', isLight, responsiveMarginBottom }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize,
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: `${marginBottom}px`,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '20px',
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
  marginBottom: '48px',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '16px',
    marginBottom: '66px',
  },

  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginBottom: '64px',
  },
}));

const TableWrapper = styled.div({
  maxWidth: '928px',
  width: '100%',
  margin: '0 auto',
});
