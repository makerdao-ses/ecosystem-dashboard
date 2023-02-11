import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ButtonType } from '../../../core/enums/button-type.enum';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CustomButton } from '../custom-button/custom-button';
import type { Activity } from './cu-activity-table';

interface CUActivityItemProps {
  activity: Activity;
  isNew: boolean;
}
export default function CUActivityItem({ activity, isNew }: CUActivityItemProps) {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const isGlobal = !!activity.coreUnit;

  const dayDiffNow = useMemo(
    () => Math.abs(Math.ceil(DateTime.fromISO(activity.activityFeed.created_at).diffNow('days').days)),
    [activity]
  );

  const detailsUrl = useMemo(() => {
    let anchor = '';
    if (activity.activityFeed.event === 'CU_BUDGET_STATEMENT_COMMENT') {
      anchor = '#comments';
    }
    return `/core-unit/${
      activity.activityFeed.params.coreUnit.shortCode
    }/finances/reports?viewMonth=${DateTime.fromFormat(activity.activityFeed.params.month, 'y-M').toFormat(
      'LLLy'
    )}${anchor}`;
  }, [activity]);

  const goToDetails = () => {
    router.push(detailsUrl);
  };

  return (
    <Link href={detailsUrl} passHref>
      <ActivityItem isLight={isLight} isGlobal={isGlobal}>
        <FlexWrapper isGlobal={isGlobal}>
          {activity.coreUnit && (
            <CoreUnit isGlobal={isGlobal}>
              <CircleAvatar width="32px" height="32px" image={activity.coreUnit.image} name={activity.coreUnit.name} />
              <CoreUnitCode isLight={isLight}>{activity.coreUnit.shortCode}</CoreUnitCode>
              <CoreUnitName isLight={isLight}>{activity.coreUnit.name}</CoreUnitName>
            </CoreUnit>
          )}
          <Timestamp isGlobal={isGlobal}>
            <UTCDate isLight={isLight} isGlobal={isGlobal}>
              {DateTime.fromISO(activity.activityFeed.created_at).setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}
            </UTCDate>
            <HumanizedDate isLight={isLight} isNew={isNew} isGlobal={isGlobal}>
              {dayDiffNow === 0 ? 'Today' : `${dayDiffNow} Day${dayDiffNow !== 1 ? 's' : ''} Ago`}
            </HumanizedDate>
          </Timestamp>
        </FlexWrapper>
        <Details isLight={isLight} isGlobal={isGlobal}>
          {activity.activityFeed.description}
        </Details>
        <ButtonContainer isGlobal={isGlobal}>
          <CustomButton
            label="View Details"
            onClick={goToDetails}
            buttonType={ButtonType.Default}
            style={{
              display: 'inline-flex',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              padding: '7px 23px',
              height: 'auto',
            }}
            allowsHover={false}
          />
        </ButtonContainer>
      </ActivityItem>
    </Link>
  );
}

const ActivityItem = styled.a<{ isLight: boolean; isLoading?: boolean; isGlobal: boolean }>(
  ({ isLight, isLoading, isGlobal }) => ({
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    background: isLight ? 'white' : '#10191F',
    marginTop: '16px',
    padding: isGlobal ? 16 : '16px 16px 24px',
    cursor: 'pointer',
    borderRadius: '6px',
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

    [lightTheme.breakpoints.up(833)]: {
      padding: '16px 24px 24px',
    },

    [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: '24px 32px',

      ':hover': {
        background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
      },
    },
    [lightTheme.breakpoints.up('desktop_1194')]: {
      padding: '24px 64px',
    },
  })
);

const Timestamp = styled.div<{ isGlobal: boolean }>(({ isGlobal }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
    flexDirection: 'column',
    width: isGlobal ? 251 : 230,
    minWidth: isGlobal ? 251 : 230,
    paddingRight: 14,
    marginBottom: 0,
    ...(isGlobal && {
      width: isGlobal ? 251 : 275,
    }),
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
  marginBottom: '32px',
  letterSpacing: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: '16px',
    fontSize: '16px',
  },

  [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
    width: 'calc(100% - 230px)',
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 'calc(100% - 275px)',
  },
}));

const UTCDate = styled.div<{ isLight: boolean; isGlobal: boolean }>(({ isLight, isGlobal }) => ({
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: isLight ? '#708390' : '#546978',

  [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
    marginBottom: '4px',
  },
}));

const HumanizedDate = styled.div<{ isLight: boolean; isNew: boolean; isGlobal: boolean }>(
  ({ isLight = true, isNew = false, isGlobal }) => ({
    position: 'relative',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '17px',
    color: isLight ? '#231536' : '#EDEFFF',

    ...(isNew && {
      paddingRight: '10px',

      [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
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

        [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
          left: 0,
        },
      },
    }),
  })
);

const ButtonContainer = styled.div<{ isGlobal: boolean }>(({ isGlobal }) => ({
  textAlign: 'right',

  [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
    display: 'none',
  },
}));

const CoreUnit = styled.div<{ isGlobal: boolean }>(({ isGlobal }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: '327px',
  marginTop: '32px',
  paddingLeft: 7,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 16,
    paddingLeft: 0,
  },

  [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
    marginTop: 0,
  },
}));

const CoreUnitCode = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',
  marginLeft: '16px',
}));

const CoreUnitName = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#FFFFFF',
  marginLeft: '4px',
}));

const FlexWrapper = styled.div<{ isGlobal: boolean }>(({ isGlobal }) => ({
  display: 'flex',
  flexDirection: isGlobal ? 'column-reverse' : 'column',
  marginBottom: 32,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 24,
  },

  [lightTheme.breakpoints.up(isGlobal ? 1000 : 'table_834')]: {
    flexDirection: 'row',
    marginBottom: 0,
  },
}));
