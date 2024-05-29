import type { Theme } from '@mui/material';

export interface OptionItem {
  label: string;
  value: string;
  extra?: {
    [key: string]: string;
  };
}

export interface CustomSelectProps {
  label: string | (() => React.ReactNode);
  options: OptionItem[];
  onChange: (selected: string | string[]) => void;
  selected: string | string[] | undefined;
  customOptionsRender?: (option: OptionItem, isActive: boolean, theme?: Theme) => React.ReactNode;
  withAll?: boolean;
  customOptionsRenderAll?: (isActive: boolean, theme?: Theme) => React.ReactNode;
  multiple?: boolean;
  style?: {
    fullWidth?: boolean;
    width?: number; // value in px
    menuWidth?: number; // value in px
  };
}
