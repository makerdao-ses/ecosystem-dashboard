export type Breakpoints = 1920 | 1440 | 1280 | 1194 | 834 | 0;

export type FigmaLinkSet = {
  [viewportSize in Breakpoints]?: string;
};

export type FigmaComparatorOptions = {
  styles?: React.CSSProperties;
};

export type FigmaComparatorProps = React.PropsWithChildren & {
  figmaLink: FigmaLinkSet;
  options?: FigmaComparatorOptions;
};

export type FigmaData = {
  nodeId: string;
  fileId: string;
};

export type FigmaComparatorMessage = {
  message: string;
  color: string;
};
