import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';

interface Props {
  name?: string;
  coreUnitCode?: string;
  auditor?: boolean;
  auditorsName: string[];
}

const CardParticipants = ({ name, coreUnitCode, auditor = true, auditorsName }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight}>
      <SectionTitle isLight={isLight}>{`${coreUnitCode} Core Unit`}</SectionTitle>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AvatarPlaceholder width={24} height={24} />
        <Label isLight={isLight}>{name}</Label>
      </div>
      {auditor && (
        <div style={{ marginTop: '32px' }}>
          <SectionTitle isLight={isLight}>Auditor</SectionTitle>

          {auditorsName.map((name: string) => {
            return (
              <ItemsContainer>
                <AvatarPlaceholder width={24} height={24} />
                <Label isLight={isLight}>{name}</Label>
              </ItemsContainer>
            );
          })}
        </div>
      )}
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  width: '240px',
  padding: '24px 16px',
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
  borderRadius: '6px',
}));

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginLeft: '8px',
}));

const SectionTitle = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: isLight ? '#9FAFB9' : '#546978',
  marginBottom: '16px',
}));

const ItemsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '16px',
  ':last-child': {
    marginBottom: '0px',
  },
});

export default CardParticipants;
