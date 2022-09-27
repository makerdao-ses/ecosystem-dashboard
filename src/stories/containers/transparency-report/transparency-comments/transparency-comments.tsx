import React from 'react';
import { CuCommentDto } from '../../../../core/models/dto/core-unit-comment.dto';
import { TransparencyEmptyAudit } from '../placeholders/transparenct-empty-audit';
import { ListItemsComments } from './list-items-comments';

interface Props {
  comments: CuCommentDto[];
  numberComments: number;
  code: string;
}
export const TransparencyComments = ({ numberComments, comments, code }: Props) => {
  return numberComments === 0 ? (
    <TransparencyEmptyAudit />
  ) : (
    <ListItemsComments comments={comments} actualDate={new Date()} code={code} />
  );
};
