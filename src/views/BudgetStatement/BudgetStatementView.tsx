import { styled } from '@mui/material';
import { CustomPager } from '@ses/components/CustomPager/CustomPager';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import AccountsSnapshotTabContainer from '@/components/AccountsSnapshot/AccountsSnapshotTabContainer';
import type { SnapshotLimitPeriods } from '@/core/hooks/useBudgetStatementPager';
import type { ResourceType } from '@/core/models/interfaces/types';
import Tabs from '@/stories/components/Tabs/Tabs';
import BudgetStatementSummary from './components/BudgetStatementSummary/BudgetStatementSummary';
import useBudgetStatementView from './useBudgetStatementView';

interface BudgetStatementViewProps {
  snapshotLimitPeriods: SnapshotLimitPeriods | undefined;
}

const BudgetStatementView: React.FC<BudgetStatementViewProps> = ({ snapshotLimitPeriods }) => {
  const {
    ownerTypeQuery,
    ownerType,
    height,
    ref,
    showHeader,
    code,
    name,
    snapshotCreated,
    setSnapshotCreated,
    currentMonth,
    hasNextMonth,
    hasPreviousMonth,
    handleNextMonth,
    handlePreviousMonth,
  } = useBudgetStatementView(snapshotLimitPeriods);

  return (
    <Container>
      <SEOHead
        // TODO: change the title and description according to the ownerType
        title={'MakerDAO Recognized Delegates Expense Reports | Finances'}
        description={
          'MakerDAO Recognized Delegates Expenses Reports provides a transparent overview of recognized delegates expenses, compensations, and benefits'
        }
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
        canonicalURL={siteRoutes.budgetStatements(ownerTypeQuery)}
      />

      <BudgetStatementSummary
        ref={ref}
        showHeader={showHeader}
        code={code}
        name={name}
        breadcrumbItems={[
          {
            label: 'Finances',
            url: siteRoutes.financesOverview,
          },
          {
            label: name,
            url: siteRoutes.budgetStatements(ownerTypeQuery),
          },
        ]}
      />

      <ContainerInside marginTop={height}>
        <ContainerPagerBar>
          <PagerBar className="no-select" ref={null}>
            <PagerBarLeft>
              <StyledPagerBar
                className="styledPagerBar"
                label={currentMonth.toFormat('MMM yyyy').toUpperCase()}
                onPrev={handlePreviousMonth}
                onNext={handleNextMonth}
                hasNext={hasNextMonth()}
                hasPrevious={hasPreviousMonth()}
              />
              <ContainerExpense>
                {/* Temporarily disabled: WIP */}
                {/* <ExpenseReportStatusIndicator
                  budgetStatus={currentBudgetStatement?.status || BudgetStatus.Draft}
                  showCTA={showExpenseReportStatusCTA}
                /> */}
              </ContainerExpense>
            </PagerBarLeft>

            <Spacer />
            {snapshotCreated && (
              <LastUpdate>
                <Since>Last Update</Since>
                <SinceDate>{snapshotCreated.setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}</SinceDate>
              </LastUpdate>
            )}
          </PagerBar>
        </ContainerPagerBar>

        <TabsContainer>
          <Tabs
            tabs={[
              {
                item: 'Accounts Snapshot',
                id: 'accounts-snapshots',
              },
            ]}
            expandable={false}
            tabQuery={'section'}
          />
        </TabsContainer>

        <AccountsSnapshotTabContainer
          snapshotOwner={name}
          currentMonth={currentMonth}
          ownerId={null}
          longCode={code}
          shortCode={code}
          resource={ownerType as unknown as ResourceType}
          setSnapshotCreated={setSnapshotCreated}
        />
      </ContainerInside>
    </Container>
  );
};

export default BudgetStatementView;

const Container = styled('div')(({ theme }) => ({
  paddingTop: 64,
  width: '100%',
  backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#000000',
  backgroundImage:
    theme.palette.mode === 'light' ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const ContainerInside = styled('div')<{ marginTop: number }>(({ theme, marginTop }) => ({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  marginBottom: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 22 + marginTop,
  paddingRight: '64px',
  paddingLeft: '64px',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 45 + marginTop,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 40 + marginTop,
  },

  [theme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    paddingRight: '0px',
    paddingLeft: '0px',
  },

  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingRight: '48px',
    paddingLeft: '48px',
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },

  [theme.breakpoints.down('tablet_768')]: {
    paddingRight: '16px',
    paddingLeft: '16px',
  },
}));

const ContainerPagerBar = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: -3,
  },
}));

const TabsContainer = styled('div')(({ theme }) => ({
  margin: '32px 0 16px',

  [theme.breakpoints.up('tablet_768')]: {
    margin: '32px 0',
  },
}));

const PagerBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,
  marginTop: 2,

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    height: '34px',
    marginTop: 4,
    marginLeft: 2,
  },
}));

const PagerBarLeft = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

const StyledPagerBar = styled(CustomPager)(({ theme }) => ({
  '&.styledPagerBar': {
    'div:first-of-type': {
      gap: 24,

      [theme.breakpoints.up('tablet_768')]: {
        gap: 8,
      },
    },
    '> div:last-of-type': {
      marginLeft: 8,
      letterSpacing: 0,

      [theme.breakpoints.up('tablet_768')]: {
        letterSpacing: ' 0.4px',
      },
    },
  },
}));

const ContainerExpense = styled('div')(({ theme }) => ({
  marginTop: -2,

  'div a': {
    marginLeft: 4,

    [theme.breakpoints.up('tablet_768')]: {
      marginLeft: 8,
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: -3,
  },
}));

const Spacer = styled('div')({
  flex: '1',
});

const LastUpdate = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  fontFamily: 'Inter, sans-serif',
  marginTop: -3,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    marginRight: -2,
    marginLeft: 8,
  },
}));

const Since = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  fontSize: '11px',
  lineHeight: '15px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  letterSpacing: '0px',
  textTransform: 'uppercase',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '12px',
    letterSpacing: '1px',
  },
}));

const SinceDate = styled('div')(({ theme }) => ({
  color: '#708390',
  fontFamily: 'Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  marginTop: '2px',
  textAlign: 'right',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '12px',
    marginTop: '4px',
    letterSpacing: '1px',
  },
}));
