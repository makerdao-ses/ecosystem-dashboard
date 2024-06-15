import { styled } from '@mui/material';
import { DateTime } from 'luxon';
import {
  getLatestMip39FromCoreUnit,
  getMipUrlFromCoreUnit,
  getSubmissionDateFromCuMip,
} from '@/core/businessLogic/coreUnits';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import type { Team } from '@/core/models/interfaces/team';
import ExternalLinkButton from '../ExternalLinkButton/ExternalLinkButton';

interface CoreUnitSubmissionLinkProps {
  team: Team;
}

const CoreUnitSubmissionLink: React.FC<CoreUnitSubmissionLinkProps> = ({ team }) => {
  const submissionDate = getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(team as unknown as CoreUnit));

  if (!submissionDate) return null;

  return (
    <SinceDateCoreUnit href={getMipUrlFromCoreUnit(team as unknown as CoreUnit)} showArrow wrapText>
      {`Since ${DateTime.fromJSDate(submissionDate).toFormat('d-MMM-y').toUpperCase()}`}
    </SinceDateCoreUnit>
  );
};

export default CoreUnitSubmissionLink;

const SinceDateCoreUnit = styled(ExternalLinkButton)(({ theme }) => ({
  alignSelf: 'baseline',
  padding: '0px 1px 0px 2px',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '22.4px',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,

  ':hover': {
    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },

  '& div': {
    width: 16,
    height: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    height: 24,
    padding: '0px 4px 0px 6px',
  },
}));
