import { Link, styled, useMediaQuery } from '@mui/material';
import AngleRight from 'public/assets/svg/angle_right.svg';
import { useEffect, useId, useMemo, useState } from 'react';
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
  rightContent: React.ReactElement;
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

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, rightContent }) => {
  const contentId = useId();
  const rightPartId = useId();
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  const [elementWidths, setElementWidths] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    // update elementWidths when the window is resized to correctly calculate the segments width
    const getWidths = () => {
      const contentElement = document.getElementById(contentId);
      const rightPartElement = document.getElementById(rightPartId);

      if (contentElement && rightPartElement) {
        setElementWidths([contentElement.offsetWidth, rightPartElement.offsetWidth]);
      }
    };

    getWidths(); // initial call
    document.addEventListener('resize', getWidths);
    return () => {
      document.removeEventListener('resize', getWidths);
    };
  }, [contentId, rightPartId]);

  const itemsExtended = useMemo(() => {
    // add labelWidth to each item to display the items properly
    const itemsExtended = items.map((item, index) => {
      const labelWidth =
        getTextWidth(item.label, `${index === items.length - 1 ? 400 : 600} 16px Inter`) +
        (!Number.isNaN(item.number) ? getTextWidth(`(${item.number})`, '600 16px Inter') + 12 : 0) +
        28; // 28 is the width of the angle right icon + 4px gap,

      return {
        ...item,
        labelWidth,
        recommendedWidth: Math.min(labelWidth, MAX_ALLOWED_WIDTH),
      } as BreadcrumbItemExtended;
    });

    return itemsExtended;
  }, [items]);

  const [groupedItems, setGroupedItems] = useState<BreadcrumbItemExtended[]>(() => {
    if (itemsExtended.length > 3) {
      return [
        itemsExtended[0],
        {
          label: '...',
          href: '',
          labelWidth: 0,
          recommendedWidth: THREE_DOTS_WIDTH,
          attachedItems: itemsExtended.slice(1, itemsExtended.length - 2),
        },
        // 2 last items
        ...itemsExtended.slice(-2),
      ];
    }
    return itemsExtended;
  });

  // update groupedItems when the window is resized
  useEffect(() => {
    const segmentsContainerWidth = elementWidths[0] - elementWidths[1] - 16; // 16 is the padding of the content container
    const totalWidth = itemsExtended.reduce((acc, item) => acc + Math.min(item.labelWidth, MAX_ALLOWED_WIDTH), 0);
    const groupItems = () => {
      if (itemsExtended.length <= 3) {
        setGroupedItems(itemsExtended);
      } else {
        setGroupedItems([
          itemsExtended[0],
          {
            label: '...',
            href: '',
            labelWidth: 0,
            recommendedWidth: THREE_DOTS_WIDTH,
            attachedItems: itemsExtended.slice(1, itemsExtended.length - 2),
          },
          // 2 last items
          ...itemsExtended.slice(-2),
        ]);
      }
    };

    if (segmentsContainerWidth === 0 || totalWidth <= segmentsContainerWidth) {
      if (segmentsContainerWidth === 0 && itemsExtended.length > 3) {
        // it is not initialized yet and there's a lot of items
        // let's assume that they don't fit
        groupItems();
        return;
      }
      setGroupedItems(itemsExtended);
      return;
    }

    groupItems();
  }, [elementWidths, itemsExtended]);

  const separator = <AngleRight width={24} height={24} />;

  return (
    <BreadcrumbCard>
      <Container>
        <Content id={contentId}>
          <SegmentsContainer>
            {isMobileOrTablet ? (
              <>
                {itemsExtended.length > 1 && (
                  <Segment>
                    <DotsSegment items={items} />
                    {separator}
                  </Segment>
                )}
                <Segment maxWidth={elementWidths[0] - elementWidths[1] - 64 - 16}>
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
                        {separator}
                      </>
                    ) : (
                      <>
                        <Link href={item.href}>
                          <EllipseSegment>{item.label}</EllipseSegment>
                          {item.number !== undefined && item.number !== null ? <b>({item.number})</b> : null}
                        </Link>{' '}
                        {separator}
                      </>
                    )
                  ) : (
                    <EllipseSegment>{item.label}</EllipseSegment>
                  )}
                </Segment>
              ))
            )}
          </SegmentsContainer>

          <RightContentContainer id={rightPartId}>{rightContent}</RightContentContainer>
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
  gap: 16,
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
  maxWidth: maxWidth || '100%',

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
    marginLeft: 4,
  },

  '& svg': {
    minWidth: 24,
  },

  '&:hover': {
    a: {
      color: theme.palette.colors.slate[200],
    },

    b: {
      color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },

    'svg path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[200],
    },
  },
}));

const EllipseSegment = styled('span')(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const RightContentContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));
