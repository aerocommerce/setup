export default {
    type: 'new_project',
    name: '',
    id: null,
    token: '',
    databaseConnectionType: 'local',
    databaseHost: '127.0.0.1',
    databasePort: '3306',
    databaseUsername: 'root',
    databasePassword: '',
    databases: [],
    databaseType: 'new_database',
    database: '',
    showAdvancedDatabaseOptions: false,
    databaseTestPassed: false,
    elasticsearchConnectionType: 'local',
    elasticsearchVersion: null,
    elasticsearchHost: '127.0.0.1',
    elasticsearchPort: '9200',
    storeIdentifier: null,
    showAdvancedElasticsearchOptions: false,
    elasticsearchTestPassed: false,
    store: {
        name: '',
        industry: '',
        country: 'GB',
        currency: 'GBP',
        language: 'en',
        sender_email: '',
        tax: 'inc-tax',
        logo: {
            store: '',
            email: '',
        },
        address: {
            country: '',
            line_1: '',
            line_2: '',
            city: '',
            post_code: '',
            phone: '',
            tax_id: '',
        }
    },
    theme: {
        id: '',
        name: '',
        author: '',
        description: '',
        thumbnail: '',
        frameworks: '',
    },
    catalog: {
        type: 'import',
        name: '',
        preview: false,
        url: '',
        images: []
    },
    admin: {
        create: true,
        name: '',
        email: '',
        password: '',
    },
}
