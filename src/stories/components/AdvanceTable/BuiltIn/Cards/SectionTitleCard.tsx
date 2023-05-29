import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionTitleCardProps {
  title: string;
  groupTitle?: string;
}

const SectionTitleCard: React.FC<SectionTitleCardProps> = ({ title, groupTitle }) => {
  const { isLight } = useThemeContext();

  return (
    <TitleCard isLight={isLight}>
      {groupTitle && <GroupTitle isLight={isLight}>{groupTitle}</GroupTitle>}
      <Title isLight={isLight}>{title}</Title>
    </TitleCard>
  );
};

export default SectionTitleCard;

const TitleCard = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px',
  backgroundColor: isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(120, 122, 155, 0.3)',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: 6,
  marginBottom: 8,
}));

const GroupTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 16,
}));

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '19px',
  letterSpacing: 0.4,
  fontWeight: 700,
  color: isLight ? '#231536' : '#D2D4EF',
}));
