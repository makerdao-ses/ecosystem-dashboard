import React from 'react';
import AuditorCommentCard from './auditor-comment-card';
import CUNewExpenseReport from './cu-new-expense-report';
import CommentForm from './comment-form';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';

const AuditorCommentList: React.FC = () => {
  return (
    <div>
      <AuditorCommentCard status={BudgetStatus.Draft} hasStatusLabel={true} />

      <CUNewExpenseReport />

      <AuditorCommentCard status={BudgetStatus.Review} hasStatusLabel={true} />
      <AuditorCommentCard
        status={BudgetStatus.Review}
        hasStatusLabel={false}
        commentDescription={'Everything looks good, ready for review. '}
      />
      <AuditorCommentCard status={BudgetStatus.Final} hasStatusLabel={true} />

      <CUNewExpenseReport />

      <AuditorCommentCard status={BudgetStatus.Escalated} hasStatusLabel={true} />
      <AuditorCommentCard
        status={BudgetStatus.Draft}
        hasStatusLabel={false}
        commentDescription={
          // eslint-disable-next-line spellcheck/spell-checker
          'Our September forecast included offsite participation estimates for more people that ended up participating. Equally we have managed to get speaker tickets.\n\n**Updating:**\n- Actual expenses\n- FTE number'
        }
      />
      <CommentForm />
    </div>
  );
};

export default AuditorCommentList;
