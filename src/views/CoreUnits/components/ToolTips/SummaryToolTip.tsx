import { styled, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { CircleAvatar } from '@/stories/components/CircleAvatar/CircleAvatar';

interface Props {
  code: string;
  name: string;
  imageUrl: string;
  status: TeamStatus;
  statusModified?: Date | null;
  href: string;
  categories: TeamCategory[];
}

export const SummaryToolTip: React.FC<Props> = ({ imageUrl, code, name, status, href, statusModified, categories }) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  return (
    <Container>
      <RowContainer>
        <Avatar>
          <CircleAvatarStyled
            width={'100%'}
            border="none"
            height={'100%'}
            name={name || 'Core Unit'}
            image={imageUrl}
            style={{
              border: 'none',
              boxShadow: isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
            }}
          />
        </Avatar>
        <InformationContainer>
          <CodeAndNameContainer>
            <Code>{code}</Code>
            <Name>{name}</Name>
          </CodeAndNameContainer>
          <StatusLastModifiedContainer>
            <StatusStyled status={status} />
            {statusModified && (
              <ExternalLinkButtonStyled href={href}>
                {`Since ${DateTime.fromJSDate(statusModified).toFormat('d-MMM-y').toUpperCase()}`}
              </ExternalLinkButtonStyled>
            )}
          </StatusLastModifiedContainer>
        </InformationContainer>
      </RowContainer>
      <CategoriesContainer>
        <CategoriesLabel>Categories</CategoriesLabel>
        <Categories>
          {categories.map((category) => (
            <CategoryChip category={category} />
          ))}
        </Categories>
      </CategoriesContainer>
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 10px 8px 16px',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  width: 365,
  gap: 14,
}));

const RowContainer = styled('div')({
  display: 'flex',
  gap: 16,
  marginTop: 2,
});

const Avatar = styled('div')({
  width: 48,
  height: 48,
});

const InformationContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const CodeAndNameContainer = styled('div')({
  display: 'flex',
  gap: 4,
});

const Code = styled('label')(({ theme }) => ({
  //   display: 'flex',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  //   alignItems: 'center',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[500],
}));
const Name = styled('label')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[100],
}));

const CategoriesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '4px 8px 8px 8px',
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
}));

const StatusLastModifiedContainer = styled('div')({
  display: 'flex',
  height: 24,
  gap: 4,
});

const CategoriesLabel = styled('label')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[100],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
}));

const Categories = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 6,
  marginTop: -2,
});

const CircleAvatarStyled = styled(CircleAvatar)({});

const StatusStyled = styled(StatusChip)({
  padding: '1px 16px 1px 16px',
});

const ExternalLinkButtonStyled = styled(ExternalLinkButton)(({ theme }) => ({
  padding: '0px 6px 0px 8px',
  borderWidth: 1.5,
  gap: 8,
  alignItems: 'center',
  letterSpacing: '-2%',
  fontSize: 14,
  '& div': {
    height: 16,
    width: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
  },
}));
