import { styled } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import { ButtonType } from '../../../core/enums/buttonTypeEnum';
import { CustomButton } from '../CustomButton/CustomButton';
import { getCorrectCodeFromActivity, getResourceType } from './utils/helpers';
import type { Activity } from './ActivityTable';

interface CUActivityItemProps {
  activity: Activity;
  isNew: boolean;
}

export default function CUActivityItem({ activity, isNew }: CUActivityItemProps) {
  const activityCode = getCorrectCodeFromActivity(activity.activityFeed);

  const router = useRouter();
  const resourceType = getResourceType(activity.activityFeed);
  const isGlobal = !!activity.team || resourceType === ResourceType.Delegates;

  const dayDiffNow = useMemo(
    () => Math.abs(Math.ceil(DateTime.fromISO(activity.activityFeed.created_at).diffNow('days').days)),
    [activity]
  );

  const detailsUrl = useMemo(() => {
    let goToComments = false;
    if (
      ['CU_BUDGET_STATEMENT_COMMENT', 'DELEGATES_BUDGET_STATEMENT_COMMENT', 'TEAM_BUDGET_STATEMENT_COMMENT'].includes(
        activity.activityFeed.event
      )
    ) {
      goToComments = true;
    }

    const month = DateTime.fromFormat(activity.activityFeed.params?.month ?? '', 'y-M').toFormat('LLLy');
    let url = '';
    if (resourceType === ResourceType.Delegates) {
      // it is a delegate
      url = `${siteRoutes.recognizedDelegateReport}?viewMonth=${month}`;
    } else if (resourceType === ResourceType.CoreUnit) {
      // it is a core unit
      url = `${siteRoutes.coreUnitReports(activityCode?.shortCode ?? '')}?viewMonth=${month}`;
    } else {
      // it is an ecosystem actor
      url = `${siteRoutes.ecosystemActorReports(activityCode?.shortCode ?? '')}?viewMonth=${month}`;
    }

    if (goToComments) {
      url += '&section=comments';
    } else {
      url += '&section=actuals';
    }

    return url;
  }, [activity.activityFeed.event, activity.activityFeed.params?.month, activityCode?.shortCode, resourceType]);

  const goToDetails = () => {
    router.push(detailsUrl);
  };

  return (
    <Link href={detailsUrl} passHref legacyBehavior>
      <ActivityItem isGlobal={isGlobal}>
        <FlexWrapper isGlobal={isGlobal}>
          {isGlobal &&
            (resourceType === ResourceType.Delegates ? (
              <TeamData isGlobal={isGlobal}>
                <CircleAvatarExtended image={'/assets/img/mk-logo.png'} name={'Recognized Delegates'} />
                <CoreUnitName style={{ marginLeft: 16 }}>Recognized Delegates</CoreUnitName>
              </TeamData>
            ) : (
              [ResourceType.CoreUnit, ResourceType.EcosystemActor].includes(resourceType) && (
                <TeamData isGlobal={isGlobal}>
                  <CircleAvatarExtended image={activity?.team?.image} name={activity?.team?.name || ''} />
                  <CoreUnitCode>{activity?.team?.shortCode}</CoreUnitCode>
                  <CoreUnitName>{activity?.team?.name}</CoreUnitName>
                </TeamData>
              )
            ))}
          <Timestamp isGlobal={isGlobal}>
            <UTCDate isGlobal={isGlobal}>
              {DateTime.fromISO(activity.activityFeed.created_at).setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}
            </UTCDate>
            <HumanizedDate isNew={isNew} isGlobal={isGlobal}>
              {dayDiffNow === 0 ? 'Today' : `${dayDiffNow} Day${dayDiffNow !== 1 ? 's' : ''} Ago`}
            </HumanizedDate>
          </Timestamp>
        </FlexWrapper>
        <Details isGlobal={isGlobal}>{activity.activityFeed.description}</Details>
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

const ActivityItem = styled('a')<{ isLoading?: boolean; isGlobal: boolean }>(({ theme, isLoading, isGlobal }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.isLight ? 'white' : '#10191F',
  marginTop: '16px',
  padding: isGlobal ? 16 : '16px 16px 24px',
  cursor: 'pointer',
  borderRadius: '6px',
  boxShadow: theme.palette.isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  [theme.breakpoints.up(833)]: {
    padding: '16px 24px 24px',
  },

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: '24px 32px',

    ':hover': {
      background: !isLoading
        ? theme.palette.isLight
          ? '#ECF1F3'
          : '#1E2C37'
        : theme.palette.isLight
        ? 'white'
        : '#10191F',
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '24px 64px',
  },
}));

const Timestamp = styled('div')<{ isGlobal: boolean }>(({ isGlobal, theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    flexDirection: 'column',
    width: isGlobal ? 251 : 230,
    minWidth: isGlobal ? 251 : 230,
    paddingRight: 14,
    marginBottom: 0,
    ...(isGlobal && {
      width: isGlobal ? 251 : 275,
    }),
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: isGlobal ? 251 : 275,
  },
}));

const Details = styled('div')<{ isGlobal: boolean }>(({ theme, isGlobal }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#EDEFFF',
  marginBottom: '32px',
  letterSpacing: 0,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: '16px',
    fontSize: '16px',
  },

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    width: 'calc(100% - 230px)',
    marginBottom: 0,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 'calc(100% - 275px)',
  },
}));

const UTCDate = styled('div')<{ isGlobal: boolean }>(({ theme, isGlobal }) => ({
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: theme.palette.isLight ? '#708390' : '#546978',

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    marginBottom: '4px',
  },
}));

const HumanizedDate = styled('div')<{ isNew: boolean; isGlobal: boolean }>(({ theme, isNew = false, isGlobal }) => ({
  position: 'relative',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#EDEFFF',

  ...(isNew && {
    paddingRight: '10px',

    [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
      paddingLeft: '10px',
    },

    '&::before': {
      content: '""',
      display: 'block',
      width: '6px',
      height: '6px',
      background: theme.palette.isLight ? '#F75524' : '#FF8237',
      borderRadius: '50%',
      position: 'absolute',
      right: 0,
      top: '5.5px',

      [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
        left: 0,
      },
    },
  }),
}));

const ButtonContainer = styled('div')<{ isGlobal: boolean }>(({ isGlobal, theme }) => ({
  textAlign: 'right',

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    display: 'none',
  },
}));

const TeamData = styled('div')<{ isGlobal: boolean }>(({ isGlobal, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: '327px',
  marginTop: '32px',
  paddingLeft: 7,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 16,
    paddingLeft: 0,
  },

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    marginTop: 0,
  },
}));

const CoreUnitCode = styled('span')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#9FAFB9' : '#546978',
  marginLeft: '16px',
}));

const CoreUnitName = styled('span')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#FFFFFF',
  marginLeft: '4px',
}));

const FlexWrapper = styled('div')<{ isGlobal: boolean }>(({ isGlobal, theme }) => ({
  display: 'flex',
  flexDirection: isGlobal ? 'column-reverse' : 'column',
  marginBottom: 32,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 24,
  },

  [theme.breakpoints.up(isGlobal ? 1000 : 'tablet_768')]: {
    flexDirection: 'row',
    marginBottom: 0,
  },
}));

const CircleAvatarExtended = styled(CircleAvatar)({
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
});
