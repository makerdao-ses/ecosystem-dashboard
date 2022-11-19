import styled from '@emotion/styled';
import { IconProps } from '@mui/material';
import React, { ReactElement } from 'react';

import { Close } from '../svg/close';

interface Props {
  message?: string;
  icon: ReactElement<IconProps>;
  widthContainer?: number;
  borderColor?: string;
}

const Notification = ({
  message = 'Your account has been removed',
  icon,
  widthContainer = 457,
  borderColor = '#B6EDE7',
}: Props) => {
  return (
    <Container width={widthContainer} borderColor={borderColor}>
      <div>{icon}</div>
      <ContainerText>{message}</ContainerText>
      <Close width={10} height={10} />
    </Container>
  );
};

const Container = styled.div<{ width: number; borderColor: string }>(({ width = 475, borderColor }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 80,
  width,
  background: '#FFFFFF',
  border: `6px solid ${borderColor}`,
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '22px',
  padding: '32px 24px',
}));

const ContainerText = styled.p({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: '#231536',
  marginTop: 0,
  marginBottom: 0,
});

export default Notification;
