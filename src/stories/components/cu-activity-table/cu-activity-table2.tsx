import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useAuthContext } from '../../../core/context/AuthContext';
import { useCookiesContextTracking } from '../../../core/context/CookiesContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortEnum } from '../../../core/enums/sort.enum';
import { LastVisitHandler } from '../../../core/utils/last-visit-handler';
import ArrowDown from '../svg/arrow-down';
import ArrowUp from '../svg/arrow-up';
import CUActivityItemSkeleton from './cu-activity-item.skeleton';
import CUActivityItem2 from './cu-activity-item2';
import { ActivityPlaceholder } from './cu-activity-table.placeholder';
import type { ActivityFeedDto, CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

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
  shortCode: string;
  sortClick?: (index: number) => void;
  isGlobal?: boolean;
  hasFilter?: boolean;
  clearAction?: () => void;

  activities: Activity[];
  loadMore?: () => void;
  isLoadingMore: boolean;
  hasMoreElements: boolean;
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

export default function ActivityTable2({
  columns,
  sortClick,
  hasFilter,
  clearAction,

  isGlobal,
  shortCode,
  activities,
  loadMore,
  isLoadingMore,
  hasMoreElements,
}: Props) {
  const { isLight } = useThemeContext();
  const [noVisitedCount, setNoVisitedCount] = useState(0);
  const [extendedActivity, setExtendedActivity] = useState<Activity[]>(() =>
    activities.map((activity) => ({
      ...activity,
      isNew: false,
    }))
  );
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();
  const [lastVisit, setLastVisit] = useState<DateTime | undefined>();
  const hasNoVisitedActivities = noVisitedCount > 0;

  useEffect(() => {
    const lastVisitHandler = new LastVisitHandler(`activity-visit-${shortCode || 'global'}`, permissionManager);
    const updateLastVisit = async () => {
      const newLastVisit = await lastVisitHandler.lastVisit();
      setLastVisit(newLastVisit);
    };

    updateLastVisit();
    const timeout = setTimeout(async () => isTimestampTrackingAccepted && (await lastVisitHandler.visit()), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isTimestampTrackingAccepted, permissionManager, shortCode]);

  useEffect(() => {
    let noVisited = 0;
    const _extendedActivity: Activity[] = [];

    if (lastVisit) {
      for (const update of activities) {
        const isNew = DateTime.fromISO(update.activityFeed.created_at) >= lastVisit;
        if (isNew) {
          noVisited++;
        }
        _extendedActivity.push({
          ...update,
          isNew,
        });
      }
    }

    setExtendedActivity(_extendedActivity);
    setNoVisitedCount(noVisited);
  }, [activities, lastVisit]);

  // const sortedActivities = useMemo(() => {
  //   const result = sortBy(extendedActivity, (a) => a.activityFeed.created_at).reverse();

  //   if (columns[0].sort === SortEnum.Asc) {
  //     return result.reverse();
  //   }
  //   return result;
  // }, [extendedActivity, columns]);

  if (!isLoadingMore && extendedActivity.length === 0) {
    return <ActivityPlaceholder clearAction={clearAction} hasFilter={!!hasFilter} />;
  }

  return (
    <>
      {hasNoVisitedActivities && (
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
        {extendedActivity?.map((activity, index) => (
          <div key={`table-item-${activity.activityFeed.id}`}>
            <CUActivityItem2 activity={activity} isNew={!!activity.isNew} />
            {hasNoVisitedActivities &&
              noVisitedCount < extendedActivity.length &&
              columns[0].sort !== SortEnum.Asc &&
              noVisitedCount === index + 1 && (
                <DisplayOnTabletUp>
                  <NewChangesDivider isLight={isLight} count={noVisitedCount} />
                </DisplayOnTabletUp>
              )}
          </div>
        ))}

        {(isLoadingMore || activities.length !== extendedActivity.length) && (
          <div>
            {[...Array(10)].map((_, index) => (
              <CUActivityItemSkeleton isGlobal={isGlobal} key={index} />
            ))}
          </div>
        )}
      </div>

      {!isLoadingMore && hasMoreElements && (
        <ButtonContainer>
          <DividerPreviousStyle
            sx={{
              bgcolor: isLight ? '#D4D9E1' : '#405361',
            }}
          />
          <StyledBigButton isGlobal={isGlobal} isLight={isLight} title={'See Previous Activity'} onClick={loadMore}>
            See Previous Activity
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
