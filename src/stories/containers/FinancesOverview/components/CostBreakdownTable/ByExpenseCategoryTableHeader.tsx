import styled from '@emotion/styled';
import IconOpenModal from '@ses/components/svg/IconOpenModal';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import TableHeaderItem from './TableHeaderItem';

interface Props {
  onClick?: () => void;
}

const ByExpenseCategoryTableHeader: React.FC<Props> = ({ onClick }) => (
  <TableHeader>
    <CategoryColumn>
      <CategoryRowInsideColumn>
        Category
        <IconOpenModal onClick={onClick} />
      </CategoryRowInsideColumn>
    </CategoryColumn>

    <TotalPercentageColumn>% of total</TotalPercentageColumn>
    <TotalSpendColumn>Actuals</TotalSpendColumn>
  </TableHeader>
);

export default ByExpenseCategoryTableHeader;

const TableHeader = styled.div({
  display: 'none',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    padding: 16,
  },
});

const CategoryColumn = styled(TableHeaderItem)({
  width: '100%',
  textAlign: 'left',
});
const CategoryRowInsideColumn = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

const TotalPercentageColumn = styled(TableHeaderItem)({
  width: 240,
  minWidth: 240,
  textAlign: 'right',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 164,
    minWidth: 164,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 240,
    minWidth: 240,
    paddingRight: 32,
  },
});

const TotalSpendColumn = styled(TableHeaderItem)({
  width: 200,
  minWidth: 200,
  textAlign: 'right',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 154,
    minWidth: 154,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 200,
    minWidth: 200,
  },
});
