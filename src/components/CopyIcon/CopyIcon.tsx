import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React, { useId, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CustomPopover } from '../../stories/components/CustomPopover/CustomPopover';
import ClipBoard from '../../stories/components/svg/ClipBoard';

interface CopyIconProps {
  text: string;
  className?: string;
  defaultTooltip?: string;
  defaultCopyTooltip?: string;
  width?: number;
  height?: number;
  icon?: React.ReactNode;
}

const CopyIcon: React.FC<CopyIconProps> = ({
  className,
  text,
  height,
  width,
  defaultTooltip = 'Copy',
  defaultCopyTooltip = 'Copied!',
  icon,
}) => {
  const { isLight } = useThemeContext();
  const [popoverText, setPopoverText] = useState<string>(defaultTooltip);
  const id = useId();

  const handleOnClose = () => {
    setTimeout(() => setPopoverText(defaultTooltip), 100);
  };

  return (
    <IconContainer className={className}>
      <CustomPopover
        id={id}
        title={popoverText}
        closeOnClick={false}
        onClose={handleOnClose}
        popupStyle={{
          color: isLight ? '#231536' : '#D2D4EF',
        }}
      >
        <CopyToClipboard text={text} onCopy={() => setPopoverText(defaultCopyTooltip)}>
          {icon || <ClipBoard width={width} height={height} onClick={(e: React.MouseEvent) => e.stopPropagation()} />}
        </CopyToClipboard>
      </CustomPopover>
    </IconContainer>
  );
};

export default CopyIcon;

const IconContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',

  '> div': {
    display: 'flex',
  },
});
