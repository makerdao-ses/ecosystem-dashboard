import { styled, useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import TokenIcon from '@ses/components/TokenIcon/TokenIcon';
import React from 'react';
import CurrencyItem from './CurrencyItem';
import type { Theme } from '@mui/material';
import type { MultiSelectItem, SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

const CurrencyPicker: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('table_834'));

  return (
    <PickerWrapper>
      <CustomMultiSelect
        positionRight={true}
        label={() => (
          <Label>
            <TokenIcon token="DAI" size={32} /> DAI
          </Label>
        )}
        activeItems={[]}
        items={
          [
            {
              id: 'DAI',
              content: 'DAI',
            },
            {
              id: 'ETH',
              content: 'ETH',
            },
            {
              id: 'MKR',
              content: 'MKR',
            },
          ] as MultiSelectItem[]
        }
        width={isMobile ? 107 : 129}
        withAll={false}
        popupContainerWidth={223}
        popupContainerHeight={'fit-content'}
        listItemWidth={191}
        customItemRender={(props: SelectItemProps) => <CurrencyItem {...props} />}
      />
    </PickerWrapper>
  );
};

export default CurrencyPicker;

const Label = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
  lineHeight: '15px',
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#231536' : 'red',
}));

const PickerWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',

  [theme.breakpoints.up('table_834')]: {
    width: 'auto',
  },

  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    paddingLeft: 90,
  },

  [theme.breakpoints.down('table_834')]: {
    '&  .no-select': {
      padding: '15px 40px 15px 2px',

      '& > div:last-of-type': {
        right: 10,
      },
    },
  },
}));
