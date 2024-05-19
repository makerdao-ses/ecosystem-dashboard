export type FilterType = 'select' | 'search'; // filter type identifier

export interface GenericFilter {
  id: string;
  label: string;
  collapsible?: boolean;
  type: FilterType;
}

export interface ResetFilter {
  canReset: boolean;
  onReset: () => void;
}

export interface SelectOption {
  value: string | number;
  label: string | React.ReactElement;
  selected?: boolean; // default is false
}

export interface SelectFilter extends GenericFilter {
  type: 'select';
  multiple?: boolean; // default is false
  options: SelectOption[];
}

export interface SearchFilter extends Omit<GenericFilter, 'label' | 'collapsible'> {
  type: 'search';
  value: string;
  onChange: (value: string) => void;
}

// all available filters
export type Filter = SelectFilter | SearchFilter; // add possible filter types here

export type RenderTriggerFn = (onClick: () => void) => React.ReactElement;

export interface FiltersBundleOptions {
  renderTrigger?: RenderTriggerFn; // default undefined (default trigger button is rendered)
  resetFilters?: ResetFilter; // default undefined (no reset button)
  filters: Filter[];
}
