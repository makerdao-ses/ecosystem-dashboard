/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import ArrowLink from '@ses/components/svg/ArrowLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import React from 'react';
import { DelegateSocialLinks } from '../DelegateExpenseBreakdown/DelegateSocialLink';
import DelegateBarPercentTotal from './DelegateBarPercentTotal';
import GenericDelegateCard from './GenericDelegateCard';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';
import type { DelegateDataCard } from '@ses/core/utils/typesHelpers';

interface Props {
  delegateCard: DelegateDataCard;
  totalDai: number;
}

const DelegateExpenseBreakdownCard: React.FC<Props> = ({ delegateCard, totalDai }) => {
  const percent = (delegateCard.numberDai * 100) / totalDai;
  const { isLight } = useThemeContext();
  return (
    <ExtendedGenericDelegate>
      <AvatarSection>
        <WalletAvatar>
          <CircleAvatar
            width="48px"
            height="48px"
            name={delegateCard.walletName || 'Wallet'}
            image={delegateCard.imageUrl}
            style={{
              boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 4px 7px rgba(26, 171, 155, 0.25)',
            }}
          />
          <NameAddressColumn>
            <Name>{delegateCard.walletName}</Name>
            <Address>{delegateCard.address}</Address>
          </NameAddressColumn>
        </WalletAvatar>
        <WalletLink>
          <ArrowLink fill={isLight ? '#447AFB' : '#626472'} href={delegateCard.address} />
        </WalletLink>
      </AvatarSection>
      <DescriptionSection>
        <ContainerBar>
          <PercentTitle>% of Total</PercentTitle>
          <PercentBarContainer>
            <div
              style={{
                marginRight: 4,
                width: 140,
              }}
            >
              <DelegateBarPercentTotal numberDai={delegateCard.numberDai} totalDai={totalDai} />
            </div>
            <PercentNumber>{Math.trunc(percent || 0)}</PercentNumber>
          </PercentBarContainer>
        </ContainerBar>
        <ContainerTotal>
          <TotalTitle>Total DAI Comp</TotalTitle>
          <Total>
            227,878 <span>DAI</span>
          </Total>
        </ContainerTotal>
      </DescriptionSection>
      {delegateCard.links && (
        <SocialIconsSection>
          <DelegateSocialLinks links={delegateCard.links} fillDark="#ADAFD4" />
        </SocialIconsSection>
      )}
    </ExtendedGenericDelegate>
  );
};

export default DelegateExpenseBreakdownCard;
const ExtendedGenericDelegate = styled(GenericDelegateCard)({
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  maxWidth: 343,
});

const AvatarSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 24,
});

const WalletAvatar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const NameAddressColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 8,
});

const Name = styled.div({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: '#231536',
});

const Address = styled.div({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#447AFB',
  marginTop: 4,
});

const WalletLink = styled.div({
  marginRight: 4,
  marginTop: 5,
});

const DescriptionSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 24,
  marginLeft: 8,
  marginRight: 8,
  marginTop: 1,
});
const ContainerBar = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const PercentTitle = styled.div({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#708390',
  marginBottom: 8,
});

const ContainerTotal = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 1,
});

const TotalTitle = styled.div({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#708390',
  textAlign: 'end',
});
const Total = styled.div({
  display: 'flex',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '17px',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#231536',
  marginTop: 8,
  '& > span': {
    fontWeight: 600,
    color: '#9FAFB9',
    marginLeft: 4,
  },
});

const PercentBarContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 0.5,
});

const PercentNumber = styled.div({
  width: 34,
  height: 15,
  alignItems: 'center',
  fontWeight: 300,
  fontSize: '12px',
  lineHeight: '15px',

  textAlign: 'right',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#231536',
  marginTop: 1,
});

const SocialIconsSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  margin: '0 auto',
});
