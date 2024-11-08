declare interface RouteInfo {
    category: string;
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItems: RouteInfo[] = [
    {category: 'dashboard',path: '/dashboard',title: 'Dashboard',icon: 'tachometer-alt',class: '',},

    {category: '',path: '',title: 'Geral', icon: '',class: ''},
    {category: 'auditings',path: '/auditings',title: 'Auditoria',icon: 'book',class: '',},
    {category: 'configs',path: '/configs',title: 'Configurações',icon: 'cog',class: '',},
    {category: 'users',path: '/users',title: 'Usuários',icon: 'user-edit',class: '',},
    {category: 'dashboard',path: '/users/reset-password',title: 'Redefinir Senha',icon: 'key',class: '',},
    {category: 'access_levels',path: '/access-levels',title: 'Níveis de acesso',icon: 'cog',class: '',},
];
