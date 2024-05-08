import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { CardSpacingSize } from '../AdvancedInnerTable/AdvancedInnerTable';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  header: JSX.Element | string;
  headers: (JSX.Element | string)[];
  items?: JSX.Element[];
  separators?: boolean[];
  footer?: JSX.Element | string;
  hasIcon?: boolean;
  // TODO: Type this to avoid lower and uppercase error
  itemType: string;
  cardSpacingSize?: CardSpacingSize;
}

export const TransparencyCard: React.FC<Props> = ({ cardSpacingSize = 'large', ...props }) => {
  const { isLight } = useThemeContext();
  return (
    <Container
      isLight={isLight}
      spacing={cardSpacingSize}
      style={{ marginTop: props.itemType === 'total' ? 24 : 0 }}
      className={`advance-table--transparency-card ${
        props.itemType === 'total' ? 'advance-table--transparency-card_total' : 'advance-table--transparency_item'
      }`}
    >
      <HeaderWrapper>{props.header}</HeaderWrapper>
      {props.headers.map((header, i) => {
        const titleReactComponent = (header as JSX.Element).props?.title || '';
        const totalsStyle = header === 'Totals' || titleReactComponent === 'Totals';

        return (
          <>
            <Row
              key={header.toString()}
              hasIcon={header !== 'Target Balance' || (header === 'Target Balance' && props.itemType === 'total')}
            >
              <Label hasIcon={header === 'Target Balance'} isTotal={totalsStyle} isLight={isLight}>
                {header}
              </Label>
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
            {props.separators?.[i] && <ContainerLine isLight={isLight} />}
          </>
        );
      })}

      {props.footer && <FooterWrapper isLight={isLight}>{props.footer}</FooterWrapper>}
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean; spacing: CardSpacingSize }>(({ isLight, spacing }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: isLight ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : 'none',
  background: isLight ? 'white' : '#10191F',
  padding: spacing === 'large' ? '20px 24px 10px' : '16px 16px 6px',
  marginBottom: spacing === 'large' ? 24 : 8,
  borderRadius: '6px',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
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
  flex: 1,
  alignItems: 'center',
  justifyContent: hasIcon ? 'space-between' : undefined,
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));

const Label = styled.div<WithIsLight & { hasIcon?: boolean; height?: string; isTotal: boolean }>(
  ({ hasIcon = false, isTotal, isLight }) => ({
    display: 'flex',

    alignItems: hasIcon ? 'flex-start' : 'center',
    color: isLight ? (isTotal ? '#434358' : '#708390') : isTotal ? '#9FAFB9' : '#708390',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '15px',
    height: '37px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    minWidth: 132,
  })
);

const ContainerLine = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flex: 1,
  borderTop: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  marginBottom: 20,
  marginTop: 20,
}));
