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
];
