import React from 'react';
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
import { CategoryChip } from '../category-chip/category-chip';

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
  hasPopup?: boolean;
  style?: React.CSSProperties;
  categories?: string[];
}

interface PopupWrapperProps {
  children: JSX.Element;
  hasPopup: boolean;
  title?: JSX.Element;
  code?: string;
}

const PopupWrapper = ({ children, title, code, hasPopup = false }: PopupWrapperProps) => {
  if (!hasPopup) {
    return children;
  }

  return (
    <CustomPopover
      popupStyle={{
        padding: 0,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      title={title}
      id={code || ''}
    >
      {children}
    </CustomPopover>
  );
};

export const CuTableColumnSummary = ({
  logoDimension = '48px',
  isLoading = false,
  hasPopup = true,
  ...props
}: CuTableColumnSummaryProps) => {
  if (isLoading) {
    return <ColumnSummarySkeleton />;
  }
  const isLight = useThemeContext().themeMode === 'light';
  const upPhone = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  return (
    <Container onClick={props.onClick} style={props.style}>
      <CircleContainer>
        <PopupWrapper
          hasPopup={hasPopup}
          code={props.code}
          title={
            <>
              <PopupSummaryWrapper>
                <CuTableColumnSummary
                  {...props}
                  hasPopup={false}
                  logoDimension={'68px'}
                  style={{
                    width: '372px',
                  }}
                />
              </PopupSummaryWrapper>
              <Padded>
                <CategoriesTitle>Categories</CategoriesTitle>
                <CategoriesRow>
                  {props.categories?.map((cat) => (
                    <CategoryChip category={cat} key={cat} />
                  ))}
                </CategoriesRow>
              </Padded>
            </>
          }
        >
          <CircleAvatar
            width={logoDimension}
            height={logoDimension}
            name={props.title || 'Core Unit'}
            image={props.imageUrl}
            style={{
              boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 4px 7px rgba(26, 171, 155, 0.25)',
            }}
          />
        </PopupWrapper>
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
                    marginBottom: upPhone ? '5.1px' : '4.5px',
                  }}
                  target="_blank"
                >
                  {`SINCE ${DateTime.fromJSDate(props.statusModified).toFormat('d-MMM-y').toUpperCase()}`}
                </CustomLink>
              )}
            </CustomPopover>
          )}
        </Row>
      </Content>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'stretch',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '@media (min-width: 834px)': {
    padding: '8px 0 16px',
  },
  '@media (min-width: 1180px)': {
    padding: '24px 16px',
  },
});

const CircleContainer = styled.div({
  marginRight: '8px',
  [lightTheme.breakpoints.up('table_834')]: {
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
  fontSize: '14px',
  alignItems: 'center',
  fontWeight: 400,
  color: isLight ? '#231536' : '#FFFFFF',
  lineHeight: '19px',
  whiteSpace: 'nowrap',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '16px',
  },
}));

const Row = styled.section({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginTop: '7px',
});

const PopupSummaryWrapper = styled.div({
  [lightTheme.breakpoints.down('table_834')]: {
    padding: '24px 16px',
  },

  [lightTheme.breakpoints.between('table_834', 1180)]: {
    padding: '0 16px',
  },
});

const Padded = styled.div({
  padding: '0 16px 16px',
});

const CategoriesTitle = styled.div({
  fontFamily: 'SF Pro Display',
  fontWeight: 400,
  fontSize: '14px',
  color: '#708390',
  marginBottom: '8px',
  lineHeight: '22px',
});

const CategoriesRow = styled.div({
  display: 'flex',
  gap: '16px',
});
