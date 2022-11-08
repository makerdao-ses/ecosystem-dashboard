import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { ButtonType } from '../../../../core/enums/button-type.enum';
import ControlledSwitches from '../../../components/button/switch-toogle/switch-component';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { CustomLink } from '../../../components/custom-link/custom-link';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import { Wrapper } from '../login/login';

export default () => {
  const [checked, setChecked] = useState(true);

  const handleChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <Wrapper>
      <Container>
        <ContainerInside>
          <CustomButton
            buttonType={ButtonType.Default}
            label="Close"
            style={{
              width: 86,
              height: 34,
              borderRadius: 22,
              position: 'absolute',
              top: 24,
              right: 24,
            }}
          />
          <CenterWrapper>
            <AvatarPlaceholder />
          </CenterWrapper>
          <CenterWrapper>
            <UserWrapper>
              <UserLabel>User</UserLabel>
            </UserWrapper>
          </CenterWrapper>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '32px',
            }}
          >
            <UserNameLabel>Username:</UserNameLabel>
            <UserLabelValue>LongForWisdom</UserLabelValue>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <UserNameLabel>Password:</UserNameLabel>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div style={{ marginRight: '4px' }}>
                <DotPassword />
              </div>
              <div style={{ marginRight: '4px' }}>
                <DotPassword />
              </div>
              <div style={{ marginRight: '4px' }}>
                <DotPassword />
              </div>
              <div style={{ marginRight: '4px' }}>
                <DotPassword />
              </div>
              <div style={{ marginRight: '4px' }}>
                <DotPassword />
              </div>
              <div style={{ marginRight: '4px' }}>
                <DotPassword />
              </div>
              <div style={{ marginRight: '4px' }}>
                <DotPassword />
              </div>
              <DotPassword />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '20px',
            }}
          >
            <CustomLink href="/auth/change-password" withArrow={false} target="self">
              Change user password
            </CustomLink>
          </div>
        </ContainerInside>
        <Line />
        <ButtonWrapper>
          <CustomButton
            label="Delete Account"
            style={{
              width: 151,
              height: 34,
              borderRadius: 22,
              borderColor: '#F75524',
            }}
            styleText={{
              color: '#F75524',
            }}
          />
          <ControlledSwitches
            checked={checked}
            handleChange={handleChange}
            label="Active"
            styleLabel={{
              color: !checked ? '#9FAFB9' : 'unset',
            }}
          />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

const UserWrapper = styled.div({
  marginTop: 16,
  marginBottom: 32,
});

const UserLabel = styled.p({
  color: '#9FAFB9',
  fontSize: 18,
  lineHeight: '22px',
  fontWeight: 600,
  margin: '0 8px 0 0',
});

const UserNameLabel = styled.p({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: '#708390',
  marginTop: '0px',
  marginBottom: '0px',
  marginRight: '8px',
});
const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 104,
  width: 343,
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
  '@media (min-width: 834px)': {
    width: '484px',
    top: 128,
  },
});

const CenterWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const UserLabelValue = styled.p({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  color: '#231536',
  marginTop: '0px',
  marginBottom: '0px',
});

const DotPassword = styled.div({
  width: 8,
  height: 8,
  background: '#231536',
  borderRadius: '50%',
});

const Line = styled.div({
  border: '1px solid #D4D9E1',
  width: '100%',
  marginBottom: '16px',
});

const ContainerInside = styled.div({
  marginBottom: '8px',
  padding: '24px',
  '@media (min-width: 834px)': {
    padding: '40px 64px',
  },
});

const ButtonWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',

  justifyContent: 'space-between',
  paddingLeft: '10px',
  paddingRight: '10px',
  marginBottom: '16px',
  alignItems: 'center',

  '@media (min-width: 834px)': {
    paddingLeft: '64px',
    paddingRight: '77px',
  },
});
