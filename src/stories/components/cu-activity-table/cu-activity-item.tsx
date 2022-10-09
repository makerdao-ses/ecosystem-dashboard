import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { getShortCode } from '../../../core/utils/string.utils';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CustomButton } from '../custom-button/custom-button';
import { Activity } from './cu-activity-table';

interface CUActivityItemProps {
  activity: Activity;
  isNew: boolean;
}
export default function CUActivityItem({ activity, isNew }: CUActivityItemProps) {
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();
  const isGlobal = !!activity.coreUnit;

  const dayDiffNow = useMemo(
    () => Math.abs(Math.ceil(DateTime.fromISO(activity.activityFeed.created_at).diffNow('days').days)),
    [activity]
  );

  const goToDetails = () => {
    router.push(
      `/core-unit/${getShortCode(
        activity.activityFeed.params.coreUnit.code
      )}/finances/reports?viewMonth=${DateTime.fromFormat(activity.activityFeed.params.month, 'y-M').toFormat('LLLy')}`
    );
  };

  return (
    <ActivityItem isLight={isLight} onClick={goToDetails}>
      <FlexWrapper isGlobal={isGlobal}>
        {activity.coreUnit && (
          <CoreUnit>
            <CircleAvatar width="32px" height="32px" image={activity.coreUnit.image} name={activity.coreUnit.name} />
            <CoreUnitCode>{activity.coreUnit.shortCode}</CoreUnitCode>
            <CoreUnitName>{activity.coreUnit.name}</CoreUnitName>
          </CoreUnit>
        )}
        <Timestamp isGlobal={isGlobal}>
          <UTCDate isLight={isLight}>
            {DateTime.fromISO(activity.activityFeed.created_at).setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}
          </UTCDate>
          <HumanizedDate isLight={isLight} isNew={isNew}>
            {dayDiffNow === 0 ? 'Today' : `${dayDiffNow} Day${dayDiffNow !== 1 ? 's' : ''} Ago`}
          </HumanizedDate>
        </Timestamp>
      </FlexWrapper>
      <Details isGlobal={isGlobal} isLight={isLight}>
        {activity.activityFeed.description}
      </Details>
      {!isGlobal && (
        <ButtonContainer>
          <CustomButton
            label="View Details"
            onClick={goToDetails}
            style={{
              display: 'inline-flex',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              padding: '8px 24px',
              height: 'auto',
              color: '#231536',
              borderColor: isLight ? '#231536' : '#343442',
            }}
            allowsHover={false}
          />
        </ButtonContainer>
      )}
    </ActivityItem>
  );
}

const ActivityItem = styled.a<{ isLight: boolean; isLoading?: boolean }>(({ isLight, isLoading }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  background: isLight ? 'white' : '#10191F',
  marginTop: '16px',
  padding: '16px 16px 24px',
  cursor: 'pointer',
  borderRadius: '6px',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  '@media (min-width: 834px)': {
    ':hover': {
      background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
    },
  },

  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: '24px 32px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '24px 64px',
  },
}));

const Timestamp = styled.div<{ isGlobal: boolean }>(({ isGlobal }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'column',
    width: isGlobal ? 251 : 230,
    minWidth: isGlobal ? 251 : 230,
    paddingRight: 14,
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: isGlobal ? 251 : 275,
  },
}));

const Details = styled.div<{ isLight: boolean; isGlobal: boolean }>(({ isLight = true, isGlobal }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#EDEFFF',
  marginBottom: isGlobal ? 0 : '32px',
  letterSpacing: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'calc(100% - 230px)',
    fontSize: '16px',
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 'calc(100% - 275px)',
  },
}));

const UTCDate = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: isLight ? '#708390' : '#546978',

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: '4px',
  },
}));

const HumanizedDate = styled.div<{ isLight: boolean; isNew: boolean }>(({ isLight = true, isNew = false }) => ({
  position: 'relative',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#EDEFFF',

  ...(isNew && {
    paddingRight: '10px',

    [lightTheme.breakpoints.up('table_834')]: {
      paddingLeft: '10px',
    },

    '&::before': {
      content: '""',
      display: 'block',
      width: '6px',
      height: '6px',
      background: isLight ? '#F75524' : '#FF8237',
      borderRadius: '50%',
      position: 'absolute',
      right: 0,
      top: '5.5px',

      [lightTheme.breakpoints.up('table_834')]: {
        left: 0,
      },
    },
  }),
}));

const ButtonContainer = styled.div({
  textAlign: 'right',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const CoreUnit = styled.div({
  display: 'flex',
  alignItems: 'center',
  minWidth: '327px',
  marginTop: '18px',
  '@media (min-width: 834px)': {
    marginTop: 0,
  },
});

const CoreUnitCode = styled.span({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
  marginLeft: '16px',
});

const CoreUnitName = styled.span({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#231536',
  marginLeft: '4px',
});

const FlexWrapper = styled.div<{ isGlobal: boolean }>(({ isGlobal }) => ({
  display: 'flex',
  flexDirection: isGlobal ? 'column-reverse' : 'column',
  marginBottom: isGlobal ? '24px' : '34px',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    marginBottom: 0,
  },
}));
