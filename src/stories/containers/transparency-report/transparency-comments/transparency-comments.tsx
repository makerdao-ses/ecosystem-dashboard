import React from 'react';
import { CuCommentDto } from '../../../../core/models/dto/comments.dto';
import { TransparencyEmptyAudit } from '../placeholders/transparenct-empty-audit';
import { Dictionary } from 'lodash';
import { ListItemsComments } from './comments-list';

interface Props {
  comments: Dictionary<CuCommentDto[]>;
  numberComments: number;
  code: string;
}
export const TransparencyComments = ({ numberComments, code, comments }: Props) => {
  return numberComments === 0 ? <TransparencyEmptyAudit /> : <ListItemsComments comments={comments} code={code} />;
};
