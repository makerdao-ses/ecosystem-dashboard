import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import AccountsSnapshotTabContainer from '@/components/AccountsSnapshot/AccountsSnapshotTabContainer';
import BudgetStatementPager from '@/components/BudgetStatement/BudgetStatementPager/BudgetStatementPager';
import type { SnapshotLimitPeriods } from '@/core/hooks/useBudgetStatementPager';
import type { ResourceType } from '@/core/models/interfaces/types';
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
    seo,
    breadcrumbItems,
    links,
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
        title={seo.title}
        description={seo.description}
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
        links={links}
        breadcrumbItems={breadcrumbItems}
      />

      <ContainerInside marginTop={height}>
        <BudgetStatementPager
          currentMonth={currentMonth}
          handleNext={handleNextMonth}
          handlePrevious={handlePreviousMonth}
          hasNext={hasNextMonth()}
          hasPrevious={hasPreviousMonth()}
          showExpenseReportStatusCTA={false}
          lastUpdate={snapshotCreated}
        />

        <Wrapper>
          <AccountsSnapshotTabContainer
            snapshotOwner={name}
            currentMonth={currentMonth}
            ownerId={null}
            longCode={code}
            shortCode={code}
            resource={ownerType as unknown as ResourceType}
            setSnapshotCreated={setSnapshotCreated}
          />
        </Wrapper>
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
    marginTop: 61 + marginTop,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 61 + marginTop,
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

const Wrapper = styled('div')(({ theme }) => ({
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 32,
  },
}));
