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
    borderBottom: '2px solid',

    borderImageSource:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 113.28%),linear-gradient(0deg, rgba(230, 233, 237, 0.3), rgba(230, 233, 237, 0.3))',
  },
}));
