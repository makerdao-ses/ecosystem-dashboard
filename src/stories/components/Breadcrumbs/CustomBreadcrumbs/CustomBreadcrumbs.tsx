import { styled } from '@mui/material';
import Breadcrumbs from '../Breadcrumbs';

interface Props {
  items: {
    label: string | JSX.Element;
    url: string;
  }[];
}

const CustomBreadcrumbs = ({ items }: Props) => <StyledBreadcrumbs items={items} className="crumb-container" />;

export default CustomBreadcrumbs;

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  alignItems: 'center',
  margin: '0px auto',
  padding: '9px 8px',
  borderRadius: '6px',
  display: 'flex',
  height: 32,
  justifyContent: 'flex-start',
  fontWeight: 400,
  background: theme.palette.isLight ? '#ECF1F3' : '#000A13',

  '&.crumb-container': {
    width: '100%',

    [theme.breakpoints.up('tablet_768')]: {
      background: 'none',
      padding: '0 32px',
      marginTop: 0,
      height: 50,
      letterSpacing: '0.4px',
    },

    [theme.breakpoints.up('desktop_1280')]: {
      padding: '0 48px',
    },

    [theme.breakpoints.up('desktop_1440')]: {
      padding: '0 32px',
    },

    '& .crumb': {
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0,
      marginRight: 6,
      fontWeight: 400,

      ':last-child': {
        letterSpacing: 0,
        marginLeft: 4,
        fontWeight: 600,
      },

      [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
        lineHeight: '13px',
        letterSpacing: 0,
      },

      [theme.breakpoints.up('tablet_768')]: {
        fontSize: '16px',
        lineHeight: '22px',
        marginRight: 15,
        marginTop: -2,

        ':last-child': {
          marginLeft: 16,
          lineHeight: '19px',
          fontWeight: 700,
          marginTop: 2,
        },
      },

      [theme.breakpoints.up('desktop_1024')]: {
        border: 'none',

        ':last-child': {
          marginLeft: 16,
          lineHeight: '19px',
          fontWeight: 700,
        },
      },
    },

    '& svg': {
      width: 5,
      height: 10,
      [theme.breakpoints.up('tablet_768')]: {
        width: 10,
        height: 20,
      },
    },
  },
}));
