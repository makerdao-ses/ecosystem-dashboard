import React from 'react';
import { TransparencyEmptyAudit } from '../placeholders/transparenct-empty-audit';
import { Dictionary } from 'lodash';
import { ListItemsComments } from './comments-list';
import { CommentsDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';

interface Props {
  comments: Dictionary<CommentsDto[]>;
  numberComments: number;
  code: string;
  currentMonth: DateTime;
}
export const TransparencyComments = ({ numberComments, code, comments, currentMonth }: Props) => {
  return numberComments === 0 ? (
    <TransparencyEmptyAudit />
  ) : (
    <ListItemsComments comments={comments} code={code} currentMonth={currentMonth} />
  );
};
