import { styled } from '@mui/material';

interface FilterAsListBaseProps extends React.PropsWithChildren {
  label: string;
}

const FilterAsListBase: React.FC<FilterAsListBaseProps> = ({ children, label }) => (
  <Container>
    <Label>{label}</Label>
    <ListContainer>{children}</ListContainer>
  </Container>
);

export default FilterAsListBase;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : 'red',
  paddingLeft: 8,
}));

const ListContainer = styled('div')(({ theme }) => ({
  borderRadius: 12,
  overflow: 'hidden',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'red',
  boxShadow: theme.palette.isLight ? '0 0 17.4px rgba(30, 33, 36, 0.03) inset' : '0px 4px 8px red inset',
}));
