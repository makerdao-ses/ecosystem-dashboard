import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CuActivityDto } from '../../../core/models/dto/core-unit-activity.dto';
import { ActivityVisitHandler } from '../../../core/utils/new-activity-handler';
import CUActivityItem from './cu-activity-item';
import Button from '@mui/material/Button';

export interface ActivityTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
}

export interface ActivityTableProps {
  columns: ActivityTableHeader[];
  activity: CuActivityDto[];
  cuId?: string;
}
export interface ExtendedActivityDto extends CuActivityDto {
  isNew?: boolean;
}

const NewChangesDivider = ({ isLight, count }: { isLight: boolean; count: number }) => (
  <ChangesButtonContainer>
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
  </ChangesButtonContainer>
);

const INITIAL_ELEMENTS = 10;

export default function ActivityTable({ cuId, columns, activity }: ActivityTableProps) {
  const isLight = useThemeContext().themeMode === 'light';
  const [showElements, setShowElements] = useState(INITIAL_ELEMENTS);
  const [noVisitedCount, setNoVisitedCount] = useState(0);
  const [extendedActivity, setExtendedActivity] = useState<ExtendedActivityDto[]>(activity);

  const handleSeePrevious = () => {
    setShowElements(activity.length);
  };

  useEffect(() => {
    const activityHandler = new ActivityVisitHandler(cuId);
    let noVisited = 0;

    const _extendedActivity: ExtendedActivityDto[] = [];

    for (const update of activity) {
      const isNew = activityHandler.wasVisited(update);
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
  }, []);

  return (
    <>
      {noVisitedCount > 0 && (
        <DisplayOnMobileOnly style={{ marginBottom: '48px' }}>
          <NewChangesDivider isLight={isLight} count={noVisitedCount} />
        </DisplayOnMobileOnly>
      )}

      <TableHeader isLight={isLight}>
        <TableHeaderRow>
          {columns.map((column) => (
            <TableHeaderTitle width={column.width} styles={column.styles} align={column.align ?? 'left'}>
              {column.header}
            </TableHeaderTitle>
          ))}
        </TableHeaderRow>
      </TableHeader>

      <div>
        {extendedActivity?.slice(0, showElements)?.map((update, index) => (
          <div key={`table-item-${update.id}`}>
            <CUActivityItem activity={update} isNew={!!update.isNew} />
            {noVisitedCount > 0 && noVisitedCount === index + 1 && !(showElements - 1 === index) && (
              <DisplayOnTabletUp>
                <NewChangesDivider isLight={isLight} count={noVisitedCount} />
              </DisplayOnTabletUp>
            )}
          </div>
        ))}
      </div>

      {showElements < activity.length && (
        <ButtonContainer>
          <DividerPreviousStyle
            sx={{
              bgcolor: isLight ? '#D4D9E1' : '#405361',
            }}
          />
          <StyledBigButton isLight={isLight} title={'See Previous Activity'} onClick={handleSeePrevious}>
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

const TableHeader = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'none',
  position: 'relative',
  zIndex: 1,
  background: isLight ? '#F7F8F9' : '#25273D',
  padding: '16px 0 14px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  lineHeight: '22px',
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

const TableHeaderTitle = styled.div<{
  width?: string;
  styles?: React.CSSProperties;
  align: 'left' | 'center' | 'right';
}>(({ width, styles, align }) => ({
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

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  marginTop: '64px',
});

const StyledBigButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
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

    [lightTheme.breakpoints.up('table_834')]: {
      minWidth: '297px',
      padding: '8px 64px',
    },
  })
);

const DividerPreviousStyle = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  width: '100%',
  borderColor: '#D4D9E1',
});
