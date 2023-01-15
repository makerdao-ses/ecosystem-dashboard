import styled from '@emotion/styled';
import { useWindowSize } from '@ses/core/hooks/useWindowSize';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { dataFromLink, getCurrentViewportLink, getFigmaImage } from './utils';
import type { FigmaComparatorMessage, FigmaComparatorProps } from './types';

export const CompareWithFigmaContext = createContext(false);

export default function FigmaComparator({ figmaLink, children, options }: FigmaComparatorProps) {
  const showFigmaImage = useContext(CompareWithFigmaContext);

  const [currentLink, setCurrentLink] = useState<string | undefined>(undefined);
  const [figmaImageSrc, setFigmaImageSrc] = useState<string | undefined>(undefined);
  const [figmaImageLoaded, setFigmaImageLoaded] = useState<boolean>(false);
  const [message, setMessage] = useState<FigmaComparatorMessage | undefined>();

  const { width } = useWindowSize();

  const handleResize = () => {
    let newLink = figmaLink as string | undefined;
    if (typeof figmaLink === 'object') {
      newLink = getCurrentViewportLink(figmaLink, window.innerWidth);
    }
    if (newLink && newLink !== currentLink) {
      // link changed
      setCurrentLink(newLink);
      setFigmaImageSrc(undefined);
      setFigmaImageLoaded(false);
    }
    if (!newLink) {
      // there is not any link for current viewport width
      setCurrentLink(undefined);
      setFigmaImageSrc(undefined);
      setFigmaImageLoaded(false);
      setMessage({
        message: 'Figma link for current viewport width not found',
        color: 'orange',
      });
    }
  };

  useEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figmaLink, width]);

  // update message
  useEffect(() => {
    if (!showFigmaImage && !currentLink) return;
    if (figmaImageLoaded) {
      setMessage({
        message: 'Comparison mode ON',
        color: 'green',
      });
    } else {
      setMessage({
        message: 'Loading image from Figma...',
        color: 'red',
      });
    }
  }, [currentLink, figmaImageLoaded, showFigmaImage]);

  useEffect(() => {
    if (currentLink && !figmaImageSrc && showFigmaImage) {
      const { nodeId, fileId } = dataFromLink(currentLink);
      getFigmaImage(fileId, nodeId).then((imageUrl) => {
        if (imageUrl) {
          setFigmaImageSrc(imageUrl);
        }
      });
    }
  }, [currentLink, figmaImageSrc, showFigmaImage]);

  return (
    <Container>
      {showFigmaImage && <Message color={message?.color}>{message?.message}</Message>}
      <RelativeContainer>
        {figmaImageSrc && showFigmaImage && (
          <FigmaImageContainer extra={options?.styles}>
            <FigmaImage src={figmaImageSrc} onLoad={() => setFigmaImageLoaded(true)} alt="Figma" />
          </FigmaImageContainer>
        )}
        {children}
      </RelativeContainer>
    </Container>
  );
}

const Container = styled.div({
  display: 'block',
});

const Message = styled.div<{ color?: string }>(({ color }) => ({
  position: 'absolute',
  bottom: 0,
  zIndex: 9999,
  fontSize: 10,
  color: color || 'red',
}));

const RelativeContainer = styled.div({
  position: 'relative',
  overflow: 'hidden',
});

const FigmaImageContainer = styled.div<{ extra?: React.CSSProperties }>(({ extra }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1000,
  opacity: 0.5,
  ...(extra ?? {}),
}));

const FigmaImage = styled.img({
  width: 'fit-content',
  height: 'fit-content',
});
