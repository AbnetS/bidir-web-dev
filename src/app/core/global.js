var API = {
    Config: {
        BaseUrl: "http://api.dev.bidir.gebeya.io/" //REMOTE API
    },
    Service: {
      MFI: 'MFI/MFI',
      Auth: 'auth/auth'
    },
    Methods: {
        Auth: {
                Login: 'login'
            },
            MFI:'',
            Branch:'branches',
            BranchGet:'branches/paginate?page=1&per_page=100'
        }
};
var ResourceMethods = {
  All: {
      'query': { method: 'GET', isArray: true },
      'get': { method: 'GET' },
      'update': { method: 'PUT' },
      'save': { method: 'POST' },
      'delete': { method: 'DELETE' }
  },
  Readonly: {
      'query': { method: 'GET', isArray: true },
      'get': { method: 'GET' }
  },
  Query: { method: 'GET', isArray: true },
  Get: { method: 'GET' },
  Put: { method: 'PUT' },
  Post: { method: 'POST' },
  Delete: { method: 'DELETE' },
  Search: { 'search': { method: 'POST', isArray: true } }
};
