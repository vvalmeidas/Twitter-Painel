export default {
    items: [{
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'fa fa-dashboard',
            badge: {
                variant: 'success',
                text: 'NEW'
            }
        },
        {
            title: true,
            name: 'UI elements',
            class: '',
            wrapper: {
                element: '',
                attributes: {}
            }
        },

        {
            name: 'Components',
            url: '/components',
            icon: 'fa fa-puzzle-piece',
            children: [{
                    name: 'Buttons',
                    url: '/components/buttons',
                    icon: 'fa fa-puzzle-piece',
                    badge: {
                        variant: 'danger',
                        text: 'NEW'
                    }
                },
                {
                    name: 'Badges',
                    url: '/components/badges',
                    icon: 'fa fa-id-badge'
                },
                {
                    name: 'Social Buttons',
                    url: '/components/socials',
                    icon: 'fa fa-share-square-o',
                    badge: {
                        variant: 'success',
                        text: 'NEW'
                    }
                },
                {
                    name: 'Cards',
                    url: '/components/cards',
                    icon: 'fa fa-id-card-o'
                },
                {
                    name: 'Alerts',
                    url: '/components/alerts',
                    icon: 'fa fa-exclamation-triangle'
                },
                {
                    name: 'Progress Bars',
                    url: '/components/progressbars',
                    icon: 'fa fa-spinner'
                },
                {
                    name: 'Modals',
                    url: '/components/modals',
                    icon: 'fa fa-fire'
                },
                {
                    name: 'Grids',
                    url: '/components/grids',
                    icon: 'fa fa-th'
                },
                {
                    name: 'Typography',
                    url: '/components/typography',
                    icon: 'fa fa-file-word-o'
                }
            ]
        },
        {
            name: 'Tables',
            url: '/components/tables',
            icon: 'fa fa-table'
        },
        {
            name: 'Forms',
            url: '/forms',
            icon: 'fa fa-pencil-square-o',
            children: [{
                    name: 'Basic Form',
                    url: '/components/basic-form',
                    icon: 'fa fa-pencil-square-o',
                    badge: {
                        variant: 'warning',
                        text: 'NEW'
                    }
                }

            ]
        },
        {
            name: 'Icons',
            url: '/components/icons',
            icon: 'fa fa-star',
        },
        {
            name: 'Widgets',
            url: '/components/widgets',
            icon: 'fa fa-calculator',
            badge: {
                variant: 'info',
                text: '60+'
            }
        },
        {
            name: 'Charts',
            url: '/components/charts',
            icon: 'fa fa-pie-chart',
            badge: {
                variant: 'info',
                text: 'NEW'
            },
            children: [{
                    name: 'Chart JS',
                    url: '/components/chartjs',
                    icon: 'fa fa-line-chart'
                },
                {
                    name: 'Flot Chart',
                    url: '/components/flotchart',
                    icon: 'fa fa-line-chart'
                },

            ]
        },
        {
            name: 'Maps',
            url: '/components/maps/',
            icon: 'fa fa-map-marker',
            badge: {
                variant: 'info',
                text: 'NEW'
            },
            children: [{
                    name: 'Google Maps',
                    url: '/components/maps/google-maps',
                    icon: 'fa fa-map-o'
                },
                {
                    name: 'Bubble Maps',
                    url: '/components/maps/bubble-maps',
                    icon: 'fa fa-globe'
                },
                {
                    name: 'Leaflet Maps',
                    url: '/components/maps/leaflet-maps',
                    icon: 'fa fa-street-view'
                },
                {
                    name: 'Line Maps',
                    url: '/components/maps/line-maps',
                    icon: 'fa fa-map-signs'
                },
            ]
        },
        {
            divider: true
        },
        {
            title: true,
            name: 'Extras'
        },
        {
            name: 'Pages',
            url: '/auth',
            icon: 'fa fa-paperclip',
            children: [{
                    name: 'Login',
                    url: '/auth/login',
                    icon: 'fa fa-sign-in'
                },
                {
                    name: 'Register',
                    url: '/auth/register',
                    icon: 'fa fa-sign-in'
                },
                {
                    name: 'Error 404',
                    url: '/auth/Page404',
                    icon: 'fa fa-paper-plane'
                },
                {
                    name: 'Error 500',
                    url: '/auth/Page500',
                    icon: 'fa fa-paper-plane'
                }
            ]
        },
        {
            name: 'Documentation',
            url: 'https://docs.vuejsadmin.com/docs/arbano-vue-js-admin/',
            icon: 'fa fa-file-text-o',
            variant: 'danger'
        },
        {
            name: 'Purchase',
            url: 'http://vuejsadmin.com',
            icon: 'fa fa-shopping-cart',
            class: 'mt-auto',
            variant: 'success'
        }

    ]
}