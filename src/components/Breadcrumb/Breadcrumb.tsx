import { styled } from '@mui/material';
import Container from '@/components/Container/Container';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = () => (
  <BreadcrumbCard>
    <Container>breadcrumb</Container>
  </BreadcrumbCard>
);

export default Breadcrumb;

const BreadcrumbCard = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    borderBottom: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[50] : 'red'}`,
  },
}));
