import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../../../../styles/theme/light';
import { CustomButton } from '../../../../../components/CustomButton/CustomButton';
import BudgetStatusSelect from '../BudgetStatusSelect';
import GenericCommentCard from '../GenericCommentCard';
import useCommentForm from './useCommentForm';
import type { CommentMode } from '../AuditorCommentsContainer/AuditorCommentsContainer';
import type { BudgetStatus } from '@ses/core/models/interfaces/types';

export type CommentFormProps = {
  currentBudgetStatus: BudgetStatus;
  budgetStatementId: string;
  mode?: CommentMode;
};

const CommentForm: React.FC<CommentFormProps> = ({ currentBudgetStatus, budgetStatementId, mode = 'CoreUnits' }) => {
  const {
    isLight,
    isMobile,
    submitLabel,
    roleString,
    username,
    availableStatuses,
    selectedStatus,
    textareaValue,
    isSubmitting,
    isCommenting,
    handleChangeVariant,
    handleChangeTextarea,
    handleSubmit,
  } = useCommentForm(currentBudgetStatus, budgetStatementId);

  return (
    <GenericCommentCard variant={selectedStatus}>
      <CommentHeader isLight={isLight}>
        <Select>
          <BudgetStatusSelect
            onChangeStatus={handleChangeVariant}
            availableStatuses={availableStatuses}
            selected={selectedStatus}
          />
        </Select>
        <User>
          <Username isLight={isLight}>{username}</Username>
          <UserRole isLight={isLight}>({mode === 'CoreUnits' ? roleString : 'Delegates Administrator'})</UserRole>
        </User>
      </CommentHeader>
      <FormContainer>
        <TextArea
          isLight={isLight}
          placeholder={`${isCommenting ? '' : '(Optional)'} Add comment here...`}
          value={textareaValue}
          onChange={handleChangeTextarea}
        />
        <SubmitButton
          label={submitLabel}
          allowsHover={!isMobile}
          onClick={handleSubmit}
          disabled={isSubmitting || (!textareaValue.trim() && isCommenting)}
        />
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

const Select = styled.div({
  minWidth: 'fit-content',
});

const User = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginLeft: 16,
  letterSpacing: '1px',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 32,
  },
});

const Username = styled.div<StyledThemeProps>(({ isLight }) => ({
  color: isLight ? '#708390' : '#546978',
  marginRight: 3,
}));

const UserRole = styled.div<StyledThemeProps>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
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

  '&:hover:disabled, &:hover[disabled]': {
    cursor: 'default',

    '& div': {
      color: '#9FAFB9',
    },
  },

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginLeft: 16,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 32,
  },
});
