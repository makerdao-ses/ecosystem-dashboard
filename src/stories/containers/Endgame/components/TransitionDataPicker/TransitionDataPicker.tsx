import { styled } from '@mui/material';
import React from 'react';
import FilterButtonTab from '@/components/FilterButtonTab/FilterButtonTab';
import TitleWithIconInformation from '../../../../../components/TitleWithIconInformation/TitleWithIconInformation';
import type { TransitionStatusDataShown } from '../../types';

export interface TransitionDataPickerProps {
  selected: TransitionStatusDataShown;
  handleChange: (selected: TransitionStatusDataShown) => void;
}

const TransitionDataPicker: React.FC<TransitionDataPickerProps> = ({ selected, handleChange }) => (
  <Content>
    <TitleWithIconInformationStyled
      title="Budget Transition Status"
      tooltip={"Visualizing key shifts in resource allocation and expense trends in MakerDAO's Endgame transition."}
    />
    <ContainerButtons>
      <FilterButtonTabStyled
        label={'Net Expenses On-Chain'}
        handleChange={() => handleChange('PaymentsOnChain')}
        isSelect={selected === 'PaymentsOnChain'}
      />
      <FilterButtonTabStyled
        label="Budget Cap"
        handleChange={() => handleChange('Budget')}
        isSelect={selected === 'Budget'}
      />
    </ContainerButtons>
  </Content>
);

export default TransitionDataPicker;

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const ContainerButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 6,
  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: -4,
  },
}));

const FilterButtonTabStyled = styled(FilterButtonTab)(({ theme }) => ({
  padding: '4px 16px 4px 16px',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    padding: '4px 24px  4px  24px',
  },
}));

const TitleWithIconInformationStyled = styled(TitleWithIconInformation)({
  marginTop: -4,
  '& svg': {
    marginTop: -4,
    marginLeft: 2,
  },
});
