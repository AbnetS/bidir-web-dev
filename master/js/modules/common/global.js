var API = {
    Config: {
        BaseUrl: "http://api.dev.bidir.gebeya.io/" //REMOTE API
    },
    Service: {
        MFI: 'MFI',
        Auth: 'auth',
        Users: 'users'
    },
    Methods: {
        Auth: {
            Login: 'login'
        },
        MFI: {
            MFI:'create',
            GetAll:'',
            Branch: 'branches',
            GetAllBranches: 'branches/paginate?page=1&per_page=100',
        },
        Users: {
            Account:'accounts',
            User:'create',
            GetAll: 'paginate?page=1&per_page=100',
            Roles: 'roles',
            GetRoles: 'roles/paginate?page=1&per_page=100'
        },
        Tasks: {
            Task:'tasks',
            GetAll: 'tasks/paginate?page=1&per_page=100'
        }
    }
};

var ResourceMethods = {
    All: {
        'query': {method: 'GET', isArray: true},
        'get': {method: 'GET'},
        'update': {method: 'PUT'},
        'save': {method: 'POST'},
        'delete': {method: 'DELETE'}
    },
    Readonly: {
        'query': {method: 'GET', isArray: true},
        'get': {method: 'GET'}
    },
    Query: {method: 'GET', isArray: true},
    Get: {method: 'GET'},
    Put: {method: 'PUT'},
    Post: {method: 'POST'},
    Delete: {method: 'DELETE'},
    Search: {'search': {method: 'POST', isArray: true}}
};
