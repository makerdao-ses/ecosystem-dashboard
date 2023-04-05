import { useThemeContext } from '@ses/core/context/ThemeContext';
import { CustomPopover } from '../CustomPopover/CustomPopover';

interface TabPopoverProps extends React.PropsWithChildren {
  id: string;
  title?: string;
}

const TabPopover: React.FC<TabPopoverProps> = ({ children, id, title }) => {
  const { isLight } = useThemeContext();

  if (!title) {
    return <>{children}</>;
  }

  return (
    <CustomPopover
      id={id}
      title={title}
      popupStyle={{
        color: isLight ? '#231536' : '#D2D4EF',
      }}
      sxProps={{
        marginLeft: '-11px',
        marginTop: '-3px',
      }}
    >
      {children}
    </CustomPopover>
  );
};

export default TabPopover;
