import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import { Breadcrumbs } from '../breadcrumbs';

interface Props {
  items: {
    label: string | JSX.Element;
    url: string;
  }[];
  isLight: boolean;
}

const CustomBreadCrumbs = ({ items, isLight }: Props) => (
  <StyledBreadcrumbs items={items} isLight={isLight} className="crumb-container" />
);

const StyledBreadcrumbs = styled(Breadcrumbs)<{ isLight: boolean }>(({ isLight }) => ({
  maxWidth: '343px',
  alignItems: 'center',
  margin: '0px auto',
  padding: '9px 8px',
  borderRadius: '6px',
  display: 'flex',
  height: 32,
  justifyContent: 'flex-start',
  marginTop: 16,
  marginBottom: 16,
  fontWeight: 400,
  background: isLight ? '#ECF1F3' : '#000A13',
  '&.crumb-container': {
    width: '100%',
    [lightTheme.breakpoints.up('table_834')]: {
      background: 'none',
      maxWidth: '768px',
      padding: 0,
      marginBottom: 24,
      marginTop: 0,
      height: 74,
    },
    [lightTheme.breakpoints.up('desktop_1194')]: {
      background: 'none',
      maxWidth: '1130px',

      marginTop: 0,
      marginBottom: 24,
    },
    [lightTheme.breakpoints.up('desktop_1280')]: {
      background: 'none',
      maxWidth: '1184px',
      marginBottom: 24,
      marginTop: 0,
    },

    [lightTheme.breakpoints.up('desktop_1440')]: {
      background: 'none',
      maxWidth: '1376px',

      marginBottom: 24,
      marginTop: 0,
    },
    [lightTheme.breakpoints.up('desktop_1920')]: {
      background: 'none',
      maxWidth: '1855px',
      marginBottom: 24,
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
      [lightTheme.breakpoints.between('table_375', 'table_834')]: {
        lineHeight: '13px',
        letterSpacing: 0,
      },
      [lightTheme.breakpoints.up('table_834')]: {
        fontSize: '16px',
        lineHeight: '22px',
        marginRight: 15,

        ':last-child': {
          marginLeft: 15,
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

export default CustomBreadCrumbs;
