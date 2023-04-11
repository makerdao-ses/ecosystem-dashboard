/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import ArrowLink from '@ses/components/svg/ArrowLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import React from 'react';
import GenericDelegateCard from '../GenericDelegateCard';
import DelegateBarPercentTotal from './DelegateBarPercentTotal';
import { DelegateSocialLinks } from './DelegateSocialLink';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';

interface Props {
  walletName: string;
  imageUrl: string;
  links?: LinkModel[];
}

const DelegateExpenseBreakdownCard: React.FC<Props> = ({ walletName, imageUrl, links }) => {
  const { isLight } = useThemeContext();
  return (
    <ExtendedGenericDelegate>
      <AvatarSection>
        <WalletAvatar>
          <CircleAvatar
            width="48px"
            height="48px"
            name={walletName || 'Wallet'}
            image={imageUrl}
            style={{
              boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 4px 7px rgba(26, 171, 155, 0.25)',
            }}
          />
          <NameAddressColumn>
            <Name>Flip Flop Flap Delegate LLC</Name>
            <Address>0x86914...2e02</Address>
          </NameAddressColumn>
        </WalletAvatar>
        <WalletLink>
          <ArrowLink fill={isLight ? '#447AFB' : '#626472'} />
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
              <DelegateBarPercentTotal numberDai={685} totalDai={1000} />
            </div>
            <PercentNumber>32%</PercentNumber>
          </PercentBarContainer>
        </ContainerBar>
        <ContainerTotal>
          <TotalTitle>Total DAI Comp</TotalTitle>
          <Total>
            227,878 <span>DAI</span>
          </Total>
        </ContainerTotal>
      </DescriptionSection>
      {links && (
        <SocialIconsSection>
          <DelegateSocialLinks links={links} fillDark="#ADAFD4" />
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
