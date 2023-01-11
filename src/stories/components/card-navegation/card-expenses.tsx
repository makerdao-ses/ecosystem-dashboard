import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ButtonType } from '../../../core/enums/button-type.enum';
import { AuditorDto } from '../../../core/models/dto/core-unit.dto';
import { MAKER_BURN_LINK } from '../../../core/utils/const';
import { getShortCode } from '../../../core/utils/string.utils';
import { DividerStyle } from '../../containers/cu-about-2/cu-about-container-2';
import InlineUser from '../../containers/transparency-report/common/inline-user/inline-user';
import { CustomButton } from '../custom-button/custom-button';
import { CustomLink } from '../custom-link/custom-link';
import InformationCard from './information-card';

interface Props {
  onClickFinances: () => void;
  onClickActivity: () => void;
  code: string;
  auditors?: AuditorDto[];
  isTitlePresent?: boolean;
  style?: React.CSSProperties;
  styleContainer?: React.CSSProperties;
  buttonWidth?: string;
}

const CardExpenses = ({
  onClickActivity,
  onClickFinances,
  code,
  auditors,
  isTitlePresent = true,
  style = {},
  styleContainer = {},
  buttonWidth,
}: Props) => {
  const { isLight } = useThemeContext();
  const isPhone = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));

  return (
    <InformationCard
      fontWeight={600}
      title="Expenses"
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
          {`View all expenses of the ${getShortCode(code)} Core Unit`}
        </TypographyDescription>

        <ContainerButton>
          <CustomButton
            buttonType={ButtonType.Secondary}
            widthText="100%"
            label="Activity Feed"
            style={{
              textAlign: 'center',
              borderRadius: '22px',
              height: ' 34px',
              fontFamily: 'Inter, sans serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              width: buttonWidth,
              marginRight: '12px',
              flexGrow: 1,
              padding: isPhone || isTable ? '8px 25.75px' : '8px 43.25px',
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={onClickActivity}
          />
          <CustomButton
            buttonType={ButtonType.Primary}
            widthText="100%"
            label="Expense Reports"
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
              marginLeft: '12px',
              flexGrow: 1,
              padding: isPhone || isTable ? '8px 12.75px' : '8px 30.25px',
            }}
            onClick={onClickFinances}
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
          children={`View on-chain transfers to ${getShortCode(code)} Core Unit on makerburn.com`}
        />
      </ContainerLinks>

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
        <NoAuditorsMessage isLight={isLight}>
          The {getShortCode(code)} Core Unit is currently working without auditor
        </NoAuditorsMessage>
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
  flexDirection: 'row',
  justifyContent: 'space-between',
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
});

const Auditor = styled.div({
  marginTop: 16,

  '&:not(:last-of-type)': {
    marginRight: 40,
  },
});
