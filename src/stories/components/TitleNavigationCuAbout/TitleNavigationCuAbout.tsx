import { Typography, styled, useMediaQuery } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import type { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import theme from '../../../../styles/theme/themes';

import {
  getLatestMip39FromCoreUnit,
  getLinksFromCoreUnit,
  getMipUrlFromCoreUnit,
  getSubmissionDateFromCuMip,
} from '../../../core/businessLogic/coreUnits';
import { CuTableColumnLinks } from '../CuTableColumnLinks/CuTableColumnLinks';
import { CustomLink } from '../CustomLink/CustomLink';
import { StatusChipLegacy } from '../StatusChipLegacy/StatusChipLegacy';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface Props {
  coreUnitAbout?: CoreUnit;
}

export const TitleNavigationCuAbout = ({ coreUnitAbout }: Props) => {
  const phoneDimensions = useMediaQuery(theme.breakpoints.between('mobile_375', 'tablet_768'));
  const tableDimensions = useMediaQuery(theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const lessPhone = useMediaQuery(theme.breakpoints.down('mobile_375'));
  if (!coreUnitAbout || coreUnitAbout.cuMip.length === 0) return null;
  const newDate = getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnitAbout as CoreUnit));

  return (
    <Container>
      <CircleContainer>
        <CircleAvatarStyled name={coreUnitAbout.name || 'Core Unit'} image={coreUnitAbout.image} />
      </CircleContainer>
      <ContainerColum>
        <ContainerTitle>
          <ContainerSeparateData>
            <ResponsiveTitle>
              <TypographySES>{coreUnitAbout.shortCode}</TypographySES>
              {coreUnitAbout.name && <TypographyTitle>{coreUnitAbout.name}</TypographyTitle>}
            </ResponsiveTitle>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <StatusChipLegacy status={coreUnitAbout.status as TeamStatus} />
              <Row>
                {newDate && (
                  <CustomLink
                    href={getMipUrlFromCoreUnit(coreUnitAbout)}
                    withArrow
                    styleIcon={{
                      marginTop: '3px',
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '22px',
                      fontFamily: 'Inter, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: '11px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#447AFB',
                      textDecoration: 'none',
                      marginLeft: '4px',
                    }}
                    children={`Since ${DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}`}
                  />
                )}
              </Row>
            </div>
          </ContainerSeparateData>
        </ContainerTitle>
        {(phoneDimensions || lessPhone) && (
          <div
            style={{
              width: '100%',
            }}
          />
        )}
        <ContainerCategoryConditional>
          <CategoryContainer>
            {coreUnitAbout.category &&
              coreUnitAbout.category.map((item) => <CategoryChip key={item} category={item as TeamCategory} />)}
          </CategoryContainer>

          {(phoneDimensions || lessPhone || tableDimensions) && (
            <ContainerLinks>
              <CuTableColumnLinks
                links={getLinksFromCoreUnit(coreUnitAbout as CoreUnit)}
                fill="#708390"
                align="flex-start"
                spacings={16}
                fillDark="#ADAFD4"
              />
            </ContainerLinks>
          )}
        </ContainerCategoryConditional>
      </ContainerColum>
      {!(phoneDimensions || lessPhone || tableDimensions) && (
        <ContainerLinks>
          <CuTableColumnLinks
            links={getLinksFromCoreUnit(coreUnitAbout as CoreUnit)}
            fill="#708390"
            spacings={16}
            fillDark="#ADAFD4"
          />
        </ContainerLinks>
      )}
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 400,
});

const ContainerTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    width: '100%',
  },
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  color: theme.palette.isLight ? '#231536' : '#E2D8EE',
  marginLeft: '16px',
  marginRight: '24px',
  fontFamily: 'Inter, sans-serif',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    marginLeft: '4px',
    marginRight: '0px',
  },
  [theme.breakpoints.down('mobile_375')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    marginLeft: '4px',
    marginRight: '0px',
  },
}));

const TypographySES = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  color: theme.palette.isLight ? '#9FAFB9' : '#546978',
  fontFamily: 'Inter, sans-serif',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
  [theme.breakpoints.down('mobile_375')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const Row = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '4px',
});

const ContainerLinks = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  height: '68px',
  marginRight: '6px',
  [theme.breakpoints.up('tablet_768')]: {
    width: '272px',
    alignItems: 'flex-start',
    height: 'fit-content',
  },
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: '4px',
  },
  [theme.breakpoints.down('mobile_375')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: '4px',
  },
});

const CircleContainer = styled('div')({
  marginRight: '16px',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    display: 'none',
  },
  [theme.breakpoints.down('mobile_375')]: {
    display: 'none',
  },
});

const ContainerColum = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
});

const CategoryContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '16px',
  '> div:first-of-type': {
    marginRight: '16px',
  },
  '* + *': {
    marginRight: '16px',
  },
  height: '22px',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginTop: '0px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    marginBottom: '16px',
    marginTop: '20px',
    marginRight: '24px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [theme.breakpoints.down('mobile_375')]: {
    marginBottom: '16px',
    marginTop: '20px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
});
const ContainerCategoryConditional = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  width: '100%',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    flexDirection: 'row',
    marginTop: '16px',
  },
});

const ContainerSeparateData = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  width: '100%',
  [theme.breakpoints.down('desktop_1024')]: {
    alignItems: 'center',
  },
  [theme.breakpoints.down('mobile_375')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  [theme.breakpoints.down('tablet_768')]: {
    flexWrap: 'wrap',
  },
});

const ResponsiveTitle = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: '100%',
    marginBottom: '6px',
  },
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    width: 'auto',
    marginRight: '24px',
    marginBottom: '2px',
  },
});

const CircleAvatarStyled = styled(CircleAvatar)({
  width: 68,
  height: 68,
  minWidth: 68,
  minHeight: 68,
  filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
});

export default TitleNavigationCuAbout;
