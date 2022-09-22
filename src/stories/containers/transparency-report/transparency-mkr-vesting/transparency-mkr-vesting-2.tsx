import React from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomPopover } from '../../../components/custom-popover/custom-popover';
import { useTransparencyMkrVesting2 } from './transparency-mkr-vesting-2.mvvm';
import { AdvancedInnerTable } from '../../../components/advanced-inner-table/advanced-inner-table';
import { Title } from '../transparency-report';
import { LinkDescription } from '../transparency-actuals/transparency-actuals-2';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { formatCode } from '../../../../core/utils/string.utils';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';

interface TransparencyMkrVestingProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
}

export const TransparencyMkrVesting2 = (props: TransparencyMkrVestingProps) => {
  const { mainTableItems, mainTableColumns, FTEs } = useTransparencyMkrVesting2(
    props.currentMonth,
    props.budgetStatements
  );
  const isLight = useThemeContext().themeMode === 'light';

  return (
    <Container>
      <LinkDescription isLight={isLight}>
        To see the onchain transactions from the Maker Protocol to the {formatCode(props.code)} Core Unit
        <CustomLink
          href={`${MAKER_BURN_LINK}/${props.code}`}
          style={{
            flexWrap: 'wrap',
            color: '#447AFB',
            letterSpacing: '0.3px',
            lineHeight: '18px',
            marginBottom: '16px',
            marginLeft: '4px',
            whiteSpace: 'break-spaces',
            display: 'inline-block',
          }}
          fontSize={16}
          fontWeight={500}
          iconWidth={10}
          iconHeight={10}
          marginLeft="7px"
        >
          visit makerburn.com
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
      <AdvancedInnerTable columns={mainTableColumns} items={mainTableItems} />
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
