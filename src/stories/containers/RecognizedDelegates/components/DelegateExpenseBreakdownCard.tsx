import styled from '@emotion/styled';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import ArrowLink from '@ses/components/svg/ArrowLink';
import ClipBoard from '@ses/components/svg/ClipBoard';
import { getLinksFromRecognizedDelegates } from '@ses/core/businessLogic/reconizedDelegate';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import { formatAddressForOutput } from '@ses/core/utils/string';
import React from 'react';
import { DelegateSocialDtoLinks } from '../DelegateExpenseBreakdown/DelegateSocialLink';
import DelegateBarPercentTotal from './DelegateBarPercentTotal';
import GenericDelegateCard from './GenericDelegateCard';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  delegateCard: RecognizedDelegatesDto;
  totalDai: number;
}

const DelegateExpenseBreakdownCard: React.FC<Props> = ({ delegateCard, totalDai }) => {
  const { isLight } = useThemeContext();
  const percent = percentageRespectTo(delegateCard.numberDai, totalDai);
  const humanizeTotal = usLocalizedNumber(totalDai);
  return (
    <ExtendedGenericDelegate isLight={isLight}>
      <AvatarSection>
        <WalletAvatar>
          <CircleAvatarExtended
            isLight={isLight}
            width="48px"
            height="48px"
            name={delegateCard.name || 'Wallet'}
            image={delegateCard.image}
          />
          <NameAddressColumn>
            <Name isLight={isLight}>{delegateCard.name}</Name>
            <ClipBoardRow>
              <Address>{formatAddressForOutput(delegateCard.latestVotingContract)}</Address>
              <ClipBoardContainer>
                <ClipBoard />
              </ClipBoardContainer>
            </ClipBoardRow>
          </NameAddressColumn>
        </WalletAvatar>
        <WalletLink>
          <ArrowLink fill={'#447AFB'} href={delegateCard.latestVotingContract} />
        </WalletLink>
      </AvatarSection>
      <DescriptionSection>
        <ContainerBar>
          <PercentTitle isLight={isLight}>% of Total</PercentTitle>
          <PercentBarContainer>
            <ContainerBarDelegate>
              <DelegateBarPercentTotal numberDai={delegateCard.numberDai} totalDai={totalDai} />
            </ContainerBarDelegate>
            <PercentNumber isLight={isLight}>{Math.trunc(percent || 0)}%</PercentNumber>
          </PercentBarContainer>
        </ContainerBar>
        <ContainerTotal>
          <TotalTitle isLight={isLight}>Total DAI Comp</TotalTitle>
          <Total isLight={isLight}>
            {humanizeTotal}
            <span>DAI</span>
          </Total>
        </ContainerTotal>
      </DescriptionSection>
      {delegateCard.socials && (
        <SocialIconsSection>
          <DelegateSocialDtoLinks links={getLinksFromRecognizedDelegates(delegateCard)} fillDark="#ADAFD4" />
        </SocialIconsSection>
      )}
    </ExtendedGenericDelegate>
  );
};

export default DelegateExpenseBreakdownCard;
const ExtendedGenericDelegate = styled(GenericDelegateCard)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : 'box-shadow: 0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  height: 182,
}));

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

const Name = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const Address = styled.div({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#447AFB',
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

const PercentTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: isLight ? '#708390' : '#405361',
  marginBottom: 8,
}));

const ContainerTotal = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 1,
});

const TotalTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: isLight ? '#708390' : '#405361',
  textAlign: 'end',
}));
const Total = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '17px',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 8,
  '& > span': {
    fontWeight: 600,
    color: '#9FAFB9',
    marginLeft: 4,
  },
}));

const PercentBarContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: -1,
});

const PercentNumber = styled.div<WithIsLight>(({ isLight }) => ({
  width: 34,
  height: 15,
  alignItems: 'center',
  fontWeight: 300,
  fontSize: '12px',
  lineHeight: '15px',

  textAlign: 'right',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 1,
}));

const SocialIconsSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  margin: '0 auto',
});

const ContainerBarDelegate = styled.div({
  marginRight: 4,
  width: 140,
});

const CircleAvatarExtended = styled(CircleAvatar)<WithIsLight>(({ isLight }) => ({
  boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 4px 7px rgba(26, 171, 155, 0.25)',
}));

const ClipBoardRow = styled.div({
  display: 'flex',
  marginTop: 4,
  flexDirection: 'row',
  alignItems: 'center',
});

const ClipBoardContainer = styled.div({
  marginLeft: 16,
  display: 'flex',
  alignItems: 'center',
});
