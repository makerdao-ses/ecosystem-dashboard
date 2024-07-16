import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import AccordionArrow from '../AccordionArrow/AccordionArrow';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';

interface ReserveCardMobileSkeletonProps {
  isGroup: boolean;
}

const ReserveCardMobileSkeleton: React.FC<ReserveCardMobileSkeletonProps> = ({ isGroup }) => (
  <CardReserve>
    <CardHeader>
      {isGroup ? (
        <TitleSkeleton />
      ) : (
        <AccountTitleContainer>
          <AccountAvatarSkeleton />
          <AccountInfo>
            <AccountNameWrapper>
              <AccountNameSkeleton />
              <AccountNameIconSkeleton />
            </AccountNameWrapper>
            <AccountAddressWrapper>
              <AccountAddressSkeleton />
              <AccountAddressCopySkeleton />
            </AccountAddressWrapper>
          </AccountInfo>
        </AccountTitleContainer>
      )}

      <AccordionArrow />
    </CardHeader>

    <Content>
      <Line>
        <BaseLabelSkeleton width={80} />
        <ValueContainer>
          <BaseTextSkeleton width={57} />
          <CurrencySkeleton />
        </ValueContainer>
      </Line>
      <Line>
        <BaseLabelSkeleton width={35} />
        <ValueContainer>
          <BaseTextSkeleton width={60} />
          <CurrencySkeleton />
        </ValueContainer>
      </Line>
      <Line>
        <BaseLabelSkeleton width={46} />
        <ValueContainer>
          <BaseTextSkeleton width={60} />
          <CurrencySkeleton />
        </ValueContainer>
      </Line>
      <Line>
        <BaseLabelSkeleton width={75} />
        <ValueContainer>
          <BaseTextSkeleton width={57} />
          <CurrencySkeleton />
        </ValueContainer>
      </Line>
    </Content>
  </CardReserve>
);

export default ReserveCardMobileSkeleton;

const CardReserve = styled(Card)(() => ({
  gap: 16,
  padding: '16px 24px 24px',
}));

const CardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
  },
}));

const TitleSkeleton = styled(BaseSkeleton)({
  maxWidth: 96,
  height: 22,
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Line = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '&:nth-of-type(1), &:nth-of-type(4)': {
    paddingBottom: 4.75,
  },

  '&:nth-of-type(2), &:nth-of-type(3)': {
    padding: '8px 16px',
    marginLeft: -16,
    marginRight: -16,
    borderRadius: 8,
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  },
}));

const BaseLabelSkeleton = styled(BaseSkeleton)({
  height: 18,
});

const BaseTextSkeleton = styled(BaseSkeleton)({
  height: 22,
});

const ValueContainer = styled('div')({
  display: 'flex',
  gap: 4,
  alignItems: 'flex-end',
});

const CurrencySkeleton = styled(BaseSkeleton)({
  width: 20,
  height: 18,
});

const AccountTitleContainer = styled('div')({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});

const AccountAvatarSkeleton = styled(BaseSkeleton)({
  borderRadius: 8,
  height: 32,
  width: 32,
});

const AccountInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

const AccountNameWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const AccountNameSkeleton = styled(BaseSkeleton)({
  width: 51,
  height: 22,
});

const AccountNameIconSkeleton = styled(BaseSkeleton)(() => ({
  width: 16,
  height: 16,
}));

const AccountAddressWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}));

const AccountAddressSkeleton = styled(BaseSkeleton)({
  width: 86,
  height: 18,
});

const AccountAddressCopySkeleton = styled(BaseSkeleton)(() => ({
  width: 16,
  height: 16,
}));
