import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ReserveCardMobileSkeletonProps {
  isGroup: boolean;
}

const ReserveCardMobileSkeleton: React.FC<ReserveCardMobileSkeletonProps> = ({ isGroup }) => {
  const { isLight } = useThemeContext();

  return (
    <Card isLight={isLight}>
      {isGroup ? (
        <TitleSkeleton isLight={isLight} />
      ) : (
        <AccountTitleContainer>
          <AccountAvatarSkeleton isLight={isLight} variant="circular" />
          <AccountInfo>
            <AccountNameSkeleton isLight={isLight} />
            <AccountAddressSkeleton isLight={isLight} />
          </AccountInfo>
        </AccountTitleContainer>
      )}

      <Content>
        <Line>
          <BaseTextSkeleton isLight={isLight} width={92} />
          <ValueContainer>
            <BaseTextSkeleton isLight={isLight} width={59} />
            <CurrencySkeleton isLight={isLight} />
          </ValueContainer>
        </Line>
        <Line>
          <BaseTextSkeleton isLight={isLight} width={40} />
          <ValueContainer>
            <BaseTextSkeleton isLight={isLight} width={10} />
            <BaseTextSkeleton isLight={isLight} width={61} />
            <CurrencySkeleton isLight={isLight} />
          </ValueContainer>
        </Line>
        <Line>
          <BaseTextSkeleton isLight={isLight} width={52} />
          <ValueContainer>
            <BaseTextSkeleton isLight={isLight} width={7} />
            <BaseTextSkeleton isLight={isLight} width={61} />
            <CurrencySkeleton isLight={isLight} />
          </ValueContainer>
        </Line>
        <Line>
          <BaseTextSkeleton isLight={isLight} width={87} />
          <ValueContainer>
            <BaseTextSkeleton isLight={isLight} width={59} />
            <CurrencySkeleton isLight={isLight} />
          </ValueContainer>
        </Line>
      </Content>
    </Card>
  );
};

export default ReserveCardMobileSkeleton;

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
  gap: 29,
  padding: '16px 24px 24px',

  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 4px 6px 0px rgba(195, 195, 195, 0.25)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

const TitleSkeleton = styled(BaseSkeleton)({
  maxWidth: 73,
  height: 14,
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Line = styled.div({
  display: 'flex',
  justifyContent: 'space-between',

  '&:nth-of-type(1), &:nth-of-type(4)': {
    paddingBottom: 4.75,
  },

  '&:nth-of-type(2), &:nth-of-type(3)': {
    padding: '8px 16px 12.75px',
    marginLeft: -16,
    marginRight: -16,
    background: 'rgba(236, 239, 249, 0.30)',
  },
});

const BaseTextSkeleton = styled(BaseSkeleton)({
  height: 12.25,
});

const ValueContainer = styled.div({
  display: 'flex',
  gap: 4,
  alignItems: 'flex-end',
});

const CurrencySkeleton = styled(BaseSkeleton)({
  height: 10.5,
  width: 23,
});

const AccountTitleContainer = styled.div({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  marginBottom: -4.75,
});

const AccountAvatarSkeleton = styled(BaseSkeleton)({
  height: 32,
  width: 32,
});

const AccountInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 9.5,
  paddingTop: 2.5,
  paddingBottom: 4.75,
});

const AccountNameSkeleton = styled(BaseSkeleton)({
  height: 14,
  width: 59,
});

const AccountAddressSkeleton = styled(BaseSkeleton)({
  height: 12.25,
  width: 99,
});
