import type { RenderTriggerFn } from '../types';

export const defaultTriggerRenderer: RenderTriggerFn = (onClick) => (
  <button onClick={onClick}>Filters (mobile trigger)</button>
);
