import React from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyTransferRequestMvvm2 } from './transparency-transfer-request-2.mvvm';
import { AdvancedInnerTable } from '../../../components/advanced-inner-table/advanced-inner-table';
import { LinkDescription } from '../transparency-actuals/transparency-actuals-2';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { getShortCode } from '../../../../core/utils/string.utils';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../../core/utils/const';

interface Props {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  code: string;
  longCode: string;
}

export const TransparencyTransferRequest2 = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const { mainTableColumns, mainTableItems } = useTransparencyTransferRequestMvvm2(
    props.currentMonth,
    props.budgetStatements
  );

  return (
    <Container>
      <LinkDescription isLight={isLight}>
        <span>To see the onchain transactions from the Maker Protocol to the {getShortCode(props.code)} Core Unit</span>
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
      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition={'top'}
        longCode={props.longCode}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
