import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';
import React, { useEffect, useMemo, useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ActivityVisitHandler } from '../../../core/utils/new-activity-handler';
import CUActivityItem from './cu-activity-item';
import Button from '@mui/material/Button';
import { SortEnum } from '../../../core/enums/sort.enum';
import ArrowUp from '../svg/arrow-up';
import ArrowDown from '../svg/arrow-down';
import sortBy from 'lodash/sortBy';
import { ActivityPlaceholder } from './cu-activity-table.placeholder';
import { ActivityFeedDto, CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { useMediaQuery } from '@mui/material';
import { useCookies } from 'react-cookie';

export interface ActivityTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
}

export interface Activity {
  activityFeed: ActivityFeedDto;
  coreUnit?: CoreUnitDto;
  isNew?: boolean;
}

export interface Props {
  columns: ActivityTableHeader[];
  activityFeed: Activity[];
  shortCode: string;
  sortClick?: (index: number) => void;
  isGlobal?: boolean;
}

const NewChangesDivider = ({ isLight, count, isGlobal }: { isLight: boolean; count: number; isGlobal?: boolean }) => (
  <ChangesButtonContainer>
    <DividerStyle
      sx={{
        bgcolor: 'transparent',
        borderColor: 'transparent',
        [lightTheme.breakpoints.up('table_834')]: {
          bgcolor: isLight ? '#F75524' : '#FF8237',
          borderColor: isLight ? '#F75524' : '#FF8237',
        },
      }}
    />
    <DividerText isLight={isLight} isGlobal={isGlobal}>
      {count} New Changes since your last visit
    </DividerText>
    <DividerStyle
      sx={{
        bgcolor: 'transparent',
        borderColor: 'transparent',
        [lightTheme.breakpoints.up('table_834')]: {
          bgcolor: isLight ? '#F75524' : '#FF8237',
          borderColor: isLight ? '#F75524' : '#FF8237',
        },
      }}
    />
  </ChangesButtonContainer>
);

