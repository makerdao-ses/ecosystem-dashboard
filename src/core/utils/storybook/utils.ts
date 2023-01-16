import * as Figma from 'figma-js';
import type { Breakpoints, FigmaComparatorOptions, FigmaData, FigmaLinkSet } from './types';

const FIGMA_TOKEN = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;
const figma = Figma.Client({ personalAccessToken: FIGMA_TOKEN });

export async function getFigmaImage(fileId: string, nodeId: string): Promise<string> {
  const { data } = await figma.fileImages(fileId, {
    ids: [nodeId],
    format: 'svg',
  });
  return data.images[nodeId];
}

export const dataFromLink = (link: string): FigmaData | never => {
  const url = new URL(link);
  const nodeId = url.searchParams.get('node-id');
  const fileId = url.pathname.split('/')[2];
  if (!nodeId || !fileId) {
    throw new Error('Invalid Figma link');
  }
  return {
    nodeId,
    fileId,
  };
};

export const getCurrentViewportLink = (linkSet: FigmaLinkSet, viewportWidth: number): string | undefined => {
  const sortedBreakpoints = Object.keys(linkSet)
    .map((key) => parseInt(key))
    .sort((a, b) => a - b);

  let index = sortedBreakpoints.length - 1;
  while (index >= 0) {
    if (sortedBreakpoints[index] <= viewportWidth) {
      return linkSet[sortedBreakpoints[index] as Breakpoints] as string;
    }
    index--;
  }
};

export const figmaComparatorCommonPaddingOptions: FigmaComparatorOptions = {
  styles: {
    top: 20,
    left: 20,
  },
};
