import React from 'react';
import styled from '@emotion/styled';
import GenericCommentCard from './generic-comment-card';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import BudgetStatusSelect from './BudgetStatusSelect';
import lightTheme from '../../../../../styles/theme/light';
import { useMediaQuery } from '@mui/material';

const CommentForm: React.FC = () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <GenericCommentCard>
      <CommentHeader isLight={isLight}>
        <Select>
          <BudgetStatusSelect />
        </Select>
        <User>
          <Username isLight={isLight}>C_27</Username>
          <UserRole isLight={isLight}>Auditor</UserRole>
        </User>
      </CommentHeader>
      <FormContainer>
        <TextArea isLight={isLight} placeholder="(Optional) Add comment here..." />
        <SubmitButton label="Submit Comment" allowsHover={!isMobile} />
      </FormContainer>
    </GenericCommentCard>
  );
};

export default CommentForm;

type StyledThemeProps = {
  isLight: boolean;
};

const CommentHeader = styled.div<StyledThemeProps>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 16,
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
}));

const Select = styled.div({});

const User = styled.div({
  display: 'flex',
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginLeft: 32,
});

const Username = styled.div<StyledThemeProps>(({ isLight }) => ({
  color: isLight ? '#708390' : '#546978',
}));

const UserRole = styled.div<StyledThemeProps>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  marginLeft: 3,
}));

const FormContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  padding: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    flexWrap: 'nowrap',
  },
});

const TextArea = styled.textarea<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  width: '100%',
  border: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  borderRadius: 6,
  padding: '8px 8px 0px',
  marginBottom: 16,
  minHeight: 96,
  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  color: isLight ? '#231536' : '#D2D4EF',
  resize: 'vertical',
  outline: 'none',

  '&::placeholder': {
    color: isLight ? '#708390' : '#546978',
  },
}));

const SubmitButton = styled(CustomButton, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  height: 'fit-content',
  padding: '8px 24px',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginLeft: 16,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 32,
  },
});
