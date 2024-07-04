import { styled } from '@mui/material';

interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <ContainerStyled className={className}>{children}</ContainerStyled>
);

export default Container;

const ContainerStyled = styled('div')(({ theme }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  width: '100%',
  maxWidth: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1200,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
}));
