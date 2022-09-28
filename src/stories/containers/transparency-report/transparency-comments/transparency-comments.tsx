import React from 'react';
import { TransparencyEmptyAudit } from '../placeholders/transparenct-empty-audit';

interface Props {
  numberComments: number;
}
export const TransparencyComments = ({ numberComments }: Props) => {
  return numberComments === 0 ? <TransparencyEmptyAudit /> : <div>This is the comments View</div>;
};
