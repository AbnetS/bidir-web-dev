var API = {
    Config: {
        BaseUrl: 'http://api.dev.bidir.gebeya.io/' //REMOTE API
    },
    Service: {
        NONE:'',
        MFI: 'MFI',
        Auth: 'auth',
        Users: 'users',
        SCREENING:'screenings',
        FORM:'forms',
        ACAT:'acat'
    },
    Methods: {
        Auth: {
            Login: 'login'
        },
        MFI: {
            MFIUpdate:'',
            MFI:'create',
            GetAll:'all',
            Branches: 'branches',
            CreateBranch: 'branches/create'

        },
        Users: {
            Account:'accounts',
            UserUpdate:'',
            User:'create',
            GetAll: '',
            Roles: 'roles',
            Role: 'roles/create'
        },
        Roles:{
            GetAll: 'roles',
            Create: 'roles/create',
            Permissions: 'permissions',
            PermissionByGroup: 'permissions/groups'
        },
        Tasks: {
            Task:'tasks',
            GetAll: 'tasks/paginate?page=1&per_page=100'
        },
        Clients:{
            All:'clients/paginate?source=web',
            Client:'clients',
            SearchClient:''
        },
        Form:{
            All: '',
            Create: 'create',
            Question:'questions',
            Create_Question:'questions/create',
            Section:'sections',
            Create_Section:'sections/create'
        },
        ACAT:{
            ACAT:'forms',
            Crop:'crops',
            CreateCrop:'crops/create',
            LoanProducts:'loanProducts',
            CreateLoanProducts:'loanProducts/create',
            CostListUpdate: 'costLists',
            CostList: 'costLists/add',
            CreateACAT:'forms/initialize'
        }
    }
};


var QUESTION_TYPE = {
    FILL_IN_BLANK: "FILL_IN_BLANK",
    YES_NO: "YES_NO",
    MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
    SINGLE_CHOICE: "SINGLE_CHOICE",
    GROUPED: "GROUPED"
};
var ACAT_GROUP_CONSTANT = {
    SEED: "SEED",
    FERTILIZER: "FERTILIZER",
    CHEMICALS: "CHEMICALS",
    LABOUR_COST:"LABOUR_COST",
    OTHER_COST:"OTHER_COST"
};
var ACAT_COST_LIST_TYPE = {
    LINEAR: "linear",
    GROUPED: "grouped"
};