import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CustomPopover } from '../CustomPopover/CustomPopover';
import ClipBoard from '../svg/ClipBoard';

interface CopyIconProps {
  text: string;
  className?: string;
  defaultTooltip?: string;
  defaultCopyTooltip?: string;
}

const CopyIcon: React.FC<CopyIconProps> = ({
  className,
  text,
  defaultTooltip = 'Copy',
  defaultCopyTooltip = 'Copied!',
}) => {
  const { isLight } = useThemeContext();
  const [popoverText, setPopoverText] = useState<string>(defaultTooltip);

  const handleOnClose = () => {
    setTimeout(() => setPopoverText(defaultTooltip), 100);
  };

  return (
    <IconContainer className={className}>
      <CustomPopover
        id={'copy-id'}
        title={popoverText}
        closeOnClick={false}
        onClose={handleOnClose}
        popupStyle={{
          color: isLight ? '#231536' : '#D2D4EF',
        }}
      >
        <CopyToClipboard text={text} onCopy={() => setPopoverText(defaultCopyTooltip)}>
          <ClipBoard />
        </CopyToClipboard>
      </CustomPopover>
    </IconContainer>
  );
};

export default CopyIcon;

const IconContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',
});
