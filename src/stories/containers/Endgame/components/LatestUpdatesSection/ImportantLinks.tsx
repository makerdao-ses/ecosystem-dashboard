import { styled, useMediaQuery } from '@mui/material';
import ExternalLink from '@ses/components/ExternalLink/ExternalLink';
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
        <NoKeyContainer>
          <NoKeyResults>No Key Results</NoKeyResults>
        </NoKeyContainer>
      ) : (
        <LinksList>
          {links.map((link, index) => (
            <LinkItem key={index}>
              <ImportantLink href={link.href} target="_blank" wrapText>
                {link.label}
              </ImportantLink>
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
  borderRadius: 6,
  padding: '0 8px 8px',
  overflow: 'hidden',
  background: theme.palette.mode === 'light' ? 'rgba(246, 248, 249, 0.5)' : 'red',

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 344,
    padding: '0 16px 16px',
  },
}));

const Header = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
  background: theme.palette.mode === 'light' ? 'rgba(236, 239, 249, 0.5)' : 'red',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  padding: '2px 16px',
  margin: '0 -8px',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    padding: '2px 24px',
    margin: '0 -16px',
  },
}));

const NoKeyContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
  height: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    paddingBottom: 8,
  },
}));

const NoKeyResults = styled('span')({
  color: '#546978',
  fontSize: 16,
  fontStyle: 'italic',
  lineHeight: '18px',
  padding: '16px 0',
});

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

const ImportantLink = styled(ExternalLink)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  paddingLeft: 22,
  position: 'relative',
  gap: 6,
  display: 'flex',
  width: '100%',
  whiteSpace: 'nowrap',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '18px',
  },

  '& > span': {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'fit-content',
  },

  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 8,
    top: 6,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#447AFB',
  },
}));
