import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { SEOHead } from '../../components/seo-head/seo-head';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import lightTheme from '../../../../styles/theme/light';
import ActivityTable, { ActivityTableHeader } from '../../components/cu-activity-table/cu-activity-table';
import { Button, Divider } from '@mui/material';

interface CUActivityContainerProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
}

export default ({ coreUnit, coreUnits }: CUActivityContainerProps) => {
  const isLight = useThemeContext().themeMode === 'light';

  const elements = [
    {
      id: 1,
      date: 1663788830325,
      details:
        'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).',
    },
    {
      id: 2,
      date: 1663270393246,
      details: 'This subproposal aims to allocate 81,000 DAI to the Ambassador Program.',
    },
    {
      type: 1,
    },
    {
      id: 3,
      date: 1673270393246,
      details: 'Lower dedication of 1 F/E for the next 6 months.',
    },
  ];

  const columns = [
    {
      header: 'Timestamp',
      styles: {
        [lightTheme.breakpoints.up('table_834')]: {
          width: 262,
          paddingLeft: 32,
          paddingRight: 14,
        },
        [lightTheme.breakpoints.up('desktop_1194')]: {
          width: 339,
          paddingLeft: 64,
          paddingRight: 14,
        },
      },
    },
    {
      header: 'Details',
    },
  ] as ActivityTableHeader[];

  return (
    <Wrapper>
      <SEOHead
        title={`${coreUnit.name} Core Unit | Activity Feed`}
        description={`Learn about the ${coreUnit.name} Core Unit at MakerDAO: their finances, expense reports, and more.`}
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
            <ActivityTable columns={columns} changes={elements} />

            <ButtonContainer>
              <DividerStyle
                sx={{
                  bgcolor: isLight ? '#D4D9E1' : '#405361',
                }}
              />
              <StyledBigButton isLight={isLight} title={'See Previous Activity'} onClick={() => null}>
                See Previous Activity
              </StyledBigButton>
              <DividerStyle
                sx={{
                  bgcolor: isLight ? '#D4D9E1' : '#405361',
                }}
              />
            </ButtonContainer>
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

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingBottom: '84px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingBottom: '100px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingBottom: '93px',
  },

  [lightTheme.breakpoints.up('desktop_1920')]: {
    paddingBottom: '30px',
  },
}));

const InnerPage = styled.div({
  display: 'block',
  margin: '24px auto 0',
  width: '100%',
  maxWidth: '1184px',
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

const Paragraph = styled.p<{ isLight: boolean }>(({ isLight }) => ({
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
}));

const TableWrapper = styled.div({
  maxWidth: '928px',
  width: '100%',
  margin: '0 auto',
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  marginTop: '64px',
});

const StyledBigButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    minWidth: '217px',
    height: '30px',
    border: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
    borderRadius: '6px',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '15px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#708390',
    padding: '8px 24px',
    letterSpacing: '1px',
    fontFamily: 'Inter, sans-serif',

    [lightTheme.breakpoints.up('table_834')]: {
      minWidth: '297px',
      padding: '8px 64px',
    },
  })
);

const DividerStyle = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  width: '100%',
  borderColor: '#D4D9E1',
});
