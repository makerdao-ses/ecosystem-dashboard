import { styled, useMediaQuery, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { CircleAvatar } from '@/stories/components/CircleAvatar/CircleAvatar';
import { CustomPopover } from '@/stories/components/CustomPopover/CustomPopover';
import { ColumnSummarySkeleton } from './CuTableColumnSummarySkeleton';
import type { Theme } from '@mui/material';

interface CuTableColumnSummaryProps {
  title?: string;
  imageUrl?: string;
  status?: TeamStatus;
  statusModified?: Date | null;
  onClick?: () => void;
  mipUrl?: string;
  code?: string;
  logoDimension?: string;
  isLoading?: boolean;
  hasPopup?: boolean;
  style?: React.CSSProperties;
  categories?: string[];
  isCard?: boolean;
}

interface PopupWrapperProps {
  children: JSX.Element;
  hasPopup: boolean;
  title?: JSX.Element;
  code?: string;
}

const PopupWrapper = ({ children, title, code, hasPopup = false }: PopupWrapperProps) => {
  if (!hasPopup) {
    return children;
  }

  return (
    <CustomPopover
      popupStyle={{
        padding: 0,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      title={title}
      id={code || ''}
    >
      {children}
    </CustomPopover>
  );
};

export const CuTableColumnSummary = ({
  logoDimension = '48px',
  isLoading = false,
  hasPopup = true,
  ...props
}: CuTableColumnSummaryProps) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;

  const phoneAndTableDevices = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const hiddenPopOverSmallDevices = hasPopup && !phoneAndTableDevices;
  if (isLoading) {
    return <ColumnSummarySkeleton />;
  }

  return (
    <Container onClick={props.onClick} style={props.style}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <CircleContainer>
          <PopupWrapper
            hasPopup={hiddenPopOverSmallDevices}
            code={props.code}
            title={
              <>
                <PopupSummaryWrapper>
                  <CuTableColumnSummary
                    {...props}
                    hasPopup={false}
                    logoDimension={'68px'}
                    style={{
                      width: '372px',
                    }}
                  />
                </PopupSummaryWrapper>
                <Padded>
                  <CategoriesTitle>Categories</CategoriesTitle>
                  <CategoriesRow>
                    {props.categories?.map((cat) => (
                      <CategoryChip category={cat as TeamCategory} key={cat} />
                    ))}
                  </CategoriesRow>
                </Padded>
              </>
            }
          >
            <CircleAvatar
              width={logoDimension}
              border="none"
              height={logoDimension}
              name={props.title || 'Core Unit'}
              image={props.imageUrl}
              style={{
                boxShadow: isLight ? theme.fusionShadows.avatars : theme.fusionShadows.reskinShortShadow,
              }}
            />
          </PopupWrapper>
        </CircleContainer>
        <Content>
          <TitleWrapper>
            <Code>{props.code}</Code>
            <Title longCode={(props.code?.length ?? 0) > 3}>{props.title}</Title>
          </TitleWrapper>

          <Row>
            <StatusChipStyled status={props.status as TeamStatus} />
            {props.statusModified && (
              <CustomPopover
                id={'mouse-over-popover-goto'}
                title={'Go to MIPs Portal'}
                popupStyle={{
                  color: isLight ? '#231536' : '#D2D4EF',
                }}
              >
                {props.mipUrl && (
                  <ExternalLinkButtonStyled href={props.mipUrl ?? ''} showArrow>
                    {`${DateTime.fromJSDate(props.statusModified).toFormat('d-MMM-y').toUpperCase()}`}
                  </ExternalLinkButtonStyled>
                )}
              </CustomPopover>
            )}
          </Row>
        </Content>
      </div>
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  minWidth: 300,
  alignItems: 'stretch',
  boxSizing: 'border-box',
  textDecoration: 'none',
});

const CircleContainer = styled('div')(({ theme }) => ({
  marginRight: '8px',

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: '16px',
  },
}));

const Content = styled('section')({
  display: 'flex',
  flexDirection: 'column',
});

const Code = styled('span')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : '#546978',
  marginRight: '5px',
  whiteSpace: 'nowrap',
}));

const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Title = styled('div')<{ longCode: boolean }>(({ theme, longCode = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  alignItems: 'center',
  fontWeight: 600,
  width: 'fit-content',
  maxWidth: longCode ? 140 : 150,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#FFFFFF',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const Row = styled('section')({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginTop: '4px',
});

const PopupSummaryWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    padding: '24px 16px',
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    padding: '0 16px',
  },
}));

const Padded = styled('div')({
  padding: '0 16px 16px',
});

const CategoriesTitle = styled('div')({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  color: '#708390',
  marginBottom: '8px',
  lineHeight: '22px',
});

const CategoriesRow = styled('div')({
  display: 'flex',
  gap: '16px',
});

const ExternalLinkButtonStyled = styled(ExternalLinkButton)(({ theme }) => ({
  padding: '0px 2px 0px 4px',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '24px',
  border: `1.5px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,

  ':hover': {
    border: `1.5px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },

  '& svg': {
    width: 16,
    height: 16,
    alignItems: 'center',
  },
}));

const StatusChipStyled = styled(StatusChip)(() => ({
  padding: '3px 4px 3px 4px',
}));
