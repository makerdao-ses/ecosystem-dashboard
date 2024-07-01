import { styled } from '@mui/material';
import { ParenthesisNumber } from '@/views/CoreUnitBudgetStatement/CoreUnitBudgetStatementView';

type CommentsTabProps = {
  hasNewComments: boolean;
  numbersComments: number;
};

const CommentsTab: React.FC<CommentsTabProps> = ({ hasNewComments, numbersComments }) => (
  <CommentsContainer>
    {hasNewComments && <DotIndicator />}
    <ParenthesisNumber>
      Comments<span>{`(${numbersComments})`}</span>
    </ParenthesisNumber>
  </CommentsContainer>
);

export default CommentsTab;

const CommentsContainer = styled('div')({
  position: 'relative',
});

const DotIndicator = styled('span')(({ theme }) => ({
  minWidth: '6px',
  minHeight: '6px',
  borderRadius: '50%',
  background: theme.palette.isLight ? '#F75524' : '#FF8237',
  position: 'absolute',
  top: 0,
  right: -8,
}));
