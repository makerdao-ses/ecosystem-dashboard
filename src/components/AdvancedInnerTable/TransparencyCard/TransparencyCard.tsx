import { styled } from '@mui/material';
import React from 'react';
import type { CardSpacingSize } from '@/stories/components/AdvancedInnerTable/types';

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

export const TransparencyCard: React.FC<Props> = ({ cardSpacingSize = 'large', ...props }) => (
  <Container
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
            <Label hasIcon={header === 'Target Balance'} isTotal={totalsStyle}>
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
          {props.separators?.[i] && <ContainerLine />}
        </>
      );
    })}

    {props.footer && <FooterWrapper>{props.footer}</FooterWrapper>}
  </Container>
);

const Container = styled('div')<{ spacing: CardSpacingSize }>(({ theme, spacing }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  padding: spacing === 'large' ? '20px 24px 10px' : '16px 16px 6px',
  marginBottom: spacing === 'large' ? 24 : 8,
  borderRadius: '12px',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    ':last-child': {
      marginBottom: '0px',
    },
  },
}));

const HeaderWrapper = styled('div')({
  margin: '-16px 0 0 -16px',
});

const FooterWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderTop: theme.palette.isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  marginTop: '16px',
  padding: '8px 0 0',
}));

const Row = styled('div')<{ hasIcon?: boolean; height?: string }>(({ hasIcon = false, theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: hasIcon ? 'space-between' : undefined,
  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));

const Label = styled('div')<{ hasIcon?: boolean; height?: string; isTotal: boolean }>(
  ({ hasIcon = false, isTotal, theme }) => ({
    display: 'flex',

    alignItems: hasIcon ? 'flex-start' : 'center',
    color: theme.palette.isLight ? (isTotal ? '#434358' : '#708390') : isTotal ? '#9FAFB9' : '#708390',
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

const ContainerLine = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
  marginBottom: 20,
  marginTop: 20,
}));
