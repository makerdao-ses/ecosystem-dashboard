import ArrowLink from '../svg/ArrowLink';
import AddIcon from '../svg/add';
import { LinkIcon } from '../svg/link-icon';

export const icons = {
  add: AddIcon,
  arrowLink: ArrowLink,
  linkIcon: LinkIcon,
};

export type IconNames = keyof typeof icons;
