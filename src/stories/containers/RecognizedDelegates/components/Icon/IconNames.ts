import ArrowLink from '../../../../components/svg/ArrowLink';
import AddIcon from '../../../../components/svg/add';
import { LinkIcon } from '../../../../components/svg/link-icon';

export const icons = {
  add: AddIcon,
  arrowLink: ArrowLink,
  linkIcon: LinkIcon,
};

export type IconNames = keyof typeof icons;
