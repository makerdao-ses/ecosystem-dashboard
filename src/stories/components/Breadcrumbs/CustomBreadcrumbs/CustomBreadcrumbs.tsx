import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import Breadcrumbs from '../Breadcrumbs';

interface Props {
  items: {
    label: string | JSX.Element;
    url: string;
  }[];
  isLight: boolean;
}

const CustomBreadcrumbs = ({ items, isLight }: Props) => (
  <StyledBreadcrumbs items={items} isLight={isLight} className="crumb-container" />
);

export default CustomBreadcrumbs;

const StyledBreadcrumbs = styled(Breadcrumbs)<{ isLight: boolean }>(({ isLight }) => ({
  alignItems: 'center',
  margin: '0px auto',
  padding: '9px 8px',
  borderRadius: '6px',
  display: 'flex',
  height: 32,
  justifyContent: 'flex-start',
  fontWeight: 400,
  background: isLight ? '#ECF1F3' : '#000A13',

  '&.crumb-container': {
    width: '100%',

    [lightTheme.breakpoints.up('table_834')]: {
      background: 'none',
      padding: '0 32px',
      marginTop: 0,
      height: 50,
      letterSpacing: '0.4px',
    },

    [lightTheme.breakpoints.up('desktop_1280')]: {
      padding: '0 48px',
    },

    [lightTheme.breakpoints.up('desktop_1440')]: {
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

      [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
        lineHeight: '13px',
        letterSpacing: 0,
      },

      [lightTheme.breakpoints.up('table_834')]: {
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

      [lightTheme.breakpoints.up('desktop_1194')]: {
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
      [lightTheme.breakpoints.up('table_834')]: {
        width: 10,
        height: 20,
      },
    },
  },
}));
