import { styled, useTheme } from '@mui/material';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import { useMemo } from 'react';
import Card from '@/components/Card/Card';

export type GenericCommentCardProps = {
  variant?: BudgetStatus;
  children: React.ReactNode;
  opacity?: number;
};

const GenericCommentCard: React.FC<GenericCommentCardProps> = ({ variant = BudgetStatus.Draft, children, opacity }) => {
  const isLight = useTheme().palette.isLight;
  const borderColor = useMemo(() => {
    switch (variant) {
      case BudgetStatus.Final:
        return isLight ? colorPalette.green[100] : '#34A85366';
      case BudgetStatus.Review:
        return isLight ? colorPalette.orange[100] : '#FF8A0066';
      case BudgetStatus.Escalated:
        return isLight ? colorPalette.red[200] : '#EA433566';
      default:
        // default to draft
        return isLight ? colorPalette.blue[100] : '#0084FF66';
    }
  }, [isLight, variant]);

  return (
    <CommentCard borderColor={borderColor} opacity={opacity}>
      {children}
    </CommentCard>
  );
};

export default GenericCommentCard;

const CommentCard = styled(Card)<{ borderColor: string; opacity?: number }>(({ borderColor, opacity }) => ({
  position: 'relative',
  marginBottom: 32,
  wordBreak: 'break-word',
  paddingLeft: 8,

  '&::before': {
    content: '""',
    position: 'absolute',
    borderRadius: '12px 0px 0px 12px',
    top: 0,
    left: 0,
    width: 8,
    height: '100%',
    background: borderColor,
    ...(opacity ? { opacity } : null),
  },
}));
