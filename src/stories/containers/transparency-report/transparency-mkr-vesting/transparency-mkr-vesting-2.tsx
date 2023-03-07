import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';
import { getShortCode } from '../../../../core/utils/string.utils';
import { AdvancedInnerTable } from '../../../components/AdvancedInnerTable/AdvancedInnerTable';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { CustomPopover } from '../../../components/custom-popover/custom-popover';
import { LinkDescription } from '../transparency-actuals/transparency-actuals-2';
import { Title } from '../transparency-report';
import { useTransparencyMkrVesting2 } from './transparency-mkr-vesting-2.mvvm';
import type { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import type { DateTime } from 'luxon';

interface TransparencyMkrVestingProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyMkrVesting2 = (props: TransparencyMkrVestingProps) => {
  const { mainTableItems, mainTableColumns, FTEs } = useTransparencyMkrVesting2(
    props.currentMonth,
    props.budgetStatements
  );
  const { isLight } = useThemeContext();

  return (
    <Container>
      <LinkDescription isLight={isLight}>
        <span> Visit makerburn.com to</span>
        <CustomLink
          href={`${MAKER_BURN_LINK}/${props.longCode}`}
          style={{
            flexWrap: 'wrap',
            color: '#447AFB',
            letterSpacing: '0.3px',
            lineHeight: '18px',
            marginBottom: '16px',
            whiteSpace: 'break-spaces',
            display: 'inline-block',
            marginLeft: 0,
          }}
          fontSize={16}
          fontWeight={500}
          iconWidth={10}
          iconHeight={10}
          marginLeft="7px"
        >
          {`view the ${getShortCode(props.code)} Core Unit on-chain transaction history`}
        </CustomLink>
      </LinkDescription>
      <Title isLight={isLight} marginBottom={24}>
        MKR Vesting Overview
      </Title>
      <ContainerPopover>
        <CustomPopover
          title={'Full-Time Equivalents'}
          id={'popover-fulltime equivalent'}
          popupStyle={{
            color: isLight ? '#231536' : '#D2D4EF',
          }}
        >
          <TotalFte isLight={isLight}>
            <span>Total FTEs</span>
            <u>{FTEs}</u>
          </TotalFte>
        </CustomPopover>
      </ContainerPopover>
      <AdvancedInnerTable columns={mainTableColumns} items={mainTableItems} longCode={props.longCode} />
      {mainTableItems.length > 0 && (
        <>
          <Text isLight={isLight} style={{ marginTop: '32px' }}>
            This Overview is based on MIP40c3-SP17, SES’ MKR Incentive Proposal.
          </Text>

          <Text isLight={isLight} style={{ marginBottom: '90px' }}>
            The Difference column indicates any changes in the MKR vesting amounts compared to last month, with the
            Reason(s) column indicating why the amounts changed. Reasons may include: New hires, FTE changes,
            Promotions, or Terminations.
          </Text>
        </>
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const TotalFte = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
  '> span': {
    marginRight: '16px',
  },
  '> u': {
    fontStyle: 'normal',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 800,
    fontSize: '22px',
    lineHeight: '27px',
    paddingBottom: '2px',
    textDecoration: 'none',
    color: isLight ? '#25273D' : '#708390',
  },
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const Text = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: '16px',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const ContainerPopover = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  cursor: 'pointer',
  marginBottom: '36px',
});
