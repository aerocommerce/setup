import {DatabaseIcon, LoginIcon, SearchIcon, ShoppingBagIcon, StarIcon, TableIcon} from '@heroicons/vue/outline/esm'

import ConnectAccount from './components/Steps/ConnectAccount.vue'
import SelectProject from './components/Steps/SelectProject.vue'


export default [
    {
        icon: LoginIcon,
        component: ConnectAccount,
        size: 'small',
    },
    {
        icon: StarIcon,
        component: SelectProject,
        size: 'large',
    },
    {
        icon: DatabaseIcon,
        component: null,
        size: 'small',
    },
    {
        icon: TableIcon,
        component: null,
        size: 'small',
    },
    {
        icon: SearchIcon,
        component: null,
        size: 'small',
    },
    {
        icon: ShoppingBagIcon,
        component: null,
        size: 'small',
    },
]
