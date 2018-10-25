export const navItems = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer'
    },
    {
        name: 'Version',
        url: '/version',
        icon: 'icon-star'
    },
    {
        name: 'Member',
        url: '/member',
        icon: 'cui-people'
    },
    {
        name: 'Sim management',
        url: '/msim',
        icon: 'icon-puzzle',
        children: [
            {
                name: 'Sim',
                url: '/msim/sim',
                icon: 'icon-puzzle'
            },
            {
                name: 'Agency',
                url: '/msim/agency',
                icon: 'cui-graph'
            },
            {
                name: 'Orders',
                url: '/msim/orders',
                icon: 'cui-basket-loaded'
            },
        ]
    },
    {
        name: 'Partner',
        url: '/partner',
        icon: 'fa fa-address-book-o'
    },
    /*{
        name: 'Customers',
        // url: '/customers',
        url: '/#',
        icon: 'cui-people'
    },
    {
        name: 'Settings',
        // url: '/settings',
        url: '/#',
        icon: 'icon-settings',
    }*/
];
