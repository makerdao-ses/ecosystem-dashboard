import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

const ConditionalWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ContainerTable>{children}</ContainerTable>
);
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