export default function ActivityTable({ activityFeed, shortCode, columns, sortClick, isGlobal }: Props) {
  const [cookies] = useCookies(['darkMode', 'timestamp', 'analytics']);
  const isLight = useThemeContext().themeMode === 'light';
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const initialElements = useMemo(() => (isMobile ? 5 : 10), [isMobile]);
  const [showAllElements, setShowElements] = useState(false);
  const [noVisitedCount, setNoVisitedCount] = useState(0);
  const [extendedActivity, setExtendedActivity] = useState<Activity[]>(activityFeed);

  const handleSeePrevious = () => {
    setShowElements(true);
  };

  useEffect(() => {
    const activityHandler = new ActivityVisitHandler(shortCode, cookies.timestamp === 'true');
    let noVisited = 0;

    const _extendedActivity: Activity[] = [];

    for (const update of activityFeed) {
      const isNew = activityHandler.wasVisited(update.activityFeed);
      if (isNew) {
        noVisited++;
      }
      _extendedActivity.push({
        ...update,
        isNew,
      });
    }

    setExtendedActivity(_extendedActivity);
    setNoVisitedCount(noVisited);

    const timeout = setTimeout(() => activityHandler.visit(), 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [activityFeed]);

  const sortedActivities = useMemo(() => {
    const result = sortBy(extendedActivity, (a) => {
      return a.activityFeed.created_at;
    }).reverse();

    if (columns[0].sort === SortEnum.Asc) {
      return result.reverse();
    }
    return result;
  }, [extendedActivity, columns, activityFeed]);

  if (extendedActivity.length === 0) return <ActivityPlaceholder />;

  return (
    <>
      {noVisitedCount > 0 && (
        <DisplayOnMobileOnly style={{ marginBottom: '48px' }}>
          <NewChangesDivider isLight={isLight} count={noVisitedCount} isGlobal={isGlobal} />
        </DisplayOnMobileOnly>
      )}

      <TableHeader isLight={isLight} isGlobal={isGlobal}>
        <TableHeaderRow className="no-select">
          {columns.map((column, i) => (
            <TableHeaderTitle
              key={column.header}
              width={column.width}
              styles={column.styles}
              align={column.align ?? 'left'}
              onClick={() => column.sort !== SortEnum.Disabled && sortClick?.(i)}
            >
              {column.header}
              {column.sort !== SortEnum.Disabled && (
                <Arrows>
                  <ArrowUp fill={column.sort === SortEnum.Asc ? '#231536' : '#708390'} style={{ margin: '4px 0' }} />
                  <ArrowDown fill={column.sort === SortEnum.Desc ? '#231536' : '#708390'} />
                </Arrows>
              )}
            </TableHeaderTitle>
          ))}
        </TableHeaderRow>
      </TableHeader>

      <div>
        {sortedActivities
          ?.slice(0, showAllElements ? sortedActivities.length : initialElements)
          ?.map((update, index) => (
            <div key={`table-item-${update.activityFeed.id}`}>
              <CUActivityItem activity={update} isNew={!!update.isNew} />
              {noVisitedCount > 0 &&
                ((columns[0].sort !== SortEnum.Asc && noVisitedCount === index + 1) ||
                  (columns[0].sort === SortEnum.Asc && activityFeed.length - noVisitedCount === index + 1)) &&
                !(showAllElements ? sortedActivities.length - 1 === index : initialElements - 1 === index) && (
                  <DisplayOnTabletUp>
                    <NewChangesDivider isLight={isLight} count={noVisitedCount} />
                  </DisplayOnTabletUp>
                )}
            </div>
          ))}
      </div>

      {!showAllElements && sortedActivities.length > initialElements && (
        <ButtonContainer>
          <DividerPreviousStyle
            sx={{
              bgcolor: isLight ? '#D4D9E1' : '#405361',
            }}
          />
          <StyledBigButton
            isGlobal={isGlobal}
            isLight={isLight}
            title={`See ${columns[0].sort === SortEnum.Asc ? 'Recent' : 'Previous'} Activity`}
            onClick={handleSeePrevious}
          >
            See {columns[0].sort === SortEnum.Asc ? 'Recent' : 'Previous'} Activity
          </StyledBigButton>
          <DividerPreviousStyle
            sx={{
              bgcolor: isLight ? '#D4D9E1' : '#405361',
            }}
          />
        </ButtonContainer>
      )}
    </>
  );
}

const TableHeader = styled.div<{ isLight: boolean; isGlobal?: boolean }>(({ isLight, isGlobal }) => ({
  display: 'none',
  position: 'relative',
  zIndex: 1,
  background: isLight ? '#F7F8F9' : '#25273D',
  color: isLight ? '#231536' : '#FFFFFF',
  padding: '16px 0 14px',
  borderRadius: '6px',
  lineHeight: '22px',
  boxShadow: isLight
    ? 'inset .25px -.25px .25px .25px rgba(190, 190, 190, 0.25), 0px 20px 40px rgba(190, 190, 190, .25), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4)',

  [lightTheme.breakpoints.up(isGlobal ? 'desktop_1194' : 'table_834')]: {
    display: 'block',
  },
}));

const TableHeaderRow = styled.div({
  display: 'flex',
});

const TableHeaderTitle = styled.div<{
  width?: string;
  styles?: React.CSSProperties;
  align: 'left' | 'center' | 'right';
}>(({ width, styles, align }) => ({
  display: 'flex',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '22px',
  ...{
    textAlign: align,
    ...(width && { width }),
  },

  ...(styles || {}),
}));

const ChangesButtonContainer = styled.div({
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

const DividerText = styled.div<{ isLight: boolean; isGlobal?: boolean }>(({ isLight = true, isGlobal }) => ({
  fontFamily: 'FT Base, sans-serif',
  flex: '0 0 auto',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: isLight ? '#F75524' : '#FF8237',
  margin: '0 8px',

  [lightTheme.breakpoints.up(isGlobal ? 'desktop_1194' : 'table_834')]: {
    margin: '0 16px',
    fontWeight: 500,
    lineHeight: '14px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '0 32px',
  },
}));

const DividerStyle = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  width: '100%',
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  marginTop: '64px',
});

const StyledBigButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isLight' && prop !== 'isGlobal' })<{
  isLight: boolean;
  isGlobal?: boolean;
}>(({ isLight, isGlobal }) => ({
  minWidth: '217px',
  height: '30px',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  borderRadius: '6px',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#708390',
  padding: '8px 24px',
  letterSpacing: '1px',
  fontFamily: 'Inter, sans-serif',

  [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
    minWidth: '297px',
    padding: '8px 64px',
  },
}));

const DividerPreviousStyle = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  width: '100%',
  borderColor: '#D4D9E1',
});

const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
