import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { CommentEnum } from '../../../../core/enums/comment.enum';
import { useThemeContext } from '../../../../core/context/ThemeContext';

interface StatusChipProps {
  commentStatus: CommentEnum;
  style?: CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colors: { [id: string]: any } = {
  Draft: {
    color: '#447AFB',
    background: '#EDF2FF',
    colorDark: '#447AFB',
    backgroundDark: '#061D58',
  },
  Review: {
    color: '#F08B04',
    background: '#FFF9ED',
    colorDark: '#F08B04',
    backgroundDark: '#533905',
  },
  Escalated: {
    color: '#EB4714',
    background: '#FDEDE8',
    colorDark: '#EB4714',
    backgroundDark: '#481403',
  },
  Final: {
    color: '#1AAB9B',
    background: '#E7FCFA',
    colorDark: '#1AAB9B',
    backgroundDark: '#044942',
  },
};

export const CommentChip = (props: StatusChipProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Chip
      style={{
        color: isLight ? colors[props.commentStatus].color : colors[props.commentStatus].colorDark,
        background: isLight ? colors[props.commentStatus].background : colors[props.commentStatus].backgroundDark,
        border: isLight
          ? `1px solid ${colors[props.commentStatus].color}`
          : `1px solid ${colors[props.commentStatus].colorDark}`,
        ...props.style,
      }}
    >
      {props.commentStatus}
    </Chip>
  );
};

const Chip = styled.div({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  borderRadius: '12px',
  height: '26px',
  width: '98px',
});
