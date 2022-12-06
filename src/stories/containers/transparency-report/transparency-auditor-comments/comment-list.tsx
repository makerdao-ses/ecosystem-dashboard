import React from 'react';
import { ExpenseReportStatus } from '../../../../core/enums/expense-reports-status.enum';
import AuditorCommentCard from './auditor-comment-card';
import CUNewExpenseReport from './cu-new-expense-report';

const AuditorCommentList: React.FC = () => {
  return (
    <div>
      <AuditorCommentCard variant={ExpenseReportStatus.Draft} hasStatusLabel={true} />

      <CUNewExpenseReport />

      <AuditorCommentCard variant={ExpenseReportStatus.Review} hasStatusLabel={true} />
      <AuditorCommentCard
        variant={ExpenseReportStatus.Review}
        hasStatusLabel={false}
        commentDescription={'Everything looks good, ready for review. '}
      />
      <AuditorCommentCard variant={ExpenseReportStatus.Final} hasStatusLabel={true} />

      <CUNewExpenseReport />

      <AuditorCommentCard variant={ExpenseReportStatus.Escalated} hasStatusLabel={true} />
      <AuditorCommentCard
        variant={ExpenseReportStatus.Draft}
        hasStatusLabel={false}
        commentDescription={
          // eslint-disable-next-line spellcheck/spell-checker
          'Our September forecast included offsite participation estimates for more people that ended up participating. Equally we have managed to get speaker tickets.\n\n**Updating:**\n- Actual expenses\n- FTE number'
        }
      />
    </div>
  );
};

export default AuditorCommentList;
