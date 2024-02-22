import { useMediaQuery, type Theme, styled } from '@mui/material';
import React from 'react';
import { HeaderRowSkeleton } from './HeaderRowSkeleton';
import RowSkeleton from './RowSkeleton';

interface Props {
  differentNumberOfRows?: boolean;
}

const BreakdownTableBodySkeleton: React.FC<Props> = ({ differentNumberOfRows = true }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  return (
    <Container>
      <Header>
        <HeaderRowSkeleton />
      </Header>
      {differentNumberOfRows ? (
        <Body>
          {isMobile && (
            <>
              <RowSkeleton numberItemsHeader={2} numberWith={[52, 39]} backgroundRow="white" />
              <RowSkeleton numberItemsHeader={2} numberWith={[59, 67]} backgroundRow="#F5F5F5" />
              <RowSkeleton numberItemsHeader={1} numberWith={[49]} backgroundRow="white" />
            </>
          )}
          {isTable && (
            <>
              <RowSkeleton numberItemsHeader={2} numberWith={[67, 94]} backgroundRow="white" />
              <RowSkeleton numberItemsHeader={1} numberWith={[104]} backgroundRow="#F5F5F5" />
              <RowSkeleton numberItemsHeader={1} numberWith={[54]} backgroundRow="white" />
            </>
          )}
        </Body>
      ) : (
        <Body>
          {isMobile && (
            <>
              <RowSkeleton numberItemsHeader={2} numberWith={[37, 53]} backgroundRow="white" />
              <RowSkeleton numberItemsHeader={2} numberWith={[54, 53]} backgroundRow="#F5F5F5" />
              <RowSkeleton numberItemsHeader={2} numberWith={[54, 53]} backgroundRow="white" />
              <RowSkeleton numberItemsHeader={2} numberWith={[40, 61]} backgroundRow="#F5F5F5" />
              <RowSkeleton numberItemsHeader={1} numberWith={[65, 46]} backgroundRow="white" />
            </>
          )}
          {isTable && (
            <>
              <RowSkeleton numberItemsHeader={1} numberWith={[122]} backgroundRow="white" />
              <RowSkeleton numberItemsHeader={1} numberWith={[120]} backgroundRow="#F5F5F5" />
              <RowSkeleton numberItemsHeader={2} numberWith={[127, 76]} backgroundRow="white" />
              <RowSkeleton numberItemsHeader={1} numberWith={[123]} backgroundRow="#F5F5F5" />
              <RowSkeleton numberItemsHeader={2} numberWith={[94, 114]} backgroundRow="white" />
            </>
          )}
        </Body>
      )}
    </Container>
  );
};

export default BreakdownTableBodySkeleton;

const Container = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(212, 217, 225, 0.15)' : '#31424E'}`,
  borderRadius: 6,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));
const Header = styled('div')({
  borderBottomRightRadius: 6,
  borderBottomLeftRadius: 6,
});
const Body = styled('div')({});
