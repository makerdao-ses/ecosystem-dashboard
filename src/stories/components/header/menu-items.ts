
export interface MenuType{
   title:string;
   link:string;
   marginRight:string
}

const menuItems:MenuType[] = [
  {
    title: 'Core Units',
    link: '/',
    marginRight: '30px'
  },
  {
    title: 'Strategic Initiatives',
    link: '/strategic-initiatives',
    marginRight: '30px'
  },
  {
    title: 'Finances',
    link: '/finances',
    marginRight: '30px'
  },
  {
    title: 'People',
    link: '/people',
    marginRight: '0px'
  },
];

export default menuItems;
