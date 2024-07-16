import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import AccordionArrow from '../../AccordionArrow/AccordionArrow';
import { BaseSkeleton } from '../../BaseSkeleton/BaseSkeleton';

const ExpensesComparisonRowCardSkeleton: React.FC = () => (
  <CardsContainer>
    <ExpandedCard>
      <DateSkeleton />
      <PairContainer>
        <ReportedLabelSkeleton />
        <ReportedValueSkeleton />
      </PairContainer>
      <NetExpenseLabelSkeleton />

      <BorderedContainer>
        <Item paddingBottom={3}>
          <LabelContainer>
            <OnchainLabelSkeleton />
            <IconSkeleton />
          </LabelContainer>
          <OnchainValueSkeleton />
        </Item>
        <Item marginTop={4}>
          <OnchainDifferenceLabelSkeleton />
          <OnchainDifferenceValueSkeleton />
        </Item>

        <Divider />

        <Item paddingBottom={3}>
          <LabelContainer>
            <OffChainLabelSkeleton />
            <IconSkeleton />
          </LabelContainer>
          <OffChainValueSkeleton />
        </Item>
        <Item marginTop={4}>
          <OffChainDifferenceLabelSkeleton />
          <OffChainDifferenceValueSkeleton />
        </Item>
      </BorderedContainer>
    </ExpandedCard>

    <CollapsedCard>
      <CollapsedCardTextSkeleton width={82} />
      <AccordionArrow />
    </CollapsedCard>
    <CollapsedCard>
      <CollapsedCardTextSkeleton width={82} />
      <AccordionArrow />
    </CollapsedCard>
    <CollapsedCard>
      <CollapsedCardTextSkeleton width={156} />
      <AccordionArrow />
    </CollapsedCard>
  </CardsContainer>
);

export default ExpensesComparisonRowCardSkeleton;

const CardsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 24,
});

const ExpandedCard = styled(Card)({
  padding: '8px 16px',
});

const CollapsedCard = styled(Card)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: 8,
  padding: '10.5px 8px',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
  },
}));

const CollapsedCardTextSkeleton = styled(BaseSkeleton)({
  height: 17,
});

const DateSkeleton = styled(BaseSkeleton)({
  width: 71,
  height: 22,
  marginBottom: 8,
});

const BorderedContainer = styled('div')(({ theme }) => ({
  margin: '0 -8px',
  padding: '9px 0px 7px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,

  '& > div:nth-of-type(1), & > div:nth-of-type(4)': {
    borderBottom: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
    }`,
  },
}));

const PairContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Item = styled('div')<{ marginTop?: number; paddingBottom?: number }>(
  ({ theme, marginTop = 0, paddingBottom = 0 }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 8px ${paddingBottom}px`,
    marginTop,

    '& > div': {
      whiteSpace: 'nowrap',
    },

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
    },
  })
);

const ReportedLabelSkeleton = styled(BaseSkeleton)({
  width: 135,
  height: 24,
});

const ReportedValueSkeleton = styled(BaseSkeleton)({
  width: 105,
  height: 22,
});

const NetExpenseLabelSkeleton = styled(BaseSkeleton)({
  width: 177,
  height: 22,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 8,
  marginBottom: 8,
});

const OnchainLabelSkeleton = styled(BaseSkeleton)({
  width: 113,
  height: 24,
});

const OnchainValueSkeleton = styled(BaseSkeleton)({
  width: 108,
  height: 22,
});

const OnchainDifferenceLabelSkeleton = styled(BaseSkeleton)({
  width: 87,
  height: 24,
});

const OnchainDifferenceValueSkeleton = styled(BaseSkeleton)({
  width: 40,
  height: 22,
});

const LabelContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

const IconSkeleton = styled(BaseSkeleton)({
  width: 16,
  height: 16,
});

const Divider = styled('div')(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,
  margin: '3px 0 6px',
}));

const OffChainLabelSkeleton = styled(BaseSkeleton)({
  width: 147,
  height: 24,
});

const OffChainValueSkeleton = styled(BaseSkeleton)({
  width: 108,
  height: 22,
});

const OffChainDifferenceLabelSkeleton = styled(BaseSkeleton)({
  width: 87,
  height: 24,
});

const OffChainDifferenceValueSkeleton = styled(BaseSkeleton)({
  width: 50,
  height: 22,
});
