import styled from '@emotion/styled';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import TokenIcon from '@ses/components/TokenIcon/TokenIcon';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import CurrencyItem from './CurrencyItem';
import type { MultiSelectItem, SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const CurrencyPicker: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <CustomMultiSelect
      positionRight={true}
      label={() => (
        <Label isLight={isLight}>
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
      width={129}
      withAll
      popupContainerWidth={223}
      popupContainerHeight={'fit-content'}
      listItemWidth={191}
      customAll={{
        content: 'All Currencies',
        id: 'all',
        params: { isAll: true },
        count: 0,
      }}
      customItemRender={(props: SelectItemProps) => <CurrencyItem {...props} />}
    />
  );
};

export default CurrencyPicker;

const Label = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
  lineHeight: '15px',
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: isLight ? '#231536' : 'red',
}));
