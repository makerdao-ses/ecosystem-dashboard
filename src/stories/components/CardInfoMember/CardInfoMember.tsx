import styled from '@emotion/styled';
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { getContributorCommitment, getLinksFromContributor } from '../../../core/business-logic/core-unit-about';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { getColorJobPosition } from '../../../core/utils/color.utils';
import { CircleAvatar } from '../CircleAvatar/CircleAvatar';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { CustomPopover } from '../custom-popover/custom-popover';
import type { ContributorCommitmentDto } from '../../../core/models/dto/core-unit.dto';

interface Props {
  contributorCommitment: ContributorCommitmentDto;
}

const CardInfoMember = ({ contributorCommitment }: Props) => {
  const { isLight } = useThemeContext();
  const since = DateTime.now().diff(DateTime.fromISO(contributorCommitment.startDate), ['years', 'months']);
  const contributor = contributorCommitment.contributor[0] || [];
  const links = getLinksFromContributor(contributorCommitment);
  const { color } = getColorJobPosition(contributorCommitment.jobTitle);
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Container square isLight={isLight}>
        <CardContent
          sx={{
            margin: '16px',
            padding: '0px',
          }}
        >
          <CardHeader
            sx={{
              padding: '0px',
              '& .MuiCardHeader-avatar': {
                marginRight: '0px',
              },
            }}
            avatar={
              <CircleAvatar
                width="54px"
                height="54px"
                style={{ marginRight: '21px' }}
                name={contributor?.name}
                image={contributor?.facilitatorImage}
                border="3px solid #E7FCFA"
              />
            }
            title={<TypographyName isLight={isLight}>{contributor.name}</TypographyName>}
            subheader={
              <>
                {contributor && contributor.email && contributor.email.length >= 40 ? (
                  <CustomPopover title={contributor?.email?.toLowerCase()} id={'mouse-over-popover-goto'}>
                    <TypographyEmail
                      isLight={isLight}
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
                    isLight={isLight}
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {contributor?.email?.toLowerCase()}
                  </TypographyEmail>
                )}
              </>
            }
          />
          <TypographyJobTitle
            sx={{
              margin: '24px 0',
              color,
            }}
          >
            {contributorCommitment.jobTitle}
          </TypographyJobTitle>

          <CardContentPositionRow>
            <CardContentPositionColumn>
              <TypographyStyled mb={0} color="#708390" style={{ paddingBottom: '4px' }}>
                Since
              </TypographyStyled>
              <TypographyStyled mb={0} color={isLight ? '#231536' : '#D2D4EF'}>
                {since.years >= 1 && `${Math.floor(since.years)} Year${since.years < 2 ? '' : 's'}`}{' '}
                {since.months >= 1 && `${Math.floor(since.months)} Month${since.months < 2 ? '' : 's'}`}
              </TypographyStyled>
            </CardContentPositionColumn>
            <CardContentPositionColumn>
              <TypographyStyled mb={0} color="#708390" style={{ paddingBottom: '4px' }}>
                Commitment
              </TypographyStyled>
              <TypographyStyled mb={0} color={isLight ? '#231536' : '#D2D4EF'}>
                {getContributorCommitment(contributorCommitment.commitment)}
              </TypographyStyled>
            </CardContentPositionColumn>
          </CardContentPositionRow>
        </CardContent>
        <Divider
          light
          sx={{
            marginBottom: '12px',
            height: '1px',
            bgcolor: isLight ? '#D4D9E1' : '#405361',
          }}
          variant="fullWidth"
        />
        <CardLinksFooter>
          <CuTableColumnLinks links={links} width={15} height={15} spacings={25} fillDark="#9FAFB9" />
        </CardLinksFooter>
      </Container>
    </Box>
  );
};

const Container = styled(Card, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
    backgroundColor: isLight ? '#FFFFFF' : '#10191F',
    borderRadius: '6px',
    width: '335px',
    [lightTheme.breakpoints.down('table_375')]: {
      width: '100%',
    },
  })
);

const CardContentPositionRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '47px',
});

const CardContentPositionColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const CardLinksFooter = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '12px',
});

const TypographyStyled = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ color: string }>(
  (props) => ({
    color: props.color,
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
  })
);

const TypographyEmail = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    color: isLight ? '#231536' : '#D2D4EF',
    lineHeight: '17px',
  })
);

const TypographyJobTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  fontSize: '11px',
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  lineHeight: '13px',
  fontStyle: 'normal',
  height: '22px',
});

const TypographyName = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontSize: '20px',
    color: isLight ? '#231536' : '#D2D4EF',
    lineHeight: '24px',
    fontWeight: 500,
    letterSpacing: '0.3px',
    paddingBottom: '8px',
    fontFamily: 'Inter, sans-serif',
  })
);

export default CardInfoMember;
