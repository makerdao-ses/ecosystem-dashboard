import { styled, useMediaQuery } from '@mui/material';
import MakerdaoIcon from 'public/assets/svg/makerdao.svg';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { Theme } from '@mui/material';

interface ProposalProps {
  isGoverningProposal?: boolean;
}

const Proposal: React.FC<ProposalProps> = ({ isGoverningProposal = false }) => {
  const isUpDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));

  return (
    <ProposalCard>
      <DescriptionContainer>
        <Description>
          Increase GSM Pause Delay, Increase Spark MetaMorpho Vault Maximum Debt Ceiling, Add Native Vaults to Debt
          Ceiling Breaker, SparkLend Proxy Spell, and TACO Resolutions - April 4, 2024
        </Description>

        <DescriptionFooter>
          {isGoverningProposal && <GoverningProposal>Governing Proposal</GoverningProposal>}
          <Dates>
            <span>Passed on DEC 10 2024 14:56 UTC</span>
            <Separator>-</Separator>
            <span>Executed On DEC 11 2023</span>
          </Dates>
        </DescriptionFooter>
      </DescriptionContainer>

      <Info>
        <Supporters>
          <Label>Supporters</Label>
          <Number>41</Number>
        </Supporters>
        <MKRSupport>
          <Label>MKR Support</Label>
          <Number>
            42,337 <MakerdaoIcon />
          </Number>
        </MKRSupport>
        <ExternalLinkContainer>
          <ExternalLinkButton href="https://vote.makerdao.com/" children={isUpDesktop1024 ? 'View' : null} />
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
