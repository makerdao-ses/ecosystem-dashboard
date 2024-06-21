import { Popover, styled, useMediaQuery } from '@mui/material';
import Link from 'public/assets/svg/link.svg';
import React, { useCallback, useEffect, useId, useMemo } from 'react';
import type { SocialMediaChannels } from '@/core/models/interfaces/socialMedia';
import CustomSheet from '../CustomSheet/CustomSheet';
import LinkList from './LinkList';
import type { Theme } from '@mui/material';
import type { breakpoints } from '@ses/styles/theme/themes';

type BreakpointKeys = keyof typeof breakpoints;

interface Props {
  socialMedia: SocialMediaChannels;
  hideLabelIn?: Array<BreakpointKeys | [BreakpointKeys, BreakpointKeys]>;
  className?: string;
}

const SocialMediaLinksButton: React.FC<Props> = ({ socialMedia, className, hideLabelIn = ['tablet_768'] }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const popoverId = useId();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const isEmpty = useMemo(() => {
    if (!socialMedia) return true;

    const { forumTag, twitter, youtube, discord, linkedIn, website, github } = socialMedia;

    return [forumTag, twitter, youtube, discord, linkedIn, website, github].every(
      (channel) => channel === undefined || channel === null || channel === ''
    );
  }, [socialMedia]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleScroll = useCallback(() => {
    if (!isMobile && open) {
      handleClose();
    }
  }, [isMobile, open]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, open]);

  return (
    <div>
      <TriggerButton className={className} hideLabelIn={hideLabelIn} onClick={handleClick} disabled={isEmpty}>
        <ContainerLink>
          <Link width={14} height={14} />
        </ContainerLink>
        <Label hideLabelIn={hideLabelIn}>Links</Label>
      </TriggerButton>

      {/* popover for desktop resolutions */}
      <ContainerPopover
        disableScrollLock
        id={popoverId}
        open={open && !isMobile}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <LinkList socialMedia={socialMedia} />
      </ContainerPopover>

      {/* modal sheet for mobile resolutions */}
      <CustomSheetStyled handleClose={handleClose} isOpen={isMobile && open}>
        <Title>Media Links </Title>
        <LinkListStyled socialMedia={socialMedia} />
      </CustomSheetStyled>
    </div>
  );
};

export default SocialMediaLinksButton;

const TriggerButton = styled('button')<{ hideLabelIn: Array<BreakpointKeys | [BreakpointKeys, BreakpointKeys]> }>(
  ({ theme, hideLabelIn }) => ({
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    borderRadius: 8,
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
    padding: '4px 8px 4px 4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    width: 'fit-content',
    border: 'none',

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
    },
    ':hover': {
      color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
      },
    },

    '&:focus': {
      outline: 'none',
    },

    '&:disabled': {
      cursor: 'auto',
      background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
      color: theme.palette.isLight ? 'rgba(182, 188, 194, 0.3)' : theme.palette.colors.charcoal[700],

      '& path': {
        fill: theme.palette.isLight ? 'rgba(182, 188, 194, 0.3)' : theme.palette.colors.charcoal[700],
      },
    },

    ...Object.assign(
      {},
      ...hideLabelIn.map((breakpoint) => {
        if (Array.isArray(breakpoint)) {
          return {
            [theme.breakpoints.between(breakpoint[0], breakpoint[1])]: {
              padding: 4,
            },
          };
        }
        return {
          [theme.breakpoints.down(breakpoint)]: {
            padding: 4,
          },
        };
      })
    ),
  })
);

const Label = styled('div')<{ hideLabelIn: Array<BreakpointKeys | [BreakpointKeys, BreakpointKeys]> }>(
  ({ theme, hideLabelIn }) => ({
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '18px',

    ...Object.assign(
      {},
      ...hideLabelIn.map((breakpoint) => {
        if (Array.isArray(breakpoint)) {
          return {
            [theme.breakpoints.between(breakpoint[0], breakpoint[1])]: {
              display: 'none',
            },
          };
        }
        return {
          [theme.breakpoints.down(breakpoint)]: {
            display: 'none',
          },
        };
      })
    ),
  })
);

const ContainerLink = styled('div')(() => ({
  width: 24,
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ContainerPopover = styled(Popover)({
  '& .MuiPaper-root': {
    borderRadius: '12px !important',
  },
});

const CustomSheetStyled = styled(CustomSheet)({
  '& .react-modal-sheet-container': {
    padding: '0px 16px 0px 16px',
  },
  '& .react-modal-sheet-header': {
    height: '0px!important',
  },
  '.react-modal-sheet-content': {},
});

const Title = styled('h2')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '22px',
  marginTop: 32,
  marginLeft: 10,
  marginBottom: 10,
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
}));

const LinkListStyled = styled(LinkList)(({ theme }) => ({
  width: '100%',
  padding: 8,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.3)',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.innerShadow : theme.fusionShadows.darkMode,
  borderRadius: 12,
}));
