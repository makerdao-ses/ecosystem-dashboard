import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { PeriodicSelectionFilter } from '../../utils/types';

interface Props extends React.PropsWithChildren {
  period: PeriodicSelectionFilter;
}

const ConditionalWrapper: React.FC<Props> = ({ children, period }) => {
  const Wrapper =
    period === 'Quarterly' ? <ContainerTable>{children}</ContainerTable> : <Container>{children}</Container>;
  return Wrapper;
};
export default ConditionalWrapper;
const ContainerTable = styled.div({
  paddingLeft: 16,
  paddingRight: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1184,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: 'revert',
    marginLeft: 64,
    marginRight: 64,
    justifyContent: 'center',
  },
});
