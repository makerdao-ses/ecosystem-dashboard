import styled from '@emotion/styled';
import { MenuItem, Typography } from '@mui/material';
import { CustomButton } from '@ses/components/custom-button/custom-button';
import { CustomLink } from '@ses/components/custom-link/custom-link';
import { Close } from '@ses/components/svg/close';
import MoonMode from '@ses/components/svg/theme-mode';
import ToggleDarkMode from '@ses/components/svg/toggle-dark';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { HOW_TO_SUBMIT_EXPENSES } from '@ses/core/utils/const';
import React from 'react';
import ItemWebSite from './item-select/item-website';
import { itemsWebSiteLinks } from './menu-items';
import type { WebSiteLinks } from './menu-items';

export type EssentialWebsitesProps = {
  showButtons?: boolean;
  wrapItemsWithMenu?: boolean;
  handleClose?: () => void;
};

const EssentialWebsites: React.FC<EssentialWebsitesProps> = ({
  showButtons = false,
  wrapItemsWithMenu = false,
  handleClose,
}) => {
  const { isLight, toggleTheme } = useThemeContext();
  const ItemWrapper: React.FC<React.PropsWithChildren> = ({ children }) =>
    wrapItemsWithMenu ? (
      <MenuItem
        disableGutters={true}
        disableTouchRipple={true}
        sx={{
          paddingTop: '0px',
          '&:hover': {
            background: 'none',
            cursor: 'default',
          },
          '&:last-child': {
            paddingBottom: '0px',
          },
        }}
      >
        {children}
      </MenuItem>
    ) : (
      <>{children}</>
    );

  return (
    <Container>
      {showButtons && (
        <>
          <ButtonsContainer>
            <CloseWrapper>
              <Close onClick={() => handleClose?.()} />
            </CloseWrapper>
            <CustomButton
              onClick={() => toggleTheme?.()}
              style={{
                padding: '8px 18px 8px 24px',
                marginBottom: 32,
              }}
              styleText={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '18px',
                color: isLight ? '#31424E' : '#E2D8EE',

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                '& span': {
                  marginRight: 10,
                },
              }}
              label={
                <>
                  <DarkModeText isLight={isLight}>{isLight ? 'Dark Mode' : 'Light Mode'}</DarkModeText>
                  {isLight ? <MoonMode width={16} height={16} /> : <ToggleDarkMode width={16} height={16} />}
                </>
              }
            />
            <CustomButton
              style={{
                padding: '7px 24px',
              }}
              styleText={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '18px',
                color: isLight ? '#31424E' : '#E2D8EE',

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                '& span': {
                  marginRight: 10,
                },
              }}
              label={
                <CustomLink
                  children="How to Submit Expenses"
                  fontWeight={500}
                  fontSize={16}
                  href={HOW_TO_SUBMIT_EXPENSES}
                  style={{
                    fontFamily: 'Inter, sans serif',
                    color: '#447AFB',
                    fontStyle: 'normal',
                    marginLeft: '0px',
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: '18px',
                  }}
                  withArrow
                  iconHeight={10}
                  iconWidth={10}
                />
              }
            />
          </ButtonsContainer>
          <Line isLight={isLight} />
        </>
      )}
      <StyleTitle isLight={isLight}>Essential MakerDAO Governance Websites </StyleTitle>
      <StyleDescription isLight={isLight}>
        Websites to gather all relevant data and information for Maker Governance.
      </StyleDescription>
      {itemsWebSiteLinks.map((link: WebSiteLinks, i: number) => (
        <ItemWrapper key={`link-${i}`}>
          <ItemWebSite
            height={link.height}
            title={link.title || ''}
            logo={link.logo}
            background={link.background}
            color={link.color}
            fontSize={link.fontSize}
            fontWeight={link.fontWeight}
            link={link.link}
            fontFamily={link.fontFamily}
            padding={link.padding}
            subtract={link.subtract}
            description={link.description}
            letterSpacing={link.letterSpacing}
            lineHeight={link.lineHeight}
            colorDark={link.colorDark}
          />
        </ItemWrapper>
      ))}
    </Container>
  );
};

export default EssentialWebsites;

const Container = styled.div({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ButtonsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const CloseWrapper = styled.div({
  alignSelf: 'flex-end',
  marginBottom: '22px',
  cursor: 'pointer',
});

const DarkModeText = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  marginRight: '2px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#31424E' : '#D2D4EF',
}));

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  width: '100%',
  margin: '32px 0 24px',
  borderBottom: isLight ? ' 1px solid #D4D9E1' : '1px solid #405361',
}));

const StyleTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
    color: isLight ? '#231536' : '#EDEFFF',
    paddingBottom: '16px',
  })
);

const StyleDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
    color: isLight ? '#231536' : '#EDEFFF',
    paddingBottom: '24px',
    letterSpacing: '0px',
  })
);
