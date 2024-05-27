import type { FC, SVGProps } from 'react';

interface Link {
  label: string;
  link: string;
  Icon?: FC<SVGProps<SVGElement>>;
}

export interface LinkCategory {
  name: string;
  links: Link[];
}

export interface TypeIconFooter {
  Icon: FC<SVGProps<SVGElement>>;
  href: string;
  title: string;
}

export interface FooterContact {
  title: string;
  subtitle: string;
  Icon: FC<SVGProps<SVGElement>>;
  links: TypeIconFooter[];
}
