type Data = string | number;

export interface OptionItem {
  label: Data;
  value: Data;
}

export interface CustomSelectProps {
  label: string | (() => React.ReactNode);
  options: OptionItem[];
  onChange: (selected: Data | Data[]) => void;
  selected: Data | Data[];
  customOptionsRender?: (option: OptionItem) => React.ReactNode;
  withAll?: boolean;
  customOptionsRenderAll?: React.ReactNode;
  multiple?: boolean;
  style?: {
    fullWidth: boolean;
    width: number; // value in px
    menuWidth: number; // value in px
  };
}
