import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CustomLink } from '../custom-link/custom-link';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ColumnSummarySkeleton } from './cu-table-column-summary-skeleton';
import { useMediaQuery } from '@mui/material';
import lightTheme from '../../../../styles/theme/light';

interface CuTableColumnSummaryProps {
  title?: string;
  imageUrl?: string;
  status?: CuStatusEnum;
  statusModified?: Date | null;
  onClick?: () => void;
  mipUrl?: string;
  code?: string;
  logoDimension?: string;
  isLoading?: boolean;
  popupChild?: JSX.Element
  style?: React.CSSProperties;
}

export const CuTableColumnSummary = ({
  logoDimension = '48px',
  isLoading = false,
  ...props
}: CuTableColumnSummaryProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const upPhone = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  return !isLoading
    ? <Container onClick={props.onClick} style={props.style}>
      <CircleContainer>
        <CustomPopover
          popupStyle={{
            padding: 0,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          title={props.popupChild}
          id={props.code || ''}>
          <CircleAvatar
            width={logoDimension}
            height={logoDimension}
            name={props.title || 'Core Unit'}
            image={props.imageUrl}
            style={{
              boxShadow: isLight
                ? '2px 4px 7px rgba(26, 171, 155, 0.25)'
                : '2px 4px 7px rgba(26, 171, 155, 0.25)',
            }}
          />
        </CustomPopover>
      </CircleContainer>
      <Content>
        <TitleWrapper>
          <Code isLight={isLight}>{props.code}</Code>
          <Title isLight={isLight}>{props.title}</Title>
        </TitleWrapper>
        <Row>
          {props.status && <StatusChip status={props.status} style={{ marginLeft: '-2px' }} />}
          {props.statusModified && (
            <CustomPopover
              id={'mouse-over-popover-goto'}
              title={'Go to MIPs Portal'}
              popupStyle={{
                color: isLight ? '#231536' : '#D2D4EF',
              }}
            >
              {props.statusModified && (
                <CustomLink
                  href={props.mipUrl}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    margin: '0 0 2px 4px',
                  }}
                  styleIcon={{
                    marginBottom: upPhone ? '6px' : '5.5px',
                  }}
                  target="_blank"
                >
                  {`SINCE ${DateTime.fromJSDate(props.statusModified)
                    .toFormat('d-MMM-y')
                    .toUpperCase()}`}
                </CustomLink>
              )}
            </CustomPopover>
          )}
        </Row>
      </Content>
    </Container>
    : <ColumnSummarySkeleton />;
};

const Container = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'stretch',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '@media (min-width: 834px)': {
    padding: '24px 0',
  },
  '@media (min-width: 1180px)': {
    padding: '24px 16px',
  },
});

const CircleContainer = styled.div({
  marginRight: '8px',
  '@media (min-width: 834px)': {
    marginRight: '16px',
  },
});

const Content = styled.section({
  display: 'flex',
  flexDirection: 'column',
});

const Code = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',
  marginRight: '5px',
  whiteSpace: 'nowrap',
}));

const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Title = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontSize: '16px',
  alignItems: 'center',
  fontWeight: 400,
  color: isLight ? '#231536' : '#FFFFFF',
  lineHeight: '19px',
  whiteSpace: 'nowrap',
  // marginBottom: '2px',
}));

const Row = styled.section({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginTop: '7px',
});
