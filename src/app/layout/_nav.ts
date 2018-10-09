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
        name: 'Sim',
        url: '/sim',
        icon: 'icon-puzzle',
        children: [
            {
                name: 'Sim',
                url: '/sim',
                icon: 'cui-arrow-right'
            },
            {
                name: 'Đại lý',
                url: '/agency',
                icon: 'cui-arrow-right'
            }
        ]
    },
    {
        name: 'Orders',
        url: '/orders',
        icon: 'cui-basket-loaded'
    },
    {
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
    }
];
