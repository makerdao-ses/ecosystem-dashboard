import { styled, useTheme } from '@mui/material';
import React from 'react';
import { HeaderRowSkeleton } from './HeaderRowSkeleton';
import RowSkeleton from './RowSkeleton';

interface Props {
  differentNumberOfRows?: boolean;
}

const BreakdownTableBodySkeleton: React.FC<Props> = ({ differentNumberOfRows = true }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Container>
      <Header>
        <HeaderRowSkeleton />
      </Header>
      {differentNumberOfRows ? (
        <Body>
          <Mobile>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[52, 39]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[59, 67]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[49]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Mobile>

          <Tablet>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Tablet>

          <Desk1024>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Desk1024>

          <Desk1280>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Desk1280>

          <Desk1440>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[67, 94]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[104]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[54]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Desk1440>
        </Body>
      ) : (
        <Body>
          <Mobile>
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[37, 53]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[54, 53]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[54, 53]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[40, 61]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[65, 46]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Mobile>

          <Tablet>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[127, 76]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[94, 114]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Tablet>

          <Desk1024>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[109, 73]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={2}
              numberWith={[94, 114]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Desk1024>

          <Desk1280>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[146]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[148]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Desk1280>

          <Desk1440>
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[122]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[120]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[146]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[123]}
              backgroundRow={isLight ? '#F5F5F5' : 'rgb(24, 37, 46, 0.3)'}
            />
            <RowSkeleton
              numberItemsHeader={1}
              numberWith={[148]}
              backgroundRow={isLight ? 'white' : 'rgb(31, 45, 55, 0.4)'}
            />
          </Desk1440>
        </Body>
      )}
    </Container>
  );
};

export default BreakdownTableBodySkeleton;

const Container = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(212, 217, 225, 0.15)' : 'none'}`,
  borderRadius: 6,
  overflow: 'hidden',
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

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
const Tablet = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Desk1024 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Desk1280 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
const Desk1440 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
