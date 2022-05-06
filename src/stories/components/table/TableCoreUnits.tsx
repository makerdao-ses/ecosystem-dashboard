import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import './TableCore.scss';
import HeaderCoreUnit from './header/headerCoreUnit/HeaderCoreUnit';
import { gql, useQuery } from '@apollo/client';
import { CuStatusEnum, CutableColumnSummary } from '../cutable-column-summary/cutable-column-summary';
import { CutableColumnInitiatives } from '../cutable-column-initiatives/cutable-column-initiatives';
import { CutableColumnExpenditures } from '../cutable-column-expenditures/cutable-column-expenditures';
import { CustomChartItem } from '../custom-bar-chart/custom-bar-chart';
import { CutableColumnTeamMember } from '../cutable-column-team-member/cutable-column-team-member';
import { CutableColumnLinks, LinkModel, LinkType } from '../cutable-column-links/cutable-column-links';

type DataCoreUnits = {
  code: string,
  id: string,
  name: string,
}

const TableCoreUnits = () => {
  const GETCoreUnits = gql`
  query CoreUnits {
    coreUnits {
      id
      code
      name
    }
  }  
`;
  const { loading, error, data } = useQuery(GETCoreUnits);
  const members = [{ name: 'John Doe' }, { name: 'Billy Ferguson' }, { name: 'Jackie Chang' }, { name: 'Nicholas Tesla' }];
  const links: LinkModel[] = [{
    href: 'https://www.google.com',
    linkType: LinkType.WWW
  }, {
    href: 'https://www.google.com',
    linkType: LinkType.Forum
  }, {
    href: 'https://www.google.com',
    linkType: LinkType.Discord
  }, {
    href: 'https://www.google.com',
    linkType: LinkType.Twitter
  }, {
    href: 'https://www.google.com',
    linkType: LinkType.Youtube
  }, {
    href: 'https://www.google.com',
    linkType: LinkType.LinkedIn
  }];

  const items: CustomChartItem[] = [{ value: 28 }, { value: 23 }, { value: 41 }];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;
  return (
    <TableContainer className="container-table">
      <Table className='table'>
        <HeaderCoreUnit />
        <TableBody>
          {data?.coreUnits.map((row: DataCoreUnits, index: number) => {
            return (
              <TableRow key={index} style={{ margin: 5 }}>
                <TableCell width='35%' sx={{
                  paddingBottom: '32px', paddingTop: '16px',
                }}>
                  <CutableColumnSummary title={row.name} status={CuStatusEnum.Accepted} statusModified={new Date()} />
                </TableCell>
                <TableCell align='left' width="10%" sx={{
                  paddingBottom: '0px', paddingTop: '0px',
                }}>
                  <div style={{ display: 'flex', width: '100%' }}>  <CutableColumnInitiatives initiatives='6' /></div>
                </TableCell>
                <TableCell align='left' width='20%' sx={{
                  paddingBottom: '0px', paddingTop: '0px',
                }}>
                  <CutableColumnExpenditures items={items} percent={6} value={30} budgetCap={2} />
                </TableCell>
                <TableCell align='left' width="20%" sx={{
                  paddingBottom: '0px', paddingTop: '0px',
                }}>
                  <CutableColumnTeamMember members={members} fte={4} />
                </TableCell>
                <TableCell align='left' width='20%' sx={{
                  paddingBottom: '0px', paddingTop: '0px',
                }}>
                  <CutableColumnLinks links={links} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCoreUnits;
