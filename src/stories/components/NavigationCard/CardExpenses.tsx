import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { ResourceType } from '@ses/core/models/interfaces/types';
import React from 'react';
import { DividerStyle } from '@/views/CUAbout/CuAboutView';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ButtonType } from '../../../core/enums/buttonTypeEnum';
import { MAKER_BURN_LINK } from '../../../core/utils/const';
import InlineUser from '../../containers/TransparencyReport/components/InlineUser/InlineUser';
import { CustomLink } from '../CustomLink/CustomLink';
import { LinkButton } from '../LinkButton/LinkButton';
import InformationCard from './InformationCard';
import type { AuditorDto } from '../../../core/models/dto/coreUnitDTO';

interface Props {
  code: string;
  shortCode: string;
  resource?: ResourceType;
  auditors?: AuditorDto[];
  isTitlePresent?: boolean;
  style?: React.CSSProperties;
  styleContainer?: React.CSSProperties;
  buttonWidth?: string;
  queryStrings: string;
  titleCard?: string;
  auditorMessage?: string;
  makerburnCustomMessage?: string;
  showMakerburnLink?: boolean;
  budgetPath: string;
}

const CardExpenses = ({
  code,
  shortCode,
  resource = ResourceType.CoreUnit,
  auditors,
  isTitlePresent = true,
  style = {},
  styleContainer = {},
  buttonWidth,
  queryStrings,
  titleCard,
  auditorMessage,
  makerburnCustomMessage,
  showMakerburnLink = true,
  budgetPath,
}: Props) => {
  const { isLight } = useThemeContext();
  const title = titleCard ?? `View all expenses of the ${shortCode} Core Unit.`;
  const textLink = resource === ResourceType.CoreUnit ? 'Core Unit' : 'Ecosystem Actor';
  const auditorTitle = auditorMessage ?? `${shortCode} Core Unit is currently working without auditor.`;
  const isPhone = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));

  return (
    <InformationCard
      fontWeight={600}
      title="Finances"
      fontSize="24px"
      lineHeight="29px"
      style={style}
      isTitlePresent={isTitlePresent}
      color={isLight ? '#231536' : '#D2D4EF'}
      styleContainer={styleContainer}
    >
      <div
        style={{
          paddingTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <TypographyDescription marginBottom={'24px'} isLight={isLight} variant="subtitle1">
          {title}
        </TypographyDescription>

        <ContainerButton>
          {resource === ResourceType.CoreUnit && (
            <LinkButton
              href={`/core-unit/${shortCode}/activity-feed${queryStrings}`}
              buttonType={ButtonType.Secondary}
              widthText="100%"
              label="Activity Feed"
              style={{
                textAlign: 'center',
                borderRadius: '22px',
                height: '34px',
                fontFamily: 'Inter, sans serif',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '18px',
                width: buttonWidth,
                flexGrow: 1,
                padding: isPhone || isTable ? '8px 12.75px' : '8px 43.25px',
              }}
            />
          )}

          <LinkButton
            buttonType={ButtonType.Primary}
            widthText="100%"
            label="Budget Statements"
            style={{
              textAlign: 'center',
              borderRadius: '22px',
              height: ' 34px',
              fontFamily: 'Inter, sans serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              letterSpacing: '0px',
              width: buttonWidth,
              flexGrow: 1,
              padding: isPhone || isTable ? '8px 12.75px' : '8px 30.25px',
            }}
            href={`${
              resource === ResourceType.CoreUnit
                ? siteRoutes.coreUnitReports(shortCode)
                : siteRoutes.ecosystemActorReports(shortCode)
            }${queryStrings}`}
          />
          <LinkButton
            buttonType={ButtonType.Primary}
            widthText="100%"
            label="Finances"
            style={{
              textAlign: 'center',
              borderRadius: '22px',
              height: ' 34px',
              fontFamily: 'Inter, sans serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              letterSpacing: '0px',
              width: buttonWidth,
              flexGrow: 1,
              padding: isPhone || isTable ? '8px 12.75px' : '8px 30.25px',
            }}
            href={`/finances/${budgetPath}/${queryStrings}`}
          />
        </ContainerButton>
      </div>
      <DividerStyle
        sx={{
          bgcolor: isLight ? '#D4D9E1' : '#405361',
          marginTop: '16px',
          marginBottom: '16px',
        }}
      />
      {showMakerburnLink ? (
        <ContainerLinks>
          <CustomLink
            href={`${MAKER_BURN_LINK}/${code}`}
            style={{
              marginLeft: '0px',
              paddingRight: '0px',
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '18px',
              whiteSpace: 'normal',
              display: 'inline-block',
            }}
            target="_blank"
            children={makerburnCustomMessage ?? `View On-Chain transfers to ${shortCode} ${textLink} on makerburn.com`}
          />
        </ContainerLinks>
      ) : (
        ''
      )}

      {(auditors || []).length > 0 ? (
        <AuditorsContainer>
          <AuditorTitle isLight={isLight}>Auditors</AuditorTitle>
          <Auditors>
            {auditors?.map((auditor) => (
              <Auditor key={auditor.id}>
                <InlineUser username={auditor.username} />
              </Auditor>
            ))}
          </Auditors>
        </AuditorsContainer>
      ) : (
        <NoAuditorsMessage isLight={isLight}>{auditorTitle}</NoAuditorsMessage>
      )}
    </InformationCard>
  );
};

export default CardExpenses;

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  marginBottom?: string;
  isLight: boolean;
}>(({ isLight, marginBottom }) => ({
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '24px',
  color: isLight ? '#546978 ' : '#9FAFB9',
  letterSpacing: '0px',
  marginBottom: marginBottom || '0px',
}));

const ContainerButton = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  // justifyContent: 'space-between',
});

const ContainerLinks = styled.div({
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingBottom: '24px',
});

const AuditorsContainer = styled.div({
  padding: '8px 16px 24px',
});

const NoAuditorsMessage = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  padding: '8px 16px 24px',
  fontFamily: 'Inter, sans serif',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '24px',
  color: isLight ? '#546978 ' : '#9FAFB9',
  letterSpacing: '0px',
}));

const AuditorTitle = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '15px',
  color: isLight ? '#708390' : '#546978',
  textTransform: 'uppercase',
}));

const Auditors = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
});

const Auditor = styled.div({
  marginTop: 16,

  '&:not(:last-of-type)': {
    marginRight: 40,
  },
});
