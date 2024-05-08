import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { getMipsStatus } from '../../../core/businessLogic/coreUnitAbout';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { getMipTitle } from '../../../core/utils/string';
import { CustomLink } from '../CustomLink/CustomLink';
import { StatusChip } from '../StatusChip/StatusChip';
import ExternalLinkArrow from '../svg/external-link-arrow';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';
import type { CuMipStatus } from '@ses/core/models/interfaces/types';

export type RelateMipType = {
  status: CuMipStatus;
  statusModified: Date;
  mipTitle?: string;
  href: string;
};

interface Props {
  relateMips: CuMip;
}

const RelateMips = ({ relateMips }: Props) => {
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const mips = getMipsStatus(relateMips || '');
  const mipStatus = relateMips.mipStatus;
  const newDate = mips ? DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate() : null;
  const pieces = getMipTitle(relateMips.mipTitle);
  return (
    <Content isLight={isLight}>
      <Row>
        {mipStatus && <StatusChip status={mipStatus as CuMipStatus} />}
        {newDate && (
          <SinceDate isLight={isLight}>Since {DateTime.fromJSDate(newDate).toFormat('dd-MM-yyyy')}</SinceDate>
        )}
      </Row>
      {pieces.length === 2 && (
        <RowUnderLine>
          <StyleMipNumber isLight={isLight}>{`${pieces[0]}:`}</StyleMipNumber>
          <ContainerIconTypography>
            <CustomLink
              href={relateMips.mipUrl}
              withArrow
              iconWidth={10}
              iconHeight={10}
              marginLeft="7px"
              style={{
                whiteSpace: 'pre-line',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: isTable ? '14px' : '16px',
                lineHeight: '18px',
                letterSpacing: '0.3px',
                color: '#447AFB',
                marginLeft: '0px',
              }}
            >
              {pieces[1]}
            </CustomLink>
          </ContainerIconTypography>
        </RowUnderLine>
      )}
      {pieces.length === 1 && (
        <RowUnderLine>
          <Typography color="#447AFB" fontFamily={'Inter, sans-serif'}>
            {relateMips.mipTitle}
          </Typography>
          <ArrowLinkContainer>
            <ExternalLinkArrow href={`${relateMips.mipUrl}` || '#'} />
          </ArrowLinkContainer>
        </RowUnderLine>
      )}
    </Content>
  );
};
export default RelateMips;
const Content = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  width: '620px',
  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
  [lightTheme.breakpoints.between('mobile_375', 445)]: {
    width: '343px',
  },
  [lightTheme.breakpoints.between(446, 832)]: {
    width: 'calc(100vw - 35px)',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    maxWidth: '360px',
  },
}));

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginBottom: '32px',
});

const RowUnderLine = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    flexDirection: 'column',
  },
});

const SinceDate = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#708390',
  textDecoration: 'none',
  marginLeft: '4px',
}));

const ArrowLinkContainer = styled.span({
  display: 'flex',
  marginLeft: '9px',
});

const ContainerIconTypography = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginTop: '4px',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    marginTop: '4px',
  },
});

const StyleMipNumber = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontSize: '14px',
    maxWidth: '135px',
    minWidth: 'fit-content',
    display: 'inline-block',
    marginRight: '4px',
    fontStyle: 'normal',
    fontFamily: 'Inter, sans-serif',
    color: isLight ? '#231536' : '#D2D4EF',
    fontWeight: 600,
    paddingTop: '2px',
    lineHeight: '22px',
    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: '16px',
    },
  })
);
