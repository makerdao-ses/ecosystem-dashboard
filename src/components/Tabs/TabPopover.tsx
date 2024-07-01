import { useState } from 'react';
import SESTooltip from '../SESTooltip/SESTooltip';

interface TabPopoverProps extends React.PropsWithChildren {
  id: string;
  title?: string;
}

const TabPopover: React.FC<TabPopoverProps> = ({ children, id, title }) => {
  const [show, setShow] = useState<boolean>(false);

  if (!title) {
    return <>{children}</>;
  }

  return (
    <SESTooltip
      content={title}
      placement="bottom-start"
      open={show}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClose={() => setShow(false)}
    >
      <div id={id} onClick={() => setShow(false)}>
        {' '}
        {children}
      </div>
    </SESTooltip>
  );
};

export default TabPopover;
