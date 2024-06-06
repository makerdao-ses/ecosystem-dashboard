import { Link, styled, useMediaQuery } from '@mui/material';
import AngleRight from 'public/assets/svg/angle_right.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import Container from '@/components/Container/Container';
import DotsSegment from './DotsSegment';
import type { Theme } from '@mui/material';

interface BreadcrumbItem {
  label: string;
  href: string;
  number?: number;
}

interface BreadcrumbItemExtended extends BreadcrumbItem {
  labelWidth: number;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

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
    const itemsExtended = items.map(
      (item, index) =>
        ({
          ...item,
          labelWidth: getTextWidth(item.label, `${index === items.length - 1 ? 400 : 600} 16px Inter`),
        } as BreadcrumbItemExtended)
    );

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

    let currentWidth = itemsExtended[itemsExtended.length - 1].labelWidth; // first item always visible
    const finalItems = [];
    let index = itemsExtended.length;
    do {
      index--;
      finalItems.unshift(itemsExtended[index]);
      currentWidth += itemsExtended[index].labelWidth;
    } while (currentWidth < segmentsContainerWidth && index > 0);

    const addDots = index > 0;

    setGroupedItems([
      itemsExtended[itemsExtended.length - 1],
      ...[
        addDots
          ? {
              label: '...',
              href: '',
              labelWidth: 0,
            }
          : [],
        ...finalItems,
      ],
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
                    <DotsSegment />
                    <AngleRight />
                  </Segment>
                )}
                <Segment>{itemsExtended?.[itemsExtended.length - 1]?.label}</Segment>
              </>
            ) : (
              groupedItems.map((item, index) => (
                <Segment key={item.label}>
                  {index !== itemsExtended.length - 1 ? (
                    item.label === '...' ? (
                      <>
                        <DotsSegment />
                        <AngleRight />
                      </>
                    ) : (
                      <>
                        <Link href={item.href}>
                          {item.label}{' '}
                          {item.number !== undefined && item.number !== null ? <b>({item.number})</b> : null}
                        </Link>{' '}
                        <AngleRight />
                      </>
                    )
                  ) : (
                    item.label
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
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : 'red',
    margin: '0 16px',
  },

  [theme.breakpoints.up('tablet_768')]: {
    borderBottom: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[50] : 'red'}`,
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

const Segment = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '& a': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : 'red',
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
}));

const RightSpotContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));
