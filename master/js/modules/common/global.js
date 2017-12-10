var API = {
    Config: {
        BaseUrl: "http://api.dev.bidir.gebeya.io/" //REMOTE API
    },
    Service: {
        NONE:'',
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
            GetAllBranches: 'branches/paginate?page=1&per_page=100'
        },
        Users: {
            Account:'accounts',
            UserUpdate:'',
            User:'create',
            GetAll: '',
            Roles: 'roles',
            Role: 'roles/create',
            GetRoles: 'roles/paginate?page=1&per_page=100'
        },
        Roles:{
            GetAll: 'roles',
            Create: 'roles/create',
            Permissions: 'permissions'
        },
        Tasks: {
            Task:'tasks',
            GetAll: 'tasks/paginate?page=1&per_page=100'
        }
    }
};


