import styled from '@emotion/styled';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import React, { useMemo } from 'react';
import { getExpenseReportStatusColor } from '@/core/utils/colors';
import lightTheme from '../../../../../../styles/theme/themes';
import { useThemeContext } from '../../../../../core/context/ThemeContext';

export type GenericCommentCardProps = {
  variant?: BudgetStatus;
  children: React.ReactNode;
  opacity?: number;
};

const GenericCommentCard: React.FC<GenericCommentCardProps> = ({ variant = BudgetStatus.Draft, children, opacity }) => {
  const { isLight } = useThemeContext();
  const variantColor = useMemo(() => {
    if (variant === BudgetStatus.Review) {
      return {
        ...getExpenseReportStatusColor(variant),
        color: '#FBCC5F',
      };
    }
    return getExpenseReportStatusColor(variant);
  }, [variant]);

  return (
    <CommentCard isLight={isLight} variantColorSet={variantColor} opacity={opacity}>
      {children}
    </CommentCard>
  );
};

export default GenericCommentCard;

const CommentCard = styled.div<{ isLight: boolean; variantColorSet: { [key: string]: string }; opacity?: number }>(
  ({ isLight, variantColorSet, opacity }) => ({
    position: 'relative',
    marginBottom: 32,
    background: isLight ? '#FFFFFF' : '#10191F',
    borderRadius: 6,
    wordBreak: 'break-word',
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
    paddingLeft: 2,

    [lightTheme.breakpoints.up('table_834')]: {
      paddingLeft: 8,
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      borderRadius: 6,
      top: 0,
      left: 0,
      width: 2,
      height: '100%',
      background: isLight ? variantColorSet.color : variantColorSet.darkColor,
      ...(opacity ? { opacity } : null),

      [lightTheme.breakpoints.up('table_834')]: {
        width: 8,
      },
    },
  })
);
