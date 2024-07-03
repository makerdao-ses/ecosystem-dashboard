import { styled } from '@mui/material';
import React from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import AccountsSnapshot from './AccountsSnapshot';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { ResourceType } from '@ses/core/models/interfaces/types';

interface TemporaryContainerProps {
  snapshot: Snapshots;
  snapshotOwner: string;
  resourceType: ResourceType;
}

const TemporaryContainer: React.FC<TemporaryContainerProps> = ({ snapshot, snapshotOwner, resourceType }) => (
  <PageContainer>
    <Container>
      <Title>Account Snapshot</Title>

      <AccountsSnapshot snapshot={snapshot} snapshotOwner={snapshotOwner} resourceType={resourceType} />
    </Container>
  </PageContainer>
);

export default TemporaryContainer;

const Title = styled('h1')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginTop: 32,
  marginBottom: 32,
}));
