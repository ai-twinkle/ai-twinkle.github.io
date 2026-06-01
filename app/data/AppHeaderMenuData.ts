export interface MenuDropdownChild {
  name: string;
  description: string;
  icon: string;
  to?: string;
  external?: boolean;
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
    name: 'nav.resources',
    type: 'dropdown',
    status: 'primary',
    children: [
      {
        name: 'nav.models',
        description: 'nav.models_desc',
        icon: 'i-heroicons-cpu-chip',
        to: '/models',
      },
      {
        name: 'nav.datasets',
        description: 'nav.datasets_desc',
        icon: 'i-heroicons-circle-stack',
        to: '/datasets',
      },
      {
        name: 'nav.repos',
        description: 'nav.repos_desc',
        icon: 'i-heroicons-code-bracket',
        to: '/projects',
      },
      {
        name: 'nav.leaderboard',
        description: 'nav.leaderboard_desc',
        icon: 'i-heroicons-chart-bar',
        to: '/leaderboard',
        external: true,
      },
    ],
  },
  {
    name: 'nav.constellation',
    type: 'link',
    to: '/constellation',
  },
  {
    name: 'nav.community',
    type: 'dropdown',
    status: 'primary',
    children: [
      {
        name: 'nav.news',
        description: 'nav.news_desc',
        icon: 'i-heroicons-newspaper',
        to: '/news',
      },
      {
        name: 'nav.education',
        description: 'nav.education_desc',
        icon: 'i-heroicons-academic-cap',
        to: '/education',
      },
      {
        name: 'nav.media',
        description: 'nav.media_desc',
        icon: 'i-heroicons-megaphone',
        to: '/media',
      },
    ],
  },
];
