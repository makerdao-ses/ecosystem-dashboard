import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import TextInput from '@ses/components/TextInput/TextInput';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import Image from 'next/image';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { FormikProps } from 'formik';

export type LoginFormProps = {
  form: FormikProps<{ username: string; password: string }>;
  clearErrors: () => void;
  hasUserInactive: boolean;
  loading: boolean;
  error: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, clearErrors, hasUserInactive, loading, error }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));

  return (
    <Container>
      <Image src={'/assets/img/ses-logo-64x64.png'} alt="logo" width={64} height={64} />
      <Title isLight={isLight}>Log In</Title>
      <Description isLight={isLight}>
        Enter your username and password to get access to the administration area.
      </Description>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <InputsWrapper>
          <TextInput
            name="username"
            style={{ marginBottom: 32 }}
            placeholder="Username"
            value={form.values.username}
            onChange={(e) => {
              clearErrors();
              form.handleChange(e);
            }}
            onBlur={form.handleBlur}
            error={
              (form.touched.username && form.errors.username) ||
              (hasUserInactive && 'Account disabled. Reach admin for more info.')
            }
            disabled={loading}
          />
          <TextInput
            name="password"
            placeholder="Password"
            value={form.values.password}
            onChange={(e) => {
              clearErrors();
              form.handleChange(e);
            }}
            onBlur={form.handleBlur}
            error={(form.touched.password && form.errors.password) ?? error}
            type="password"
            disabled={loading}
            errorAbsolutePosition={true}
          />
        </InputsWrapper>
        <ButtonWrapper>
          <CustomButton
            label="Log In"
            onClick={form.submitForm}
            style={{
              height: isMobile || isTable ? '34px' : '48px',
              width: isMobile ? '93px' : isTable ? '89px' : '127px',
              ...(isMobile || isTable ? { borderColor: isLight ? '#25273D' : '#343442' } : {}),
            }}
            type="submit"
            disabled={loading || !!error || Object.keys(form.errors).length > 0}
          />
        </ButtonWrapper>
      </Form>

      <RequestContainer>
        <RequestText isLight={isLight}>Don't have your Log In credentials yet?</RequestText>
        <CustomLink
          href="https://discord.gg/UJpfgQDA"
          style={{
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '18px',
            letterSpacing: 'normal',
            marginLeft: 0,
          }}
          iconHeight={10}
          iconWidth={10}
          target="_blank"
        >
          Request Access
        </CustomLink>
      </RequestContainer>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  textAlign: 'center',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 24,
  marginBottom: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 40,
    fontSize: 32,
    lineHeight: '39px',
  },
}));

const Description = styled.h3<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  textAlign: 'center',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 42,
  maxWidth: 294,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: '100%',
    marginBottom: 64,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 42,
  },
}));

export const ButtonWrapper = styled.div({
  alignSelf: 'flex-end',
});

export const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 40,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 64,
  },
});

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const RequestContainer = styled.div({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  marginTop: 48,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 40,
  },
});

const RequestText = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  marginBottom: 2,
  color: isLight ? '#231536' : '#D2D4EF',
}));
