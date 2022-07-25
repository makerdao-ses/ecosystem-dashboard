import React, { useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import { Close } from '../svg/close';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { CustomLink } from '../custom-link/custom-link';
import menuItems from '../header/menu-items';
import Link from 'next/link';

interface TopBarSelectProps {
  selectedOption: JSX.Element | string
}

export const TopBarSelect = (props: TopBarSelectProps) => {
  const [popup, setPopup] = useState(false);

  return <>
    <Button onClick={() => setPopup(!popup)}>
      {props.selectedOption} <SelectChevronDown style={{ marginLeft: '11px' }} fill="#1AAB9B"/>
    </Button>
    {popup && <Popup>
      <Close
        onClick={() => setPopup(false)}
        style={{
          alignSelf: 'flex-end',
          marginBottom: '22px'
        }}
      />
      {menuItems.map((item) => <LinkWrapper key={item.title} onClick={() => setPopup(false)}><Link href={item.link}>{item.title}</Link></LinkWrapper>)}
      <Link
        href={HOW_TO_SUBMIT_EXPENSES}
        target="_blank"
        style={{
          background: 'white',
          borderColor: '#D4D9E1'
        }}
      >
      <CustomLink
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
          marginLeft: '0px'
        }}
        marginLeft='7px'
        withArrow
        iconHeight={10}
        iconWidth={10}
        />
      </Link>
    </Popup>}
  </>;
};

const Button = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  height: '35px',
  border: '1px solid #D4D9E1',
  borderRadius: '22px',
  background: 'white',
  transition: 'all .3s ease',
  padding: '8px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  color: '#1AAB9B',
  fontSize: '16px',
  lineHeight: '19px',
  '&:hover:not(:disabled)': {
    borderColor: '#231536'
  },
  '.disabled': {
    color: '#9FAFB9'
  }
});

const Popup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  padding: '22px',
  background: 'white',
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 5,
  '@media (min-width: 835px)': {
    display: 'none',
  }
});

const LinkWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#E7FCFA',
  border: '1px solid #139D8D',
  borderRadius: '6px',
  width: '100%',
  maxWidth: '326px',
  height: '52px',
  fontWeight: 700,
  fontSize: '16px',
  color: '#1AAB9B',
  boxSizing: 'border-box',
});
