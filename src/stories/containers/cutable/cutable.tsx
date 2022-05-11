import React from 'react';
import styled from '@emotion/styled';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';
import { CuCategory } from '../../../core/enums/cu-category';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { SearchInput } from '../../components/search-input/search-input';
import { CustomTable } from '../../components/custom-table/custom-table';
import { CutableColumnSummary } from '../../components/cutable-column-summary/cutable-column-summary';
import { CutableColumnInitiatives } from '../../components/cutable-column-initiatives/cutable-column-initiatives';
import { CutableColumnExpenditures } from '../../components/cutable-column-expenditures/cutable-column-expenditures';
import { CutableColumnTeamMember } from '../../components/cutable-column-team-member/cutable-column-team-member';
import { CutableColumnLinks, LinkType } from '../../components/cutable-column-links/cutable-column-links';
import { Box, Typography } from '@mui/material';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategory) as string[];
const headers = ['Core Units', 'Initiatives', 'Expenditure', 'Team Members', 'Links'];

export const CUTable = () => {
  const items = ['one', 'two', ['three']];

  const getItems = () => {
    return items.map(() => [
      // eslint-disable-next-line react/jsx-key
      <CutableColumnSummary
        title="SES Sustainable Ecosystem Scaling"
        status={CuStatusEnum.Accepted}
        statusModified={new Date()}
        imageUrl="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/92/77/53927729-28a4-b94a-40d9-9abbc9583078/source/512x512bb.jpg"
      />,
      // eslint-disable-next-line react/jsx-key
      <CutableColumnInitiatives
        initiatives={3}
      />,
      // eslint-disable-next-line react/jsx-key
      <CutableColumnExpenditures
        value={16500}
        percent={120}
        items={[{ value: 55 }, { value: 90 }, { value: 120 }]}
        budgetCap={100}
      />,
      // eslint-disable-next-line react/jsx-key
      <CutableColumnTeamMember
        members={[
          { name: 'John Doe' },
          { name: 'Billy Ferguson' },
          { name: 'Jackie Chang' },
        ]}
        fte={3.5}
      />,
      // eslint-disable-next-line react/jsx-key
      <CutableColumnLinks
        links={[
          {
            linkType: LinkType.WWW,
            href: '#',
          },
          {
            linkType: LinkType.Forum,
            href: '#',
          },
          {
            linkType: LinkType.Discord,
            href: '#',
          },
          {
            linkType: LinkType.Twitter,
            href: '#',
          },
          {
            linkType: LinkType.Youtube,
            href: '#',
          },
          {
            linkType: LinkType.LinkedIn,
            href: '#',
          },
        ]}
      />
    ]);
  };

  return <ContainerHome>
    <Box
      component="main"
      sx={{
        px: '12px',
        flexGrow: 1,
        overflow: 'auto',
        mt: 4,
        mb: 4
      }}
    >
      <Header>
        <Title>Core Units: </Title>
        <CustomMultiSelect label={'Status'} items={statuses} />
        <CustomMultiSelect label={'Category'} items={categories} />
        <Separator />
        <SearchInput label={'Search CUs'} placeholder={'Search CUs by name or Code'} />
      </Header>
      <CustomTable
        headers={headers}
        items={getItems()}
        headersAlign={['left', 'center', 'left', 'left', 'left']}
      />
    </Box >
  </ContainerHome>;
};

const ContainerHome = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
});

const Title = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 600,
  flex: 1,
}));

const Separator = styled.span({
  width: '1px',
  height: '40px',
  backgroundColor: '#D3D4D8',
  margin: 'auto 24px'
});
