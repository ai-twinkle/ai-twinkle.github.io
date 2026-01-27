export interface MenuDropdownChild {
  name: string;
  description: string;
  icon: string;
  onClick: () => void;
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

export type MenuItem = MenuDropdownItem | MenuFunctionItem;

export const menuItems: MenuItem[] = [
  {
    name: 'Models',
    type: 'dropdown',
    status: '',
    children: [
      {
        name: 'Explore Models',
        description: 'List of models and demos',
        icon: 'i-heroicons-squares-2x2',
        onClick: () => {
          window.location.href = '/projects';
        },
      },
      {
        name: 'Hugging Face',
        description: 'Hugging Face models',
        icon: 'i-simple-icons-huggingface',
        onClick: () => {
          window.location.href = '/huggingface';
        },
      },
      {
        name: 'GitHub',
        description: 'Repository & source',
        icon: 'i-simple-icons-github',
        onClick: () => {
          window.open('https://github.com/ai-twinkle', '_blank');
        },
      },
    ],
  },
  {
    name: 'Leaderboard',
    type: 'function',
    icon: 'i-heroicons-trophy',
    onClick: () => {
      window.location.href = '/leaderboard';
    },
  },
  {
    name: 'Community',
    type: 'dropdown',
    status: '',
    children: [
      {
        name: 'Join Discord',
        description: 'Chat with community',
        icon: 'i-simple-icons-discord',
        onClick: () => {
          window.location.href = '/discord';
        },
      },
      {
        name: 'Contributors',
        description: 'Meet contributors',
        icon: 'i-heroicons-users',
        onClick: () => {
          window.location.href = '/community';
        },
      },
    ],
  },
  {
    name: 'Resources',
    type: 'dropdown',
    status: '',
    children: [
      {
        name: 'Docs',
        description: 'Documentation & guides',
        icon: 'i-heroicons-book-open',
        onClick: () => {
          window.location.href = '/resources';
        },
      },
      {
        name: 'Accessibility',
        description: 'Accessibility statement',
        icon: 'i-heroicons-shield-check',
        onClick: () => {
          window.location.href = '/docs/ACCESSIBILITY.md';
        },
      },
    ],
  },
  {
    name: 'About',
    type: 'function',
    icon: 'i-heroicons-information-circle',
    onClick: () => {
      window.location.href = '/about';
    },
  },
  {
    name: 'Collaborate',
    type: 'function',
    icon: 'i-heroicons-hand-raised',
    onClick: () => {
      window.location.href = '/collaborate';
    },
  },
];
