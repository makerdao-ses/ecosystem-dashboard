import { styled, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import React, { useEffect, useMemo, useState } from 'react';
import theme from '../../../../styles/theme/themes';
import { useAuthContext } from '../../../core/context/AuthContext';
import { useCookiesContextTracking } from '../../../core/context/CookiesContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortEnum } from '../../../core/enums/sortEnum';
import { LastVisitHandler } from '../../../core/utils/lastVisitHandler';
import ArrowDown from '../svg/arrow-down';
import ArrowUp from '../svg/arrow-up';
import { ActivityPlaceholder } from './ActivityTablePlaceholder';
import CUActivityItem from './CUActivityItem';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { Team } from '@ses/core/models/interfaces/team';

export interface ActivityTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
}

export interface Activity {
  activityFeed: ChangeTrackingEvent;
  team?: Team;
  isNew?: boolean;
}

export interface Props {
  columns: ActivityTableHeader[];
  activityFeed: Activity[];
  shortCode: string;
  sortClick?: (index: number) => void;
  isGlobal?: boolean;
  hasFilter?: boolean;
  clearAction?: () => void;
}

const NewChangesDivider = ({ isLight, count, isGlobal }: { isLight: boolean; count: number; isGlobal?: boolean }) => (
  <ChangesButtonContainer>
    <DividerStyle
      sx={{
        bgcolor: 'transparent',
        borderColor: 'transparent',
        [theme.breakpoints.up('tablet_768')]: {
          bgcolor: isLight ? '#F75524' : '#FF8237',
          borderColor: isLight ? '#F75524' : '#FF8237',
        },
      }}
    />
    <DividerText isGlobal={isGlobal}>{count} New Changes since your last visit</DividerText>
    <DividerStyle
      sx={{
        bgcolor: 'transparent',
        borderColor: 'transparent',
        [theme.breakpoints.up('tablet_768')]: {
          bgcolor: isLight ? '#F75524' : '#FF8237',
          borderColor: isLight ? '#F75524' : '#FF8237',
        },
      }}
    />
  </ChangesButtonContainer>
);

export default function ActivityTable({
  activityFeed,
  shortCode,
  columns,
  sortClick,
  isGlobal,
  hasFilter,
  clearAction,
}: Props) {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet_768'));
  const initialElements = useMemo(() => (isMobile ? 5 : 10), [isMobile]);
  const [showAllElements, setShowElements] = useState(false);
  const [noVisitedCount, setNoVisitedCount] = useState(0);
  const [extendedActivity, setExtendedActivity] = useState<Activity[]>(activityFeed);
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();

  const handleSeePrevious = () => {
    setShowElements(true);
  };

  useEffect(() => {
    const lastVisitHandler = new LastVisitHandler(`activity-visit-${shortCode || 'global'}`, permissionManager);

    const visit = async () => {
      let noVisited = 0;
      const _extendedActivity: Activity[] = [];
      await lastVisitHandler.lastVisit();

      for (const update of activityFeed) {
        const isNew = lastVisitHandler.wasVisited(DateTime.fromISO(update.activityFeed.created_at));
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
    };

    visit();
    const timeout = setTimeout(async () => isTimestampTrackingAccepted && (await lastVisitHandler.visit()), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [activityFeed, isTimestampTrackingAccepted, permissionManager, shortCode]);

  const sortedActivities = useMemo(() => {
    const result = sortBy(extendedActivity, (a) => a.activityFeed.created_at).reverse();

    if (columns[0].sort === SortEnum.Asc) {
      return result.reverse();
    }
    return result;
  }, [extendedActivity, columns]);

  if (extendedActivity.length === 0) return <ActivityPlaceholder clearAction={clearAction} hasFilter={!!hasFilter} />;

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

const TableHeader = styled('div')<{ isLight: boolean; isGlobal?: boolean }>(({ isGlobal, theme }) => ({
  display: 'none',
  position: 'relative',
  zIndex: 1,
  background: theme.palette.isLight ? '#F7F8F9' : '#25273D',
  color: theme.palette.isLight ? '#231536' : '#FFFFFF',
  padding: '16px 0 14px',
  borderRadius: '6px',
  lineHeight: '22px',
  boxShadow: theme.palette.isLight
    ? 'inset .25px -.25px .25px .25px rgba(190, 190, 190, 0.25), 0px 20px 40px rgba(190, 190, 190, .25), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4)',

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    display: 'block',
  },
}));

const TableHeaderRow = styled('div')({
  display: 'flex',
});

const TableHeaderTitle = styled('div')<{
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

  ...styles,
}));

const ChangesButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  margin: '32px 0',
});

const DisplayOnTabletUp = styled('div')({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
  },
});

const DisplayOnMobileOnly = styled('div')({
  display: 'block',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const DividerText = styled('div')<{ isGlobal?: boolean }>(({ theme, isGlobal }) => ({
  fontFamily: 'FT Base, sans-serif',
  flex: '0 0 auto',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#F75524' : '#FF8237',
  margin: '0 8px',

  [theme.breakpoints.up(isGlobal ? 'desktop_1024' : 'tablet_768')]: {
    margin: '0 16px',
    fontWeight: 500,
    lineHeight: '14px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    margin: '0 32px',
  },
}));

const DividerStyle = styled(Divider)({
  width: '100%',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  marginTop: '64px',
});

const StyledBigButton = styled(Button)<{
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

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    minWidth: '297px',
    padding: '8px 64px',
  },
}));

const DividerPreviousStyle = styled(Divider)({
  width: '100%',
  borderColor: '#D4D9E1',
});

const Arrows = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
