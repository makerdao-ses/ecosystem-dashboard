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
        return isLight ? colorPalette.green[700] : colorPalette.green[900];
      case BudgetStatus.Review:
        return isLight ? colorPalette.orange[700] : colorPalette.orange[900];
      case BudgetStatus.Escalated:
        return colorPalette.red[700];
      default:
        // default to draft
        return isLight ? colorPalette.blue[700] : colorPalette.blue[900];
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
