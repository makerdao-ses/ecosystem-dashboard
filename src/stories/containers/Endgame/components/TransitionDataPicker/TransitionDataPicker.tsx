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
  gap: 6,
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
    marginTop: -2,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 'revert',
  },
}));

const FilterButtonTabStyled = styled(FilterButtonTab)(({ theme }) => ({
  padding: '4px 16px 4px 16px',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    padding: '4px 24px  4px  24px',
  },
}));

const TitleWithIconInformationStyled = styled(TitleWithIconInformation)(({ theme }) => ({
  marginTop: 0,
  '& svg': {
    marginTop: -4,
    marginLeft: 4,
  },
  [theme.breakpoints.up('tablet_768')]: {
    '& svg': {
      marginTop: -1,
      marginLeft: 7,
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: -8,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 0,
    '& svg': {
      marginTop: 0,
      marginLeft: 5,
    },
  },
}));
