import styled from '@emotion/styled';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface CardProjectsProps {
  actorName: string;
  shortCode: string;
}

const CardProjects: React.FC<CardProjectsProps> = ({ actorName, shortCode }) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <Title isLight={isLight}>Projects</Title>

      <Card isLight={isLight}>
        <CardDescription isLight={isLight}>
          View all the of the projects {actorName} is involved in and there status.
        </CardDescription>

        <ViewAllBtn
          href={siteRoutes.ecosystemActorProjects(shortCode)}
          buttonType={ButtonType.Primary}
          widthText="100%"
          label="View Projects"
        />
      </Card>
    </Container>
  );
};

export default CardProjects;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginBottom: 32,
});

const Title = styled.h3<WithIsLight>(({ isLight }) => ({
  margin: '0 0 16px',
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
}));

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  padding: '16px 16px 24px 16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: 6,
  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
}));

const CardDescription = styled.p<WithIsLight>(({ isLight }) => ({
  margin: '0 0 24px',
  color: isLight ? '#546978' : '#9FAFB9',
  fontSize: 15,
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: 0.4,
}));

const ViewAllBtn = styled(LinkButton)({
  textAlign: 'center',
  borderRadius: '22px',
  height: ' 34px',
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  width: '100%',
  marginRight: '12px',
  flexGrow: 1,
  padding: '8px 25.75px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '8px 43.25px',
  },
});
