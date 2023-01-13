import styled from '@emotion/styled';
import * as Figma from 'figma-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

const FIGMA_TOKEN = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;
const figma = Figma.Client({ personalAccessToken: FIGMA_TOKEN });

export const CompareWithFigmaContext = createContext(false);

async function getFigmaImage(fileId: string, nodeId: string): Promise<string> {
  const { data } = await figma.fileImages(fileId, {
    ids: [nodeId],
    format: 'svg',
  });
  return data.images[nodeId];
}

export type FigmaComparatorProps = React.PropsWithChildren & {
  fileId: string;
  nodeId: string;
};

export default function FigmaComparator({ fileId, nodeId, children }: FigmaComparatorProps) {
  const compareWithFigma = useContext(CompareWithFigmaContext);

  const [figmaImageSrc, setFigmaImageSrc] = useState<string | null>(null);
  const [showFigmaImage, setShowFigmaImage] = useState<boolean>(false);
  const [figmaImageLoaded, setFigmaImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!figmaImageSrc && showFigmaImage) {
      getFigmaImage(fileId, nodeId).then((imageUrl) => {
        if (imageUrl) {
          setFigmaImageSrc(imageUrl);
        }
      });
    }
  }, [fileId, nodeId, figmaImageSrc, showFigmaImage]);

  useEffect(() => {
    setShowFigmaImage(compareWithFigma);
  }, [compareWithFigma]);

  return (
    <Container>
      {showFigmaImage && (
        <LoaderIndicator loaded={figmaImageLoaded}>
          {figmaImageLoaded ? 'Comparison mode ON' : 'Loading image from Figma...'}
        </LoaderIndicator>
      )}
      <div style={{ position: 'relative' }}>
        {figmaImageSrc && showFigmaImage && (
          <FigmaImageContainer>
            <FigmaImage src={figmaImageSrc} onLoad={() => setFigmaImageLoaded(true)} alt="Figma" />
          </FigmaImageContainer>
        )}
        {children}
      </div>
    </Container>
  );
}

const Container = styled.div({
  display: 'flex',
  gap: '8px',
  alignItems: 'flex-start',
});

const LoaderIndicator = styled.div(({ loaded }: { loaded: boolean }) => ({
  position: 'absolute',
  bottom: 0,
  zIndex: 9999,
  fontSize: 10,
  color: loaded ? 'green' : 'red',
}));

const FigmaImageContainer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1000,
  opacity: 0.5,
  padding: 20,
});

const FigmaImage = styled.img({
  width: 'fit-content',
  height: 'fit-content',
});
