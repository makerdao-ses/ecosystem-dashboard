import { styled } from '@mui/material';
import { BaseSkeleton } from '../../BaseSkeleton/BaseSkeleton';

const ExpensesComparisonRowCardSkeleton: React.FC = () => (
  <CardsContainer>
    <Card>
      <DateSkeleton />
      <PairContainer>
        <ReportedLabelSkeleton />
        <ReportedValueSkeleton />
      </PairContainer>
      <NetExpenseLabelSkeleton />

      <PairContainer>
        <LabelContainer>
          <OnchainLabelSkeleton />
          <IconSkeleton variant="circular" />
        </LabelContainer>
        <OnchainValueSkeleton />
      </PairContainer>
      <PairContainer style={{ marginTop: 22 }}>
        <OnchainDifferenceLabelSkeleton />
        <OnchainDifferenceValueSkeleton />
      </PairContainer>

      <Divider />

      <PairContainer>
        <LabelContainer>
          <OffChainLabelSkeleton />
          <IconSkeleton variant="circular" />
        </LabelContainer>
        <OffChainValueSkeleton />
      </PairContainer>
      <PairContainer style={{ marginTop: 22 }}>
        <OffChainDifferenceLabelSkeleton />
        <OffChainDifferenceValueSkeleton />
      </PairContainer>
    </Card>

    <CollapsedCard>
      <CollapsedCardTextSkeleton width={68} />
    </CollapsedCard>
    <CollapsedCard>
      <CollapsedCardTextSkeleton width={71} />
    </CollapsedCard>
    <TotalsCard>
      <CollapsedCardTextSkeleton width={103} height={12.25} />
    </TotalsCard>
  </CardsContainer>
);

export default ExpensesComparisonRowCardSkeleton;

const CardsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 20.75,
});

const BaseCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
  background: theme.palette.isLight ? '#FFFFFF' : '#10191F',
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

const Card = styled(BaseCard)({
  padding: '16px 16px 28.75px 16px',
});

const CollapsedCard = styled(BaseCard)({
  padding: '8.5px 8px 13px 16px',
});

const TotalsCard = styled(BaseCard)({
  padding: '8px 8px 12.75px 16px',
});

const CollapsedCardTextSkeleton = styled(BaseSkeleton)({
  height: 10.5,
});

const DateSkeleton = styled(BaseSkeleton)({
  width: 70,
  height: 10.5,
  marginBottom: 28.5,
});

const PairContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ReportedLabelSkeleton = styled(BaseSkeleton)({
  width: 139,
  height: 10.5,
});

const ReportedValueSkeleton = styled(BaseSkeleton)({
  width: 116,
  height: 12.25,
});

const NetExpenseLabelSkeleton = styled(BaseSkeleton)({
  width: 177,
  height: 12.25,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 20.75,
  marginBottom: 33.75,
});

const OnchainLabelSkeleton = styled(BaseSkeleton)({
  width: 111,
  height: 10.5,
});

const OnchainValueSkeleton = styled(BaseSkeleton)({
  width: 116,
  height: 12.25,
});

const OnchainDifferenceLabelSkeleton = styled(BaseSkeleton)({
  width: 83,
  height: 10.5,
});

const OnchainDifferenceValueSkeleton = styled(BaseSkeleton)({
  width: 47,
  height: 12.25,
});

const LabelContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8.78,
});

const IconSkeleton = styled(BaseSkeleton)({
  width: 15,
  height: 15,
});

const Divider = styled('div')(({ theme }) => ({
  width: 'calc(100% + 16)',
  marginLeft: -8,
  marginRight: -8,
  marginTop: 20.75,
  marginBottom: 21,
  borderTop: `1px solid ${theme.palette.isLight ? '#ECF1F3' : '#31424E'}`,
}));

const OffChainLabelSkeleton = styled(BaseSkeleton)({
  width: 156,
  height: 10.5,
});

const OffChainValueSkeleton = styled(BaseSkeleton)({
  width: 116,
  height: 12.25,
});

const OffChainDifferenceLabelSkeleton = styled(BaseSkeleton)({
  width: 83,
  height: 10.5,
});

const OffChainDifferenceValueSkeleton = styled(BaseSkeleton)({
  width: 53,
  height: 12.25,
});
