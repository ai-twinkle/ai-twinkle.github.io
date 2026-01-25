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
    name: 'nav.models',
    type: 'link',
    to: '/models',
  },
  {
    name: 'nav.leaderboard',
    type: 'link',
    to: '/leaderboard',
    external: true, // Server redirect, don't add locale prefix
  },
  {
    name: 'nav.community',
    type: 'dropdown',
    status: '',
    children: [
      {
        name: 'nav.news',
        description: 'nav.news_desc',
        icon: 'i-heroicons-newspaper',
        to: '/news',
      },
    ],
  },
  {
    name: 'nav.resources',
    type: 'dropdown',
    status: '',
    children: [
      {
        name: 'nav.education',
        description: 'nav.education_desc',
        icon: 'i-heroicons-academic-cap',
        to: '/education',
      },
      {
        name: 'nav.media',
        description: 'nav.media_desc',
        icon: 'i-heroicons-photo',
        to: '/media',
      },
    ],
  },
];
