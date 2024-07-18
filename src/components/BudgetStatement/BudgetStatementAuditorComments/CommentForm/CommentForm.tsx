import { styled } from '@mui/material';
import { ResourceType } from '@ses/core/models/interfaces/types';
import Close from 'public/assets/svg/close.svg';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import BudgetStatusSelect from '../BudgetStatusSelect';
import CommentAuthor from '../CommentAuthor';
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
    handleReset,
    handleSubmit,
  } = useCommentForm(currentBudgetStatus, budgetStatementId, resource);

  const canReset =
    isSubmitting ||
    (!textareaValue.trim() && isCommenting) ||
    (currentBudgetStatus === selectedStatus && !textareaValue.trim());

  return (
    <GenericCommentCard variant={selectedStatus}>
      <CommentHeader>
        <LeftHeaderContent>
          <Select>
            <BudgetStatusSelect
              onChangeStatus={handleChangeVariant}
              availableStatuses={availableStatuses}
              selected={selectedStatus}
            />
          </Select>
          <UserContainer>
            <CommentAuthor
              resource={resource}
              username={username}
              role={resource === ResourceType.Delegates ? 'Delegates Administrator' : roleString}
            />
          </UserContainer>
        </LeftHeaderContent>

        {!isMobile && <ResetButton title={<Close />} onClick={handleReset} disabled={canReset} />}
      </CommentHeader>
      <FormContainer>
        <TextArea
          placeholder={`${isCommenting ? '' : '(Optional)'} Add comment here...`}
          value={textareaValue}
          onChange={handleChangeTextarea}
        />

        <ButtonsContainer>
          {isMobile && <SecondaryButton title="Cancel" onClick={handleReset} disabled={canReset} />}

          <SecondaryButton
            title={submitLabel}
            onClick={handleSubmit}
            disabled={isSubmitting || (!textareaValue.trim() && isCommenting)}
          />
        </ButtonsContainer>
      </FormContainer>
    </GenericCommentCard>
  );
};

export default CommentForm;

const CommentHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 8px 7px',
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'space-between',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 16px 7px',
  },
}));

const LeftHeaderContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Select = styled('div')({
  minWidth: 'fit-content',
});

const UserContainer = styled('div')(({ theme }) => ({
  marginLeft: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 16,
  },
}));

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  padding: '8px 8px 16px',

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 16px 16px',
    flexWrap: 'nowrap',
    gap: 24,

    '& button': {
      whiteSpace: 'nowrap',
      height: 'fit-content',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const TextArea = styled('textarea')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  width: '100%',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  borderRadius: 8,
  padding: '8px 8px 0px',
  marginBottom: 8,
  minHeight: 96,
  backgroundColor: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  resize: 'vertical',
  outline: 'none',

  '&::placeholder': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
  },
}));

const ButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 8,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-end',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 'auto',
  },
}));

const ResetButton = styled(SecondaryButton)(({ theme }) => ({
  padding: 8,
  height: 32,
  lineHeight: 'normal',

  '& > svg': {
    width: 16,
    height: 16,
  },

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  },

  '&:disabled path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.slate[400],
  },
}));
