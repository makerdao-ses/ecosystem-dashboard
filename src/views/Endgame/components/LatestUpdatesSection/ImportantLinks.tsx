import { styled, useMediaQuery } from '@mui/material';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { Theme } from '@mui/material';

export interface ImportantLink {
  href: string;
  label: string;
}

export interface ImportantLinksProps {
  links: ImportantLink[];
}

const ImportantLinks: React.FC<ImportantLinksProps> = ({ links }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  if (isMobile && links.length === 0) return null;

  return (
    <Content>
      <Header>Important Links</Header>

      {links.length === 0 ? (
        <NoResultsContainer>
          <NoResults>No Important Links</NoResults>
        </NoResultsContainer>
      ) : (
        <LinksList>
          {links.map((link, index) => (
            <LinkItem key={index}>
              <ExternalLinkButton href={link.href} wrapText={false}>
                {link.label}
              </ExternalLinkButton>
            </LinkItem>
          ))}
        </LinksList>
      )}
    </Content>
  );
};

export default ImportantLinks;

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderRadius: 12,
  padding: '0 8px 8px',
  overflow: 'hidden',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 271,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 374,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 344,
  },
}));

const Header = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[400],
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  padding: '0px 8px 2px',
  margin: '0 -8px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '2px 8px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const NoResultsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
  height: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    paddingBottom: 8,
  },
}));

const NoResults = styled('span')(({ theme }) => ({
  color: theme.palette.colors.slate[100],
  fontSize: 14,
  lineHeight: '22px',
  paddingTop: 8,
  paddingLeft: 8,
}));

const LinksList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  padding: 0,
  height: '100%',
});

const LinkItem = styled('li')(() => ({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  position: 'relative',
}));
