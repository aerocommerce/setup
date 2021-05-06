import {DatabaseIcon, LoginIcon, SearchIcon, ShoppingBagIcon, StarIcon, TableIcon, ColorSwatchIcon, InformationCircleIcon, CollectionIcon, UserCircleIcon} from '@heroicons/vue/outline/esm'

import ConnectAccount from './components/Steps/ConnectAccount.vue'
import SelectProject from './components/Steps/SelectProject.vue'
import DatabaseServer from './components/Steps/DatabaseServer.vue'
import Database from './components/Steps/Database.vue'
import Elasticsearch from './components/Steps/Elasticsearch.vue'
import Store from './components/Steps/Store.vue'
import Catalog from './components/Steps/Catalog.vue'
import Theme from './components/Steps/Theme.vue'
import AdminAccount from './components/Steps/AdminAccount.vue'
import Review from './components/Steps/Review.vue'

export default [
    {
        icon: LoginIcon,
        component: ConnectAccount,
        size: 'small',
    },
    {
        icon: StarIcon,
        component: SelectProject,
        size: 'small',
    },
    {
        icon: DatabaseIcon,
        component: DatabaseServer,
        size: 'small',
    },
    {
        icon: TableIcon,
        component: Database,
        size: 'small',
    },
    {
        icon: SearchIcon,
        component: Elasticsearch,
        size: 'small',
    },
    {
        icon: ShoppingBagIcon,
        component: Store,
        size: 'small',
    },
    {
        icon: CollectionIcon,
        component: Catalog,
        size: 'small',
    },
    {
        icon: ColorSwatchIcon,
        component: Theme,
        size: 'large',
    },
    {
        icon: UserCircleIcon,
        component: AdminAccount,
        size: 'small',
    },
    {
        icon: InformationCircleIcon,
        component: Review,
        size: 'small',
    },
]
