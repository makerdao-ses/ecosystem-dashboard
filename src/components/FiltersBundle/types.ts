export type FilterType = 'select' | 'search' | 'radio'; // filter type identifier

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

export interface SearchFilter extends Omit<GenericFilter, 'label' | 'collapsible'> {
  type: 'search';
  value: string;
  onChange: (value: string) => void;
}

export interface SelectOption {
  value: string | number;
  label: string | React.ReactElement;
}

export interface SelectFilter extends GenericFilter {
  type: 'select';
  selected: SelectOption['value'];
  multiple?: boolean; // default is false
  options: SelectOption[];
  onChange: (value: SelectOption['value']) => void;
}

export interface RadioOption {
  value: string | number;
  label: string | React.ReactElement;
  selected?: boolean; // default is false
  group?: boolean | string;
}

export interface RadioFilter extends GenericFilter {
  type: 'radio';
  options: RadioOption[];
  onChange: (value: RadioOption['value']) => void;
}

// all available filters
export type Filter = SelectFilter | SearchFilter | RadioFilter; // add possible filter types here

export type RenderTriggerFn = (onClick: () => void) => React.ReactElement;

export interface FiltersBundleOptions {
  renderTrigger?: RenderTriggerFn; // default undefined (default trigger button is rendered)
  resetFilters?: ResetFilter | undefined; // default undefined (no reset button)
  filters: Filter[];
}
