import styled from '@emotion/styled';
import { enablePageOverflow, getPageWrapper } from '@ses/core/utils/dom';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { CustomLink } from '../CustomLink/CustomLink';
import menuItems from '../Header/menuItems';
import { Close } from '../svg/close';
import { SelectChevronDown } from '../svg/select-chevron-down';

interface TopBarSelectProps {
  selectedOption: JSX.Element | string;
  isRoot?: boolean;
}

export const TopBarSelect: React.FC<TopBarSelectProps> = ({ isRoot = false, selectedOption }) => {
  const { isLight } = useThemeContext();
  const router = useRouter();

  const [popup, setPopup] = useState(false);
  const togglePopup = () => {
    enablePageOverflow(popup);
    setPopup(!popup);
  };

  useEffect(() => {
    setPopup(false);

    return () => {
      // restore the scroll property
      const wrapper = getPageWrapper();
      if (wrapper) {
        wrapper.style.removeProperty('overflow');
      }
    };
  }, [router.route]);

  return (
    <>
      <Button onClick={togglePopup} isLight={isLight} isRoot={isRoot}>
        {selectedOption}{' '}
        <SelectChevronDown
          style={{ marginLeft: '29px' }}
          fill={isRoot ? (isLight ? '#25273D' : '#D2D4EF') : isLight ? '#1AAB9B' : '#2DC1B1'}
        />
      </Button>
      {popup && (
        <Popup isLight={isLight}>
          <CloseWrapper onClick={togglePopup}>
            <Close
              style={{
                cursor: 'pointer',
                marginBottom: 32,
              }}
            />
          </CloseWrapper>
          {Object.values(menuItems).map((item) => {
            const isRoot = router.pathname !== '/';
            return (
              <Link href={item.link} passHref legacyBehavior>
                <LinkWrapper
                  isLight={isLight}
                  isActive={isRoot && (item.title === selectedOption || item.titleMobile === selectedOption)}
                  key={item.title}
                  onClick={item.title === selectedOption ? togglePopup : undefined}
                >
                  {item.title}
                </LinkWrapper>
              </Link>
            );
          })}
          <Link
            href={HOW_TO_SUBMIT_EXPENSES}
            target="_blank"
            style={{
              background: 'white',
              borderColor: isLight ? '#D4D9E1' : '',
            }}
            legacyBehavior
          >
            <LinkWrapper isActive={false} isLight={isLight} hasMarginBottom={false}>
              <CustomLink
                children="How to Submit Expenses"
                fontWeight={500}
                fontSize={16}
                href={HOW_TO_SUBMIT_EXPENSES}
                style={{
                  fontFamily: 'Inter, sans serif',
                  color: '#447AFB',
                  lineHeight: '18px',
                  fontStyle: 'normal',

                  letterSpacing: '0.3px',
                  borderRadius: '6px',
                  marginLeft: '0px',
                  width: 326,
                  padding: 0,
                  textAlign: 'center',

                  justifyContent: 'center',
                }}
                marginLeft="7px"
                withArrow
                iconHeight={10}
                iconWidth={10}
              />
            </LinkWrapper>
          </Link>
        </Popup>
      )}
    </>
  );
};

const CloseWrapper = styled.div({
  alignSelf: 'flex-end',
  marginBottom: '22px',
  cursor: 'pointer',
});

const Button = styled.div<{ isLight: boolean; isRoot: boolean }>(({ isLight, isRoot }) => ({
  display: 'flex',
  marginTop: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  height: '38px',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #343442',
  borderRadius: '22px',
  background: isLight ? 'white' : '#10191F',
  transition: 'all .3s ease',
  padding: '8px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  color: isRoot ? (isLight ? '#25273D' : '#D2D4EF') : isLight ? '#1AAB9B' : '#2DC1B1',
  fontSize: '16px',
  lineHeight: '19px',
  '&:hover:not(:disabled)': {
    borderColor: '#231536',
  },
  '.disabled': {
    color: '#9FAFB9',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    padding: '8px 17px',
  },
}));

const Popup = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

const LinkWrapper = styled.a<{ isLight: boolean; isActive: boolean; hasMarginBottom?: boolean }>(
  ({ isLight, isActive, hasMarginBottom = true }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isActive
      ? isLight
        ? '#E7FCFA'
        : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)'
      : 'transparent',
    border: '1px solid #139D8D',
    borderColor: isActive ? (isLight ? '#139D8D' : '#06554C') : isLight ? '#D4D9E1' : '#343442',
    borderRadius: '6px',
    width: '100%',
    maxWidth: '326px',
    height: '52px',
    fontWeight: 700,
    fontSize: '16px',
    color: isActive ? (isLight ? '#1AAB9B' : '#2DC1B1') : isLight ? '#25273D' : '#D2D4EF',
    boxSizing: 'border-box',
    boxShadow: isLight ? 'none' : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: hasMarginBottom ? 32 : 0,
  })
);
