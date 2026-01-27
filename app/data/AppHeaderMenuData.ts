export interface MenuDropdownChild {
  name: string;
  description: string;
  icon: string;
  to?: string;
  onClick?: () => void;
}

export interface MenuDropdownItem {
  name: string;
  type: 'dropdown';
  status: string;
  children: MenuDropdownChild[];
}

export interface MenuFunctionItem {
  name: string;
  type: 'function';
  icon: string;
  onClick: () => void;
}

export interface MenuLinkItem {
  name: string;
  type: 'link';
  to: string;
  external?: boolean; // If true, use regular link instead of NuxtLinkLocale
}

export type MenuItem = MenuDropdownItem | MenuFunctionItem | MenuLinkItem;

export const menuItems: MenuItem[] = [
  {
    name: 'nav.about',
    type: 'link',
    to: '/about',
  },
  {
    name: 'nav.models',
    type: 'link',
    to: '/models',
  },
  {
    name: 'nav.datasets',
    type: 'link',
    to: '/datasets',
  },
  {
    name: 'nav.education',
    type: 'link',
    to: '/education',
  },
  {
    name: 'nav.news',
    type: 'link',
    to: '/news',
  },
  {
    name: 'nav.media',
    type: 'link',
    to: '/media',
  },
];
