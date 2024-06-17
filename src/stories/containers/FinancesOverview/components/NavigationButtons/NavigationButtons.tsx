import styled from '@emotion/styled';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';

const NavigationButtons: React.FC = () => (
  <NavigationButtonsContainer>
    <Button href={siteRoutes.coreUnitsOverview} label="Core Units" buttonType={ButtonType.Primary} />
    <Button href={siteRoutes.recognizedDelegate} label="Recognized Delegates" buttonType={ButtonType.Primary} />
    <Button href={siteRoutes.ecosystemActors} label="Ecosystem Actors" buttonType={ButtonType.Primary} />
  </NavigationButtonsContainer>
);

export default NavigationButtons;

const NavigationButtonsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
  margin: '12px auto 0',
  padding: '0 22px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    padding: 0,
    margin: '46px auto 0',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'column',
    margin: '32px auto 0',
    maxWidth: 320,
    padding: 0,
    gap: 16,
  },
});

const Button = styled(LinkButton)({
  padding: '13.5px 8px',
  width: '100%',

  '& > div': {
    fontWeight: 500,
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    lineHeight: '19px',
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    minWidth: 218,
  },
});
