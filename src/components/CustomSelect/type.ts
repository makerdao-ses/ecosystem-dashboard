import type { Theme } from '@mui/material';

type Data = string | number;

export interface OptionItem {
  label: Data;
  value: Data;
  extra?: {
    [key: string]: string;
  };
}

export interface CustomSelectProps {
  label: string | (() => React.ReactNode);
  options: OptionItem[];
  onChange: (selected: Data | Data[]) => void;
  selected: Data | Data[];
  customOptionsRender?: (option: OptionItem, isActive: boolean, theme?: Theme) => React.ReactNode;
  withAll?: boolean;
  customOptionsRenderAll?: React.ReactNode;
  multiple?: boolean;
  style?: {
    fullWidth: boolean;
    width: number; // value in px
    menuWidth: number; // value in px
  };
}
