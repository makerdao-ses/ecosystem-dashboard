interface Link {
  label: string;
  link: string;
  icon?: string;
}

export interface LinkCategory {
  name: string;
  links: Link[];
}

export interface FooterProps {
  linkCategory: LinkCategory[];
}
