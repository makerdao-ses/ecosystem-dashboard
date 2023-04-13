import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { useThemeContext } from '../../../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../../../core/utils/const';
import { getShortCode } from '../../../../../core/utils/string';
import { AdvancedInnerTable } from '../../../../components/AdvancedInnerTable/AdvancedInnerTable';
import { CustomLink } from '../../../../components/CustomLink/CustomLink';
import { Title } from '../../TransparencyReport';
import { LinkDescription } from '../TransparencyActuals/TransparencyActuals';
import MkrVestingInfo from './MkrVestingInfo';
import MkrVestingTotalFTE from './MkrVestingTotalFTE';
import { useTransparencyMkrVesting } from './useTransparencyMkrVesting';
import type { BudgetStatementDto } from '../../../../../core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

interface TransparencyMkrVestingProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyMkrVesting = (props: TransparencyMkrVestingProps) => {
  const { mainTableItems, mainTableColumns, FTEs } = useTransparencyMkrVesting(
    props.currentMonth,
    props.budgetStatements
  );
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
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
            marginBottom: isMobile ? '0px' : '32px',
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
      <MkrVestingTotalFTE totalFTE={FTEs} />

      <AdvancedInnerTable columns={mainTableColumns} items={mainTableItems} longCode={props.longCode} />
      {mainTableItems.length > 0 && (
        <MkrInfoContainer>
          <MkrVestingInfo />
        </MkrInfoContainer>
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MkrInfoContainer = styled.div({
  marginTop: 32,
  marginBottom: 90,
});
