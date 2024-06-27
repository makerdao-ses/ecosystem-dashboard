export interface Links {
  label: string;
  href: string;
}

export interface MenuType {
  title: string;
  link: string;
  titleMobile?: string;
  mobileOnly?: boolean;
}
export type RouteOnHeader = 'contributors' | 'finances' | 'roadmap' | 'endgame' | 'connect' | 'home';
