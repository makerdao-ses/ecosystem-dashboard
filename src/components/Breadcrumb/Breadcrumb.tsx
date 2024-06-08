import { Link, styled, useMediaQuery } from '@mui/material';
import AngleRight from 'public/assets/svg/angle_right.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import Container from '@/components/Container/Container';
import DotsSegment from './DotsSegment';
import type { Theme } from '@mui/material';

export interface BreadcrumbItem {
  label: string;
  href: string;
  number?: number;
}

interface BreadcrumbItemExtended extends BreadcrumbItem {
  labelWidth: number;
  recommendedWidth: number;
  attachedItems?: BreadcrumbItem[];
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const MAX_ALLOWED_WIDTH = 250;
const THREE_DOTS_WIDTH = 60;

const getTextWidth = (text: string, font: string) => {
  // Create a canvas element (this can be done in memory, it doesn't need to be in the DOM)
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return 0; // Context is null if canvas is not supported

  // Set the font style to match the text style
  context.font = font;

  // Measure the text
  const metrics = context.measureText(text);
  return metrics.width;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const segmentsRef = useRef<HTMLDivElement>(null);

  const { itemsExtended, totalWidth } = useMemo(() => {
    // add labelWidth to each item to display the items properly
    const itemsExtended = items.map((item, index) => {
      const labelWidth =
        getTextWidth(item.label, `${index === items.length - 1 ? 400 : 600} 16px Inter`) +
        (!Number.isNaN(item.number) ? getTextWidth(`(${item.number})`, '600 16px Inter') + 4 : 0) +
        28; // 28 is the width of the angle right icon + 4px gap,

      return {
        ...item,
        labelWidth,
        recommendedWidth: 0,
      } as BreadcrumbItemExtended;
    });

    const totalWidth = itemsExtended.reduce((acc, item) => acc + item.labelWidth, 0);

    return {
      itemsExtended,
      totalWidth,
    };
  }, [items]);

  const [groupedItems, setGroupedItems] = useState<BreadcrumbItemExtended[]>(itemsExtended);

  // update groupedItems when the window is resized
  useEffect(() => {
    const segmentsContainerWidth = segmentsRef.current?.offsetWidth || 0;

    if (segmentsContainerWidth === 0 || totalWidth <= segmentsContainerWidth) {
      setGroupedItems(itemsExtended);
      return;
    }

    // probably some items doesn't fit in the container
    const firstItem = itemsExtended[0]; // first item always visible
    const segments = [];
    let currentWidth = firstItem.labelWidth;

    let i = itemsExtended.length - 1;
    for (; i > 0; i--) {
      const item = itemsExtended[i];
      const itemWidth = item.labelWidth;
      const itemAdjustedWidth = Math.min(item.labelWidth, MAX_ALLOWED_WIDTH);

      // if the item fits, we just add it to the segments
      if (currentWidth + itemWidth < segmentsContainerWidth) {
        segments.unshift(item);
        currentWidth += itemWidth; // update the current width
      } else {
        // the item doesn't fit
        // we need to check if adjusting the width of the items it fits
        let adjustedWidthCheck = Math.min(firstItem.labelWidth, MAX_ALLOWED_WIDTH) + THREE_DOTS_WIDTH; // assume it had the three dots
        for (let j = 0; j < segments.length; j++) {
          adjustedWidthCheck += Math.min(segments[j].labelWidth, MAX_ALLOWED_WIDTH);
        }
        if (adjustedWidthCheck + itemAdjustedWidth < segmentsContainerWidth) {
          // the item fits if we adjust the width of the items
          segments.unshift(item);
          currentWidth += itemAdjustedWidth;

          // adjust the recommended width of all the added items
          firstItem.recommendedWidth = Math.min(firstItem.labelWidth, MAX_ALLOWED_WIDTH);
          for (let j = 0; j < segments.length; j++) {
            segments[j].recommendedWidth = Math.min(segments[j].labelWidth, MAX_ALLOWED_WIDTH);
          }
        } else {
          break; // the item doesn't fit even adjusting the width of the items
        }
      }
    }

    const addDots = i > 0;

    setGroupedItems([
      firstItem,
      ...(addDots
        ? [
            {
              label: '...',
              href: '',
              labelWidth: 0,
              recommendedWidth: THREE_DOTS_WIDTH,
              attachedItems: itemsExtended.slice(1, i + 1),
            },
          ]
        : []),
      ...segments,
    ] as BreadcrumbItemExtended[]);
  }, [itemsExtended, totalWidth]);

  return (
    <BreadcrumbCard>
      <Container>
        <Content>
          <SegmentsContainer ref={segmentsRef}>
            {isMobileOrTablet ? (
              <>
                {itemsExtended.length > 1 && (
                  <Segment>
                    <DotsSegment items={items} />
                    <AngleRight />
                  </Segment>
                )}
                <Segment>
                  <EllipseSegment>{itemsExtended?.[itemsExtended.length - 1]?.label}</EllipseSegment>
                </Segment>
              </>
            ) : (
              groupedItems.map((item, index) => (
                <Segment key={item.label} maxWidth={item.recommendedWidth}>
                  {index !== groupedItems.length - 1 ? (
                    item.label === '...' ? (
                      <>
                        <DotsSegment items={item.attachedItems ?? []} />
                        <AngleRight />
                      </>
                    ) : (
                      <>
                        <Link href={item.href}>
                          <EllipseSegment>{item.label}</EllipseSegment>
                          {item.number !== undefined && item.number !== null ? <b>({item.number})</b> : null}
                        </Link>{' '}
                        <AngleRight />
                      </>
                    )
                  ) : (
                    <EllipseSegment>{item.label}</EllipseSegment>
                  )}
                </Segment>
              ))
            )}
          </SegmentsContainer>

          <RightSpotContainer>{'...'}</RightSpotContainer>
        </Content>
      </Container>
    </BreadcrumbCard>
  );
};

export default Breadcrumb;

const BreadcrumbCard = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    borderRadius: 12,
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],
    margin: '0 16px',
  },

  [theme.breakpoints.up('tablet_768')]: {
    borderBottom: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900]
    }`,
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0',

  [theme.breakpoints.down('tablet_768')]: {
    // recover 8px form container padding on mobile
    margin: '0 -8px',
  },
}));

const SegmentsContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  width: '100%',
}));

const Segment = styled('div')<{ maxWidth?: number }>(({ theme, maxWidth }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[100],
  maxWidth: maxWidth || 'auto',

  '& a': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
    textDecoration: 'none',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '& b': {
    fontWeight: 600,
    lineHeight: '21px',
  },

  '& svg': {
    minWidth: 24,
  },
}));

const EllipseSegment = styled('span')(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const RightSpotContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));
