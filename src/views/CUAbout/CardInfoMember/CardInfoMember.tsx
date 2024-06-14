import { Typography, styled } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import Card from '@/components/Card/Card';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import RoleChip from '@/components/RoleChip/RoleChip';
import type { TeamRole } from '@/core/enums/teamRole';
import { getContributorCommitment, getLinksFromContributor } from '../../../core/businessLogic/coreUnitAbout';
import { CuTableColumnLinks } from '../../../stories/components/CuTableColumnLinks/CuTableColumnLinks';
import { CustomPopover } from '../../../stories/components/CustomPopover/CustomPopover';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';

interface Props {
  contributorCommitment: ContributorCommitment;
  roles?: string[];
}

const CardInfoMember = ({ contributorCommitment, roles = [] }: Props) => {
  const since = DateTime.now().diff(DateTime.fromISO(contributorCommitment.startDate), ['years', 'months']);
  const contributor = contributorCommitment.contributor[0] || [];
  const links = getLinksFromContributor(contributorCommitment);

  return (
    <Container>
      <ContainerData>
        <CardHeader>
          <CircleAvatarStyled name={contributor?.name} image={contributor?.facilitatorImage} />
          <Information>
            <TypographyName>{contributor.name}</TypographyName>
            {contributor && contributor.email && contributor.email.length >= 40 ? (
              <CustomPopover title={contributor?.email?.toLowerCase()} id={'mouse-over-popover-goto'}>
                <TypographyEmail
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    width: '207px',
                  }}
                >
                  {contributor?.email?.toLowerCase()}
                </TypographyEmail>
              </CustomPopover>
            ) : (
              <TypographyEmail
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {contributor?.email?.toLowerCase()}
              </TypographyEmail>
            )}
          </Information>
        </CardHeader>
        <RolesRow>
          {roles.map((role) => (
            <RoleChipStyled status={role as TeamRole} />
          ))}
        </RolesRow>

        <CardContentPositionRow>
          <CardContentPositionColumn>
            <TypographyStyled>Since</TypographyStyled>
            <TypographyStyledValues>
              {since.years >= 1 && `${Math.floor(since.years)} Year${since.years < 2 ? '' : 's'}`}{' '}
              {since.months >= 1 && `${Math.floor(since.months)} Month${since.months < 2 ? '' : 's'}`}
            </TypographyStyledValues>
          </CardContentPositionColumn>
          <CardContentPositionColumn>
            <TypographyStyled>Commitment</TypographyStyled>
            <TypographyStyledValues>
              {getContributorCommitment(contributorCommitment.commitment)}
            </TypographyStyledValues>
          </CardContentPositionColumn>
        </CardContentPositionRow>
      </ContainerData>
      <Divider />
      <CardLinksFooter>
        <CuTableColumnLinks links={links} width={16} height={16} spacings={24} fillDark="#9FAFB9" fill="#9DA6B9" />
      </CardLinksFooter>
    </Container>
  );
};

export default CardInfoMember;
const Container = styled(Card)(({ theme }) => ({
  width: 343,
  minWidth: 343,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
  [theme.breakpoints.up('tablet_768')]: {
    width: 340,
    minWidth: 340,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 378.5,
    minWidth: 378.5,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 416,
    minWidth: 416,
  },
}));

const CardContentPositionRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '47px',
});

const CardContentPositionColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const CardLinksFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 12,
  paddingTop: 12,
  '& svg': {
    width: 16,
    height: 16,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginBottom: 8,
    paddingTop: 4,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '18px',
  marginBottom: 4,
  color: theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.slate[300],
}));
const TypographyStyledValues = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: 4,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const TypographyEmail = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontStyle: 'normal',
  fontSize: '14px',
  fontFamily: 'Inter, sans-serif',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  lineHeight: '22px',
}));

const TypographyName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 20,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  lineHeight: '24px',
  fontWeight: 700,
  paddingBottom: '4px',
}));

const CircleAvatarStyled = styled(CircleAvatar)(({ theme }) => ({
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,
  border: `3px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[200]
  }`,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.darkMode,
}));

const ContainerData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 16px 0px 16px',
  gap: 16,
  marginBottom: 10,
});

const CardHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,
});
const Information = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const RolesRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 16,
});

const Divider = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#373E4D'}`,
  width: '100%',
}));

const RoleChipStyled = styled(RoleChip)({
  '& >div': {
    fontSize: 14,
  },
});
