import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import CUActivityItem from './cu-activity-item';

export interface ActivityTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
}

export interface ActivityTableProps {
  columns: ActivityTableHeader[];
  changes: any[];
}

const NewChangesDivider = ({ isLight, count }: { isLight: boolean; count: number }) => (
  <ButtonContainer>
    <DividerStyle
      sx={{
        bgcolor: isLight ? '#F75524' : '#405361',
      }}
    />
    <DividerText>{count} New Changes since your last visit</DividerText>
    <DividerStyle
      sx={{
        bgcolor: isLight ? '#F75524' : '#405361',
      }}
    />
  </ButtonContainer>
);

export default function ActivityTable({ columns, changes }: ActivityTableProps) {
  const isLight = useThemeContext().themeMode === 'light';

  return (
    <>
      <DisplayOnMobileOnly style={{ marginBottom: '48px' }}>
        <NewChangesDivider isLight={isLight} count={2} />
      </DisplayOnMobileOnly>

      <TableHeader isLight={isLight}>
        <TableHeaderRow>
          {columns.map((column) => (
            <TableHeaderTitle
              isLight={isLight}
              width={column.width}
              styles={column.styles}
              align={column.align ?? 'left'}
            >
              {column.header}
            </TableHeaderTitle>
          ))}
        </TableHeaderRow>
      </TableHeader>
      <div>
        {changes?.map((change, index) =>
          change.type ? (
            <DisplayOnTabletUp>
              <NewChangesDivider isLight={isLight} count={index} key={`tbody-item-${index}`} />
            </DisplayOnTabletUp>
          ) : (
            <div key={`tbody-item-${index}`}>
              <CUActivityItem activity={change} isNew={true} />
            </div>
          )
        )}
      </div>
    </>
  );
}

const TableHeader = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'none',
  position: 'relative',
  zIndex: 1,
  background: isLight ? '#F7F8F9' : '#25273D',
  padding: '14px 0',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  boxShadow: isLight
    ? 'inset .25px -.25px .25px .25px rgba(190, 190, 190, 0.25), 0px 20px 40px rgba(190, 190, 190, .25), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4)',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'block',
  },
}));

const TableHeaderRow = styled.div({
  display: 'flex',
});

const TableHeaderTitle = styled.div<{ isLight: boolean; width?: string; styles?: React.CSSProperties; align: any }>(
  ({ isLight, width, styles, align }) => ({
    ...{
      textAlign: align,
      ...(width && { width }),
    },

    ...(styles || {}),
  })
);

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  margin: '32px 0',
});

const DisplayOnTabletUp = styled.div({
  display: 'none',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'block',
  },
});

const DisplayOnMobileOnly = styled.div({
  display: 'block',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const DividerText = styled.div({
  fontFamily: 'FT Base, sans-serif',
  flex: '0 0 auto',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#F75524',
  margin: '0 8px',

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '0 16px',
    fontWeight: 500,
    lineHeight: '14px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '0 32px',
  },
});

const DividerStyle = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  width: '100%',
});
