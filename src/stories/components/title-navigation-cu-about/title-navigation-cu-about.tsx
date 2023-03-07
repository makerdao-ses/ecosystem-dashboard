/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { getMipsStatus, getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import {
  getLatestMip39FromCoreUnit,
  getLinksFromCoreUnit,
  getStautsMip39AccetedOrObsolete,
  getSubmissionDateFromCuMip,
} from '../../../core/business-logic/core-units';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { getShortCode } from '../../../core/utils/string.utils';
import { CategoryChip } from '../CategoryChip/CategoryChip';
import { CircleAvatar } from '../CircleAvatar/CircleAvatar';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { CustomLink } from '../custom-link/custom-link';
import { StatusChip } from '../status-chip/status-chip';
import type { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import type { CoreUnitDto, CuMipDto } from '../../../core/models/dto/core-unit.dto';

interface Props {
  coreUnitAbout?: CoreUnitDto;
  hiddenTextDescription?: boolean;
}

export const TitleNavigationCuAbout = ({ coreUnitAbout, hiddenTextDescription }: Props) => {
  const { isLight } = useThemeContext();
  const phoneDimensions = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const tableDimensions = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const lessPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  if (!coreUnitAbout || coreUnitAbout.cuMip.length === 0) return null;
  const mipStatus = getStautsMip39AccetedOrObsolete(coreUnitAbout as CoreUnitDto);
  const newDate = getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnitAbout as CoreUnitDto));

  return (
    <Container>
      <CircleContainer>
        <CircleAvatar
          width={'68px'}
          height={'68px'}
          name={coreUnitAbout.name || 'Core Unit'}
          image={coreUnitAbout.image}
          style={{
            filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
          }}
        />
      </CircleContainer>
      <ContainerColum>
        <ContainerTitle>
          <ContainerSeparateData>
            <ResponsiveTitle>
              <TypographySES isLight={isLight}>{coreUnitAbout.shortCode}</TypographySES>
              {coreUnitAbout.name && <TypographyTitle isLight={isLight}>{coreUnitAbout.name}</TypographyTitle>}
            </ResponsiveTitle>

            {!((phoneDimensions || lessPhone) && !hiddenTextDescription) && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {mipStatus && <StatusChip status={mipStatus as CuStatusEnum} />}
                <Row>
                  {newDate && (
                    <CustomLink
                      href={coreUnitAbout.cuMip[0].mipUrl || '#'}
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
            )}
          </ContainerSeparateData>
        </ContainerTitle>
        {(phoneDimensions || lessPhone) && (
          <div
            style={{
              width: '100%',
              marginTop: !hiddenTextDescription ? '16px' : '0px',
            }}
          />
        )}
        <ContainerCategoryConditional>
          {(!(phoneDimensions || lessPhone) || hiddenTextDescription) && (
            <CategoryContainer>
              {coreUnitAbout.category &&
                coreUnitAbout.category.map((item) => <CategoryChip key={item} category={item} />)}
            </CategoryContainer>
          )}
          {(phoneDimensions || lessPhone || tableDimensions) && hiddenTextDescription && (
            <ContainerLinks>
              <CuTableColumnLinks
                links={getLinksFromCoreUnit(coreUnitAbout as CoreUnitDto)}
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
            links={getLinksFromCoreUnit(coreUnitAbout as CoreUnitDto)}
            fill="#708390"
            spacings={16}
            fillDark="#ADAFD4"
          />
        </ContainerLinks>
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 400,
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '100%',
  },
});

const TypographyTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    color: isLight ? '#231536' : '#E2D8EE',
    marginLeft: '16px',
    marginRight: '24px',
    fontFamily: 'Inter, sans-serif',
    [lightTheme.breakpoints.between('table_375', 'table_834')]: {
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '19px',
      marginLeft: '4px',
      marginRight: '0px',
    },
    [lightTheme.breakpoints.down('table_375')]: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '19px',
      marginLeft: '4px',
      marginRight: '0px',
    },
  })
);

const TypographySES = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    color: isLight ? '#9FAFB9' : '#546978',
    fontFamily: 'Inter, sans-serif',
    [lightTheme.breakpoints.between('table_375', 'table_834')]: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '19px',
    },
    [lightTheme.breakpoints.down('table_375')]: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '19px',
    },
  })
);

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '4px',
});

const ContainerLinks = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  height: '68px',
  marginRight: '6px',
  [lightTheme.breakpoints.up('table_834')]: {
    width: '272px',
    alignItems: 'flex-start',
    height: 'fit-content',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: '4px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: '4px',
  },
});

const CircleContainer = styled.div({
  marginRight: '16px',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'none',
  },
});

const ContainerColum = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
});

const CategoryContainer = styled.div({
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
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '0px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
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
  [lightTheme.breakpoints.down('table_375')]: {
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
const ContainerCategoryConditional = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  width: '100%',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    flexDirection: 'row',
    marginTop: '16px',
  },
});

const ContainerSeparateData = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  width: '100%',
  [lightTheme.breakpoints.down('desktop_1194')]: {
    alignItems: 'center',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  [lightTheme.breakpoints.down('table_834')]: {
    flexWrap: 'wrap',
  },
});

const ResponsiveTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
    marginBottom: '6px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: 'auto',
    marginRight: '24px',
    marginBottom: '2px',
  },
});

export default TitleNavigationCuAbout;
