export interface MenuType {
  title: string;
  link: string;
  marginRight: string;
}

const menuItems: MenuType[] = [
  {
    title: 'Core Units',
    link: '/',
    marginRight: '32px',
  },
  {
    title: 'Activity Feed',
    link: '/activity-feed',
    marginRight: '32px',
  },
];

export default menuItems;
