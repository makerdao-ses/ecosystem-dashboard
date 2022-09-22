import React, { useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import { Close } from '../svg/close';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { CustomLink } from '../custom-link/custom-link';
import menuItems from '../header/menu-items';
import Link from 'next/link';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface TopBarSelectProps {
  selectedOption: JSX.Element | string;
}

export const TopBarSelect = (props: TopBarSelectProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [popup, setPopup] = useState(false);
  const togglePopup = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('body').style.overflow = popup ? 'auto' : 'hidden';
    setPopup(!popup);
  };

  return (
    <>
      <Button onClick={togglePopup} isLight={isLight}>
        {props.selectedOption}{' '}
        <SelectChevronDown style={{ marginLeft: '11px' }} fill={isLight ? '#1AAB9B' : '#2DC1B1'} />
      </Button>
      {popup && (
        <Popup isLight={isLight}>
          <Close
            onClick={togglePopup}
            style={{
              alignSelf: 'flex-end',
              marginBottom: '22px',
              cursor: 'pointer',
            }}
          />
          {menuItems.map((item) => (
            <LinkWrapper isLight={isLight} key={item.title} onClick={() => setPopup(false)}>
              <Link href={item.link}>{item.title}</Link>
            </LinkWrapper>
          ))}
          <Link
            href={HOW_TO_SUBMIT_EXPENSES}
            target="_blank"
            style={{
              background: 'white',
              borderColor: '#D4D9E1',
            }}
          >
            <CustomLink
              border={isLight ? 'blue' : 'red'}
              padding={isLight ? '40px' : '16px 64px'}
              children="How to Submit Expenses"
              fontWeight={500}
              fontSize={16}
              href={HOW_TO_SUBMIT_EXPENSES}
              style={{
                fontFamily: 'SF Pro Display, sans serif',
                color: '#447AFB',
                fontStyle: 'normal',
                lineHeight: '19px',
                letterSpacing: '0.3px',
                borderRadius: '6px',
                marginLeft: '0px',
                border: isLight ? 'none' : '1px solid #1E2C37',
              }}
              marginLeft="7px"
              withArrow
              iconHeight={10}
              iconWidth={10}
            />
          </Link>
        </Popup>
      )}
    </>
  );
};

const Button = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  height: '35px',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #343442',
  borderRadius: '22px',
  background: isLight ? 'white' : '#10191F',
  transition: 'all .3s ease',
  padding: '8px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  color: isLight ? '#1AAB9B' : '#2DC1B1',
  fontSize: '16px',
  lineHeight: '19px',
  '&:hover:not(:disabled)': {
    borderColor: '#231536',
  },
  '.disabled': {
    color: '#9FAFB9',
  },
}));

const Popup = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  padding: '22px',
  background: isLight ? 'white' : '#000A13',
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 5,
  '@media (min-width: 1194px)': {
    display: 'none',
  },
}));

const LinkWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: isLight ? '#E7FCFA' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
  border: isLight ? '1px solid #139D8D' : '1px solid #06554C',
  borderRadius: '6px',
  width: '100%',
  maxWidth: '326px',
  height: '52px',
  fontWeight: 700,
  fontSize: '16px',
  color: isLight ? '#1AAB9B' : '#2DC1B1',
  boxSizing: 'border-box',
  boxShadow: isLight ? 'none' : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
}));
