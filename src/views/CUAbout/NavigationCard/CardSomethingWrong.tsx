import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { CustomLink } from '@/stories/components/CustomLink/CustomLink';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SES_DASHBOARD, TYPE_FORM } from '../../../core/utils/const';
import InformationCard from './InformationCard';

interface Props {
  width?: string;

  title?: string;
  linkText?: string;
}

const CardSomethingWrong = ({
  width,

  title = 'Is this your core unit?',
  linkText = 'Join SES discord #dashboard-reporting channel',
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <StyledInformationCard title="Something Wrong on this Page?" width={width} padding="16px 16px 24px 16px">
      <TypographyDescription marginBottom={'16px'} isLight={isLight}>
        {title}
      </TypographyDescription>
      <TypographyDescription marginBottom={'16px'} isLight={isLight}>
        We are still collecting all the relevant information.
      </TypographyDescription>
      <StyledTypographyDescription marginBottom={'14px'} isLight={isLight}>
        If you see something that needs updating, don't hesitate to contact us.
      </StyledTypographyDescription>
      <StyledLink
        href={SES_DASHBOARD}
        fontSize={16}
        fontWeight={500}
        iconWidth={10}
        iconHeight={10}
        marginLeft="7px"
        fontFamily="Inter, sans-serif"
      >
        {linkText}
      </StyledLink>
      <br />
      <CustomLinkTypeForm
        href={TYPE_FORM}
        iconWidth={10}
        iconHeight={10}
        fontSize={16}
        fontWeight={500}
        marginLeft="7px"
        fontFamily="Inter, sans-serif"
      >
        Or fill out this Typeform
      </CustomLinkTypeForm>
    </StyledInformationCard>
  );
};

export default CardSomethingWrong;

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  marginBottom?: string;
  isLight: boolean;
}>(({ isLight, marginBottom }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '15px',
  letterSpacing: ' 0.4px',
  color: isLight ? '#546978 ' : '#9FAFB9',
  marginBottom: marginBottom || '0px',
}));

const StyledInformationCard = styled(InformationCard)({
  width: '100%',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 383,
    minHeight: 212,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 405,
  },
});

const StyledLink = styled(CustomLink)({
  flexWrap: 'wrap',
  color: '#447AFB',
  letterSpacing: 'revert',
  lineHeight: '18px',
  marginBottom: '12px',
  marginLeft: '0px',
  whiteSpace: 'break-spaces',
  display: 'inline-block',

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingRight: 0,
  },
});

const StyledTypographyDescription = styled(TypographyDescription)({
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 16,
  },
});

const CustomLinkTypeForm = styled(CustomLink)({
  color: '#447AFB',
  letterSpacing: 'revert',
  lineHeight: '18px',

  marginLeft: '0px',
});
