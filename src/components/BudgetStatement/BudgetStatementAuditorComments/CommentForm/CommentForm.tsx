import { styled } from '@mui/material';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { ResourceType } from '@ses/core/models/interfaces/types';
import BudgetStatusSelect from '../BudgetStatusSelect';
import GenericCommentCard from '../GenericCommentCard';
import useCommentForm from './useCommentForm';
import type { BudgetStatus } from '@ses/core/models/interfaces/types';

export type CommentFormProps = {
  currentBudgetStatus: BudgetStatus;
  budgetStatementId: string;
  resource: ResourceType;
};

const CommentForm: React.FC<CommentFormProps> = ({ currentBudgetStatus, budgetStatementId, resource }) => {
  const {
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
  } = useCommentForm(currentBudgetStatus, budgetStatementId, resource);

  return (
    <GenericCommentCard variant={selectedStatus}>
      <CommentHeader>
        <Select>
          <BudgetStatusSelect
            onChangeStatus={handleChangeVariant}
            availableStatuses={availableStatuses}
            selected={selectedStatus}
          />
        </Select>
        <User>
          <Username>{username}</Username>
          <UserRole>
            {/* TODO: check this role string */}(
            {resource === ResourceType.Delegates ? 'Delegates Administrator' : roleString})
          </UserRole>
        </User>
      </CommentHeader>
      <FormContainer>
        <TextArea
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

const CommentHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 16,
  borderBottom: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
}));

const Select = styled('div')({
  minWidth: 'fit-content',
});

const User = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginLeft: 16,
  letterSpacing: '1px',

  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 32,
  },
}));

const Username = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#708390' : '#546978',
  marginRight: 3,
}));

const UserRole = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  padding: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexWrap: 'nowrap',
  },
}));

const TextArea = styled('textarea')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  width: '100%',
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
  borderRadius: 6,
  padding: '8px 8px 0px',
  marginBottom: 16,
  minHeight: 96,
  backgroundColor: theme.palette.isLight ? '#FFFFFF' : '#10191F',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  resize: 'vertical',
  outline: 'none',

  '&::placeholder': {
    color: theme.palette.isLight ? '#708390' : '#546978',
  },
}));

const SubmitButton = styled(CustomButton)(({ theme }) => ({
  height: 'fit-content',
  padding: '8px 24px',

  '&:hover:disabled, &:hover[disabled]': {
    cursor: 'default',

    '& div': {
      color: '#9FAFB9',
    },
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginLeft: 16,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 32,
  },
}));
