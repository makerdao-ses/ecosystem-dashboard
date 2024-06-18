import { styled } from '@mui/material';
import React from 'react';
import type { Auditor } from '@/core/models/interfaces/users';
import InlineUser from '@/views/EAAbout/components/InlineUser/InlineUser';
import type { FC } from 'react';

interface Props {
  auditors: Auditor[];
  auditorTitle: string;
}

const Auditors: FC<Props> = ({ auditors, auditorTitle }) => (
  <Container>
    {auditors.length > 0 ? (
      <AuditorsContainer>
        <Label>Auditors</Label>
        <AuditorsList>
          {auditors?.map((auditor) => (
            <AuditorItem key={auditor.id}>
              <InlineUserStyled username={auditor.username} />
            </AuditorItem>
          ))}
        </AuditorsList>
      </AuditorsContainer>
    ) : (
      <NoAuditorsMessage>{auditorTitle}</NoAuditorsMessage>
    )}
  </Container>
);
export default Auditors;

const Container = styled('div')({
  display: 'flex',
  width: '100%',
});

const AuditorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  padding: '17px 16px 16px 16px',
  borderRadius: 8,
  fontFamily: 'Inter, sans-serif',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  position: 'absolute',
  padding: '0px 8px 0px 8px',
  top: -8,
  left: 12,
  borderRadius: 4,
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[500],

  backgroundColor: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
}));

const AuditorsList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  [theme.breakpoints.up('tablet_768')]: {
    gap: 20,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },
}));

const AuditorItem = styled('div')({});

const NoAuditorsMessage = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans serif',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '24px',
  color: theme.palette.isLight ? '#546978 ' : '#9FAFB9',
  letterSpacing: '0px',
}));

const InlineUserStyled = styled(InlineUser)({
  '& div:nth-of-type(1)': {
    marginLeft: 0,
  },
});
