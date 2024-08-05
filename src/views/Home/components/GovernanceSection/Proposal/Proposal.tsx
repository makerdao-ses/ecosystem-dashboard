import { styled, useMediaQuery } from '@mui/material';
import { utils } from 'ethers';
import { DateTime } from 'luxon';
import MakerdaoIcon from 'public/assets/svg/makerdao.svg';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import { usLocalizedNumber } from '@/core/utils/humanization';
import type { Theme } from '@mui/material';

interface ProposalProps {
  proposal: ExtendedExecutiveProposal;
}

const Proposal: React.FC<ProposalProps> = ({ proposal }) => {
  const isUpDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));
  const mkrSupportEth = parseFloat(utils.formatEther(proposal.spellData.mkrSupport));

  return (
    <ProposalCard>
      <DescriptionContainer>
        <Description>{proposal.proposalBlurb}</Description>

        <DescriptionFooter>
          {proposal.active && <GoverningProposal>Governing Proposal</GoverningProposal>}
          <Dates>
            <span>
              Passed on{' '}
              {DateTime.fromISO(proposal.spellData.datePassed).toFormat("LLL dd yyyy HH:mm 'UTC'").toUpperCase()}
            </span>
            <Separator>-</Separator>
            <span>
              Executed on{' '}
              {DateTime.fromISO(proposal.spellData.dateExecuted).toFormat("LLL dd yyyy HH:mm 'UTC'").toUpperCase()}
            </span>
          </Dates>
        </DescriptionFooter>
      </DescriptionContainer>

      <Info>
        <Supporters>
          <Label>Supporters</Label>
          <Number>{proposal.supporters}</Number>
        </Supporters>
        <MKRSupport>
          <Label>MKR Support</Label>
          <Number>
            {usLocalizedNumber(mkrSupportEth, mkrSupportEth < 1000 ? 1 : 0)} <MakerdaoIcon />
          </Number>
        </MKRSupport>
        <ExternalLinkContainer>
          <ExternalLinkButton
            href={`https://vote.makerdao.com/executive/${proposal.key}`}
            children={isUpDesktop1024 ? 'View' : null}
          />
        </ExternalLinkContainer>
      </Info>
    </ProposalCard>
  );
};

export default Proposal;

const ProposalCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    boxShadow: 'unset',
    flexDirection: 'row',
  },
}));

const DescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  padding: 7,

  [theme.breakpoints.up('desktop_1280')]: {
    padding: 15,
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 806,
    minWidth: 806,
  },
}));

const Description = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const DescriptionFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const GoverningProposal = styled('div')(({ theme }) => ({
  maxWidth: 'fit-content',
  padding: '1px 16px',
  borderRadius: 6,
  background: theme.palette.isLight ? theme.palette.colors.green[100] : 'rgba(52, 168, 83, 0.40)',
  color: theme.palette.isLight ? theme.palette.colors.green[800] : theme.palette.colors.green[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
}));

const Dates = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
    marginRight: 'auto',
  },
}));

const Separator = styled('span')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'inline',
  },
}));

const Info = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  padding: '0 8px',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '100%',
    justifyContent: 'center',
  },
}));

const Supporters = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 0',
  width: 90,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 120,
    padding: 8,
  },
}));

const MKRSupport = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 0',
  width: 90,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 120,
    padding: 8,
  },
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[300],
  whiteSpace: 'nowrap',

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Number = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],

  '& svg': {
    width: 16,

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ExternalLinkContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
