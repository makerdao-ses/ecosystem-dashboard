import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  header: JSX.Element | string;
  headers: JSX.Element[] | string[];
  items?: JSX.Element[];
  footer?: JSX.Element | string;
  hasIcon?: boolean;
  // TODO: Type this to avoid lower and uppercase error
  itemType: string;
}

export const TransparencyCard = (props: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight}>
      <HeaderWrapper>{props.header}</HeaderWrapper>
      {props.headers.map((header, i) => (
        <>
          <Row
            key={header.toString()}
            hasIcon={header !== 'Target Balance' || (header === 'Target Balance' && props.itemType === 'total')}
          >
            <Label hasIcon={header === 'Target Balance'}>{header}</Label>
            <div
              style={{
                display: props.itemType === 'total' ? 'flex' : undefined,
                justifyContent: props.itemType ? 'flex-end' : undefined,
                width:
                  header === 'Target Balance' || (header === 'Target Balance' && props.itemType !== 'total')
                    ? '100%'
                    : undefined,
              }}
            >
              {(props.items && props.items[i]) ?? ''}
            </div>
          </Row>
          {header === 'Mthly Budget' && <ContainerLine isLight={isLight} />}
        </>
      ))}

      {props.footer && <FooterWrapper isLight={isLight}>{props.footer}</FooterWrapper>}
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: isLight ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : 'none',
  background: isLight ? 'white' : '#10191F',
  padding: '20px 24px 10px',
  marginBottom: '24px',
  borderRadius: '6px',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    ':last-child': {
      marginBottom: '0px',
    },
  },
}));

const HeaderWrapper = styled.div({
  margin: '-16px 0 0 -16px',
});

const FooterWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderTop: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  marginTop: '16px',
  padding: '8px 0 0',
}));

const Row = styled.div<{ hasIcon?: boolean; height?: string }>(({ hasIcon = false }) => ({
  display: 'flex',
  alignItems: hasIcon ? 'flex-start' : 'center',
  flex: 1,

  justifyContent: hasIcon ? 'space-between' : undefined,
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));

const Label = styled.div<{ hasIcon?: boolean; height?: string }>(({ hasIcon = false }) => ({
  display: 'flex',

  alignItems: hasIcon ? 'flex-start' : 'center',
  color: '#708390',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  height: '37px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  minWidth: 132,
}));

const ContainerLine = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flex: 1,
  borderTop: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  marginBottom: 20,
  marginTop: 20,
}));
