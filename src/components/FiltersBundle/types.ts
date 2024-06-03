import type { Theme } from '@mui/material';
import type { MutableRefObject } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type FilterType = 'select' | 'radio'; // filter type identifier

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

export interface SearchFilter {
  onChange: (value: string) => void;
  value?: string;
  widthStyles?: {
    fullWidth?: boolean;
    width?: number; // value in px
    menuWidth?: number; // value in px
  };
}

export interface SelectOption {
  value: string | number;
  label: string | React.ReactElement;
  extra?: {
    [key: string]: string;
  };
}

export interface SelectFilter extends GenericFilter {
  type: 'select';
  selected: SelectOption['value'] | SelectOption['value'][];
  multiple?: boolean; // default is false
  options: SelectOption[];
  onChange: (value: SelectOption['value'] | SelectOption['value'][]) => void;
  customOptionsRender?: (option: SelectOption, isActive: boolean, theme?: Theme) => React.ReactNode;
  withAll?: boolean;
  customOptionsRenderAll?: (isActive: boolean, theme?: Theme) => React.ReactNode;
  widthStyles?: {
    fullWidth?: boolean;
    width?: number; // value in px
    menuWidth?: number; // value in px
  };
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
export type Filter = SelectFilter | RadioFilter; // add possible filter types here

export type RenderTriggerFn = (onClick: () => void, ref: MutableRefObject<HTMLDivElement | null>) => React.ReactElement;

export interface FiltersBundleOptions {
  renderTrigger?: RenderTriggerFn; // default undefined (default trigger button is rendered)
  searchFilters?: SearchFilter | undefined; // default undefined (no search)
  resetFilters?: ResetFilter | undefined; // default undefined (no reset button)
  filters: Filter[];
  order?: Partial<Record<Breakpoint, string[]>>;
  snapPoints?: number[];
  initialSnap?: number; // this is the index of the previous array
}
