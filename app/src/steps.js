import {
    DatabaseIcon,
    SearchIcon,
    ShoppingBagIcon,
    StarIcon,
    TableIcon,
    ColorSwatchIcon,
    InformationCircleIcon,
    CollectionIcon,
    UserCircleIcon,
} from '@heroicons/vue/outline'
import LoginIcon from './components/Elements/LoginIcon.vue'

import ConnectAccount from './components/Steps/ConnectAccount.vue'
import SelectProject from './components/Steps/SelectProject.vue'
import DatabaseServer from './components/Steps/DatabaseServer.vue'
import Database from './components/Steps/Database.vue'
import Elasticsearch from './components/Steps/Elasticsearch.vue'
import Store from './components/Steps/Store.vue'
import Catalog from './components/Steps/Catalog.vue'
import Theme from './components/Steps/Theme.vue'
import ThemeViewer from './components/ThemeViewer.vue'
import AdminAccount from './components/Steps/AdminAccount.vue'
import Review from './components/Steps/Review.vue'

const steps = {
    agora: {
        icon: LoginIcon,
        component: ConnectAccount,
        size: 'small',
        illustrationShift: 0,
        include(data) {
            return true
        },
    },
    project: {
        icon: StarIcon,
        component: SelectProject,
        size: 'small',
        illustrationShift: 1,
        include(data) {
            return true
        },
    },
    databaseServer: {
        icon: DatabaseIcon,
        component: DatabaseServer,
        size: 'small',
        illustrationShift: 2,
        include(data) {
            if (!data.databaseConnectionType) return true
            if (!data.databaseHost) return true
            if (!data.databasePort) return true
            if (!data.databaseUsername) return true
            if (!data.databaseType) return true
            if (!data.database) return true

            return false
        },
    },
    database: {
        icon: TableIcon,
        component: Database,
        size: 'small',
        illustrationShift: 3,
        include(data) {
            if (!data.databaseConnectionType) return true
            if (!data.databaseHost) return true
            if (!data.databasePort) return true
            if (!data.databaseUsername) return true
            if (!data.databaseType) return true
            if (!data.database) return true
        },
    },
    elasticsearch: {
        icon: SearchIcon,
        component: Elasticsearch,
        size: 'small',
        illustrationShift: 4,
        include(data) {
            if (!data.elasticsearchConnectionType) return true
            if (!data.elasticsearchVersion) return true
            if (!data.elasticsearchHost) return true
            if (!data.elasticsearchPort) return true
            if (!data.storeIdentifier) return true

            return false
        },
    },
    store: {
        icon: ShoppingBagIcon,
        component: Store,
        size: 'large',
        illustrationShift: 5,
        include(data) {
            return true
        },
    },
    theme: {
        icon: ColorSwatchIcon,
        component: Theme,
        subComponent: ThemeViewer,
        size: 'large',
        illustrationShift: 7.75,
        include(data) {
            return true
        },
    },
    catalog: {
        icon: CollectionIcon,
        component: Catalog,
        size: 'small',
        illustrationShift: 8.75,
        include(data) {
            return true
        },
    },
    admin: {
        icon: UserCircleIcon,
        component: AdminAccount,
        size: 'small',
        illustrationShift: 9.75,
        include(data) {
            return true
        },
    },
    review: {
        icon: InformationCircleIcon,
        component: Review,
        size: 'small',
        illustrationShift: 10.75,
        include(data) {
            return true
        },
    },
}

export default steps
