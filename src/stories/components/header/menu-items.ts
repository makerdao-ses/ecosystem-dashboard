
export interface MenuType{
   title:string;
   link:string;
   marginRight:string
}

const menuItems:MenuType[] = [
  {
    title: 'Core Units',
    link: '/core-units',
    marginRight: '64px'
  },
  {
    title: 'Strategic Initiatives',
    link: '/strategic-initiatives',
    marginRight: '64px'
  },
  {
    title: 'Finances',
    link: '/finances',
    marginRight: '64px'
  },
  {
    title: 'People',
    link: '/people',
    marginRight: '0px'
  },
];

export default menuItems;
