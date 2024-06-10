import styled from '@emotion/styled';
import BarPercentRelativeToTotal from '@ses/components/BarPercentRelativeToTotal/BarPercentRelativeToTotal';
import CopyIcon from '@ses/components/CopyIcon/CopyIcon';
import SocialMediaComponent from '@ses/components/SocialMediaComponent/SocialMediaComponent';
import { getLinksFromRecognizedDelegates } from '@ses/core/businessLogic/recognizedDelegate';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { deleteTwoDecimalPLace, usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import { formatAddressForOutputDelegateWallet } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import GenericDelegateCard from './GenericDelegateCard';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  delegateCard: RecognizedDelegatesDto;
  relativeValue: number;
  totalDai: number;
}

const DelegateExpenseBreakdownCard: React.FC<Props> = ({ delegateCard, relativeValue, totalDai }) => {
  const { isLight } = useThemeContext();
  const percentBarRelative = percentageRespectTo(delegateCard.actuals, totalDai) || 0;
  const humanizeTotal = usLocalizedNumber(delegateCard.actuals);

  return (
    <ExtendedGenericDelegate isLight={isLight}>
      <ContainerAvatarDescription>
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
                <Address href={`https://etherscan.io/address/${delegateCard.latestVotingContract}`} target="_blank">
                  {formatAddressForOutputDelegateWallet(delegateCard.latestVotingContract)}
                </Address>

                <ClipBoardContainer>
                  <CopyIcon text={delegateCard.latestVotingContract ?? ''} defaultTooltip="Copy Address" />
                </ClipBoardContainer>
              </ClipBoardRow>
            </NameAddressColumn>
          </WalletAvatar>
        </AvatarSection>
        <DescriptionSection>
          <ContainerBar>
            <PercentTitle isLight={isLight}>% of Total</PercentTitle>
            <PercentBarContainer>
              <ContainerBarDelegate>
                <BarPercentRelativeToTotal value={delegateCard.actuals} total={relativeValue} />
              </ContainerBarDelegate>
              <PercentNumber isLight={isLight}>
                {deleteTwoDecimalPLace(percentBarRelative.toFixed(2)) || 0}%
              </PercentNumber>
            </PercentBarContainer>
          </ContainerBar>
          <ContainerTotal>
            <TotalTitle isLight={isLight}>Total DAI Comp</TotalTitle>
            <Total isLight={isLight}>
              {humanizeTotal ?? 0}
              <span>DAI</span>
            </Total>
          </ContainerTotal>
        </DescriptionSection>
      </ContainerAvatarDescription>
      <Divider isLight={isLight} />
      <SocialIconsSection>
        {delegateCard.socials && (
          <LinkContainer>
            <SocialMediaComponent links={getLinksFromRecognizedDelegates(delegateCard)} fillDark="#ADAFD4" hasTooltip />
          </LinkContainer>
        )}
      </SocialIconsSection>
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
  [lightTheme.breakpoints.up('table_834')]: {
    padding: '0px',
    height: 136,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 80,
    flexDirection: 'row',
    padding: '16px',
    justifyContent: 'space-between',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 1312,
  },
}));

const AvatarSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 24,
  [lightTheme.breakpoints.up('table_834')]: {
    flex: 1,
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flex: 1,
    marginBottom: 0,
  },
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
  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: '16px',
    lineHeight: '22px',
  },
}));

const Address = styled.a({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#447AFB',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const DescriptionSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 24,
  marginLeft: 8,
  marginRight: 8,
  marginTop: 1,
  [lightTheme.breakpoints.up('table_834')]: {
    flex: 1,
    marginRight: 0,
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 0,
    marginRight: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 0,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: 30,
  },
});
const ContainerBar = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    flex: 1,
    marginLeft: -18,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flex: 1,
    marginLeft: 6,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: -12,
  },
});

const PercentTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: isLight ? '#708390' : '#405361',
  marginBottom: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 16,
  },
}));

const ContainerTotal = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  paddingLeft: 1,
  [lightTheme.breakpoints.up('table_834')]: {
    textAlign: 'end',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginRight: 8,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginRight: 12,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginRight: 18,
  },
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
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 14,
    '& > span': {
      fontWeight: 600,
      color: '#9FAFB9',
      marginLeft: 6,
      fontSize: '16px',
      lineHeight: '19px',
    },
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 16,
    fontSize: '16px',
    lineHeight: '19px',
    '& > span': {
      fontWeight: 600,
      color: '#9FAFB9',
      marginLeft: 6,
      fontSize: '16px',
      lineHeight: '19px',
    },
  },
}));

const PercentBarContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: -1,
});

const PercentNumber = styled.div<WithIsLight>(({ isLight }) => ({
  width: 44,
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
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: -1,
    fontFeatureSettings: 'normal',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 0,
  },
}));

const SocialIconsSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  margin: '0 auto',
  [lightTheme.breakpoints.up('table_834')]: {
    justifyContent: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
    flex: 0.4,
    justifyContent: 'flex-end',
  },
});

const ContainerBarDelegate = styled.div({
  marginRight: 4,
  width: 130,
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
  marginLeft: 20,
  display: 'flex',
  alignItems: 'center',
  '& div': {
    display: 'flex',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 6,
  },
});

const ContainerAvatarDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    padding: '16px 16px 0px 16px',
    justifyContent: 'space-between',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
    padding: '0px',

    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
});

const LinkContainer = styled.div({
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 8,
  },
});

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    borderBottom: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
    marginBottom: 8,
    marginTop: 24,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
}));
